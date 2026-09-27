"use client";

import {
  Component,
  useEffect,
  useMemo,
  useRef,
  type ReactNode,
  type RefObject,
} from "react";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import * as THREE from "three";

/**
 * Scène WebGL de la galerie d'accueil.
 *
 * Adaptée du modèle « 3D Gallery Photography » (v0) : plans d'images disposés
 * en profondeur, flou selon la distance, et léger effet de tissu qui ondule
 * avec la vitesse de défilement — volontairement atténué : le mouvement
 * doit rester lent, précis, architectural.
 *
 * Différence de fond avec le modèle : la caméra n'intercepte pas la molette.
 * Elle suit le défilement NATIF de la page, lu sur la section parente — le
 * visiteur fait défiler normalement, au clavier, au doigt ou à la souris, et
 * la page reprend son cours après la sixième étape.
 */

/** Distance entre deux étapes, en unités de scène. */
const ESPACE = 7;
/** Distance caméra → visuel quand l'étape est au centre de l'écran. */
const FOCALE = 4.2;
const FOV = 50;
const FLOU_MAX = 6;

const vertexShader = /* glsl */ `
  uniform float force;
  uniform float temps;
  varying vec2 vUv;

  void main() {
    vUv = uv;
    vec3 pos = position;

    // Courbure proportionnelle à la vitesse de défilement (effet tissu).
    float intensite = force * 0.2;
    float d = length(pos.xy);
    float courbe = d * d * intensite;
    float ride = (sin(pos.x * 2.0 + force * 3.0) * 0.02
                + sin(pos.y * 2.5 + force * 2.0) * 0.015) * abs(intensite) * 2.0;

    // Respiration très lente au repos, pour que la scène ne soit jamais figée.
    float souffle = sin(pos.x * 1.2 + temps * 0.6) * 0.006;

    pos.z -= courbe + ride + souffle;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  uniform sampler2D map;
  uniform float opacite;
  uniform float flou;
  varying vec2 vUv;

  void main() {
    vec4 couleur = texture2D(map, vUv);

    if (flou > 0.01) {
      vec2 texel = 1.0 / vec2(textureSize(map, 0));
      vec4 somme = vec4(0.0);
      float total = 0.0;
      for (float x = -2.0; x <= 2.0; x += 1.0) {
        for (float y = -2.0; y <= 2.0; y += 1.0) {
          float poids = 1.0 / (1.0 + length(vec2(x, y)));
          somme += texture2D(map, vUv + vec2(x, y) * texel * flou) * poids;
          total += poids;
        }
      }
      couleur = somme / total;
    }

    gl_FragColor = vec4(couleur.rgb, couleur.a * opacite);
  }
`;

function creerMateriau(texture: THREE.Texture) {
  return new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    uniforms: {
      map: { value: texture },
      opacite: { value: 0 },
      flou: { value: 0 },
      force: { value: 0 },
      temps: { value: 0 },
    },
    vertexShader,
    fragmentShader,
  });
}

const lisser = (a: number, b: number, t: number) => {
  const x = Math.min(1, Math.max(0, (t - a) / (b - a)));
  return x * x * (3 - 2 * x);
};

