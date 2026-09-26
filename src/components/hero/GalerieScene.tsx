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
 * avec la vitesse de défilement.
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
    float intensite = force * 0.3;
    float d = length(pos.xy);
    float courbe = d * d * intensite;
    float ride = (sin(pos.x * 2.0 + force * 3.0) * 0.02
                + sin(pos.y * 2.5 + force * 2.0) * 0.015) * abs(intensite) * 2.0;

    // Respiration très lente au repos, pour que la scène ne soit jamais figée.
    float souffle = sin(pos.x * 1.6 + temps * 0.9) * 0.012;

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

/** Poussière dorée le long du trajet de la caméra : donne la profondeur. */
function Poussiere({ nombre, longueur }: { nombre: number; longueur: number }) {
  const positions = useMemo(() => {
    const p = new Float32Array(nombre * 3);
    // Générateur déterministe : même nuage à chaque rendu.
    let graine = 7;
    const alea = () => {
      graine = (graine * 16807) % 2147483647;
      return graine / 2147483647;
    };
    for (let i = 0; i < nombre; i++) {
      const angle = alea() * Math.PI * 2;
      const rayon = 2.2 + alea() * 6;
      p[i * 3] = Math.cos(angle) * rayon;
      p[i * 3 + 1] = Math.sin(angle) * rayon * 0.7;
      p[i * 3 + 2] = ESPACE * 1.5 - alea() * longueur;
    }
    return p;
  }, [nombre, longueur]);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color="#d4af37"
        size={0.035}
        sizeAttenuation
        transparent
        opacity={0.55}
        depthWrite={false}
      />
    </points>
  );
}

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
      const hMax = demiH * (large ? 1.25 : 0.85);
      const lMax = demiL * (large ? 1.15 : 2);
      const h = Math.min(hMax, lMax / ratio);
      return {
        x: large ? demiL * 0.5 : 0,
        y: large ? 0 : demiH * 0.3,
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
      e.vitesse * 0.01,
      -0.03,
      0.03,
    );

    const temps = state.clock.getElapsedTime();
    materiaux.forEach((m, i) => {
      const planZ = -i * ESPACE - FOCALE;
      const distance = camZ - planZ;

      // Apparition au loin, disparition une fois dépassé.
      let opacite =
        lisser(ESPACE * 3.2, ESPACE * 2.2, distance) *
        lisser(1.4, FOCALE * 0.8, distance);
      // Sur mobile, le texte d'introduction occupe tout l'écran : les visuels
      // n'apparaissent qu'une fois le défilement commencé.
      if (!disposition.large) opacite *= lisser(0.3, 0.8, e.t);
      // Net au point focal, flou devant et derrière.
      const ecart = Math.abs(distance - FOCALE);
      const flou = FLOU_MAX * lisser(1.2, ESPACE * 1.4, ecart);

      m.uniforms.opacite.value = opacite;
      m.uniforms.flou.value = flou;
      m.uniforms.force.value = THREE.MathUtils.clamp(e.vitesse * 0.35, -2, 2);
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
      <Poussiere nombre={520} longueur={ESPACE * (visuels.length + 2)} />
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