function Scene({
  visuels,
  sectionRef,
}: {
  visuels: string[];
  sectionRef: RefObject<HTMLElement | null>;
}) {
  const textures = useLoader(THREE.TextureLoader, visuels);
  const materiaux = useMemo(() => textures.map(creerMateriau), [textures]);
  const plans = useRef<(THREE.Mesh | null)[]>([]);
  const size = useThree((s) => s.size);

  const etat = useRef({ t: 0, cible: 0, vitesse: 0 });

  useEffect(() => () => materiaux.forEach((m) => m.dispose()), [materiaux]);

  /* Disposition responsive : visuel à droite sur grand écran (le texte est à
     gauche), centré dans la moitié haute sur mobile (le texte est en bas). */
  const disposition = useMemo(() => {
    const aspect = size.width / size.height;
    const demiH = FOCALE * Math.tan(THREE.MathUtils.degToRad(FOV / 2));
    const demiL = demiH * aspect;
    const large = aspect > 1.05;
    const plans = textures.map((tex) => {
      const img = tex.image as HTMLImageElement;
      const ratio = img.width / img.height;
      const hMax = demiH * (large ? 1.45 : 1.05);
      const lMax = demiL * (large ? 1.3 : 2.1);
      const h = Math.min(hMax, lMax / ratio);
      return {
        x: large ? demiL * 0.42 : 0,
        y: large ? 0 : demiH * 0.34,
        l: h * ratio,
        h,
      };
    });
    return { large, plans };
  }, [textures, size.width, size.height]);

  useFrame((state, delta) => {
    const section = sectionRef.current;
    if (!section) return;

    /* t = nombre d'écrans défilés depuis le haut de la section.
       0 : introduction ; k + 1 : étape k au centre de l'écran. */
    const rect = section.getBoundingClientRect();
    const e = etat.current;
    e.cible = Math.max(0, -rect.top / window.innerHeight);

    const avant = e.t;
    e.t += (e.cible - e.t) * (1 - Math.exp(-delta * 5));
    const v = delta > 0 ? (e.t - avant) / delta : 0;
    e.vitesse += (v - e.vitesse) * 0.15;

    const camZ = -(e.t - 1) * ESPACE;
    state.camera.position.z = camZ;
    // Léger roulis selon la vitesse : la caméra « se penche » dans le mouvement.
    state.camera.rotation.z = THREE.MathUtils.clamp(
      e.vitesse * 0.004,
      -0.012,
      0.012,
    );

    const temps = state.clock.getElapsedTime();
    materiaux.forEach((m, i) => {
      const planZ = -i * ESPACE - FOCALE;
      const distance = camZ - planZ;

      // Apparition au loin, disparition une fois dépassé.
      let opacite =
        lisser(ESPACE * 3.2, ESPACE * 2.2, distance) *
        lisser(1.4, FOCALE * 0.8, distance);
      // L'introduction appartient au titre : les visuels n'apparaissent
      // qu'une fois le défilement commencé.
      opacite *= lisser(0.3, 0.8, e.t);
      // Net au point focal, flou devant et derrière.
      const ecart = Math.abs(distance - FOCALE);
      const flou = FLOU_MAX * lisser(1.2, ESPACE * 1.4, ecart);

      m.uniforms.opacite.value = opacite;
      m.uniforms.flou.value = flou;
      m.uniforms.force.value = THREE.MathUtils.clamp(e.vitesse * 0.2, -1.2, 1.2);
      m.uniforms.temps.value = temps + i;

      const plan = plans.current[i];
      if (plan) plan.visible = opacite > 0.002;
    });
  });

  return (
    <>
      {textures.map((_, i) => {
        const d = disposition.plans[i];
        return (
          <mesh
            key={i}
            ref={(m) => {
              plans.current[i] = m;
            }}
            position={[d.x, d.y, -i * ESPACE - FOCALE]}
            scale={[d.l, d.h, 1]}
            material={materiaux[i]}
          >
            <planeGeometry args={[1, 1, 32, 32]} />
          </mesh>
        );
      })}
    </>
  );
}

/** WebGL indisponible ou contexte refusé : <Canvas> lève une erreur à la
    création du rendu. On la capte ici pour repasser le hero en statique. */
class GardeWebGL extends Component<
  { onEchec: () => void; children: ReactNode },
  { echec: boolean }
> {
  state = { echec: false };
  static getDerivedStateFromError() {
    return { echec: true };
  }
  componentDidCatch() {
    this.props.onEchec();
  }
  render() {
    return this.state.echec ? null : this.props.children;
  }
}

export default function GalerieScene({
  visuels,
  sectionRef,
  actif,
  onEchec,
}: {
  visuels: string[];
  sectionRef: RefObject<HTMLElement | null>;
  /** Faux quand la section est hors écran : la boucle de rendu s'arrête. */
  actif: boolean;
  /** WebGL indisponible : le hero repasse en mode statique. */
  onEchec: () => void;
}) {
  return (
    <GardeWebGL onEchec={onEchec}>
      <Canvas
        aria-hidden="true"
        frameloop={actif ? "always" : "never"}
        dpr={[1, 1.75]}
        camera={{ position: [0, 0, ESPACE], fov: FOV, near: 0.1, far: 80 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        /* Couleurs des captures restituées telles quelles, sans tone mapping. */
        flat
        linear
        className="!absolute inset-0"
      >
        <Scene visuels={visuels} sectionRef={sectionRef} />
      </Canvas>
    </GardeWebGL>
  );
}
