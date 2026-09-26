"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Container, Button, ArrowIcon } from "@/components/ui/primitives";
import { Entree } from "@/components/ui/Entree";
import { Sparkle, HaloOr, TrameOr } from "@/components/brand/Motifs";
import { etapesHero } from "@/lib/content";
import { site } from "@/lib/site";

/* Three.js pèse lourd : chargé à part, côté client seulement, et jamais si le
   visiteur a demandé moins d'animations ou si WebGL est indisponible. */
const GalerieScene = dynamic(() => import("./GalerieScene"), { ssr: false });

const visuels = etapesHero.map((e) => e.visuel.src);
const total = String(etapesHero.length).padStart(2, "0");

/**
 * Hero de l'accueil : galerie 3D qui présente STAR DIGI PRO puis ses six
 * étapes, de l'identité à l'IA.
 *
 * Mécanique : la scène WebGL est collée (`sticky`) en fond pendant que les
 * blocs de texte — un écran par étape — défilent normalement par-dessus. La
 * caméra avance d'une étape par écran défilé ; une fois la sixième passée, la
 * section se termine et le reste du site défile comme avant.
 *
 * Tout le texte est du HTML rendu côté serveur : lisible sans JavaScript,
 * indexable, et le titre reste l'élément LCP. En mode statique (pas de JS,
 * mouvements réduits, pas de WebGL), les visuels s'affichent en simples
 * images sous chaque texte — voir `.galerie` dans globals.css.
 */
export function HeroGalerie() {
  const sectionRef = useRef<HTMLElement>(null);
  const [mode, setMode] = useState<"immersif" | "statique" | null>(null);
  const [actif, setActif] = useState(true);
  const [etape, setEtape] = useState(-1);
  const [pret, setPret] = useState(false);

  /* Choix du mode, une fois monté. La disponibilité de WebGL n'est pas testée
     ici : créer un contexte de test coûte cher au chargement. C'est la scène
     qui bascule en statique si elle ne peut pas démarrer (`onEchec`). */
  useEffect(() => {
    const reduit = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Rendu externe (media query) : setState justifié.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMode(reduit ? "statique" : "immersif");
  }, []);

  /* Démarrage différé de la scène, à la première interaction (défilement,
     souris, doigt, clavier). L'initialisation WebGL — contexte et compilation
     des shaders — est un travail lourd : elle ne doit pas concurrencer le
     premier affichage. Sur mobile, les visuels ne paraissent de toute façon
     qu'après le premier défilement ; sur ordinateur, le moindre mouvement de
     souris suffit. */
  useEffect(() => {
    if (mode !== "immersif") return;
    const demarrer = () => setPret(true);
    const evenements = ["scroll", "pointermove", "touchstart", "keydown"] as const;
    evenements.forEach((e) =>
      window.addEventListener(e, demarrer, { once: true, passive: true }),
    );
    // Page rechargée en cours de défilement : pas d'attente.
    if (window.scrollY > 0) demarrer();
    return () =>
      evenements.forEach((e) => window.removeEventListener(e, demarrer));
  }, [mode]);

  /* Étape courante (pour la navigation) et arrêt du rendu hors écran. */
  useEffect(() => {
    const section = sectionRef.current;
    if (!section || mode !== "immersif") return;

    let frame = 0;
    const lire = () => {
      frame = 0;
      const t = -section.getBoundingClientRect().top / window.innerHeight;
      const i = Math.round(t) - 1;
      setEtape(i >= 0 && i < etapesHero.length ? i : -1);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(lire);
    };
    lire();
    window.addEventListener("scroll", onScroll, { passive: true });

    const observer = new IntersectionObserver(([entry]) =>
      setActif(entry.isIntersecting),
    );
    observer.observe(section);

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [mode]);

  const allerA = (i: number) => {
    document
      .getElementById(`etape-${etapesHero[i].id}`)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section
      ref={sectionRef}
      className="galerie relative"
      data-mode={mode ?? "immersif"}
      aria-label="Présentation de STAR DIGI PRO en six étapes"
    >
      {/* ── Couche fixe : scène 3D + navigation ─────────────────────────── */}
      <div className="galerie-scene sticky top-0 h-svh overflow-hidden">
        <TrameOr />
        <HaloOr className="-left-40 -top-40" size={640} />

        {mode === "immersif" && pret ? (
          <GalerieScene
            visuels={visuels}
            sectionRef={sectionRef}
            actif={actif}
            onEchec={() => setMode("statique")}
          />
        ) : null}

        {/* Voiles de lisibilité sous le texte. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-noir via-noir/60 via-35% to-transparent to-60% lg:bg-gradient-to-r lg:from-noir/85 lg:via-noir/30 lg:via-30% lg:to-transparent lg:to-50%"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-noir to-transparent"
        />

        <nav
          aria-label="Étapes"
          className="absolute inset-x-0 bottom-5 z-20 flex justify-center px-[var(--gutter)]"
        >
          <ol className="flex items-center gap-1.5 sm:gap-2">
            {etapesHero.map((e, i) => (
              <li key={e.id}>
                <button
                  type="button"
                  onClick={() => allerA(i)}
                  aria-current={etape === i ? "step" : undefined}
                  className={`group flex items-center gap-2 rounded-full px-2 py-2 text-[11px] font-medium uppercase tracking-[0.16em] transition-colors duration-300 ${
                    etape === i ? "text-or" : "text-plomb-clair hover:text-blanc"
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className={`block h-px transition-[width,background-color] duration-500 ${
                      etape === i ? "w-8 bg-or" : "w-4 bg-current"
                    }`}
                  />
                  <span className="sr-only sm:not-sr-only">{e.titre}</span>
                </button>
              </li>
            ))}
          </ol>
        </nav>
      </div>

      {/* ── Couche défilante : un écran par bloc ─────────────────────────── */}
      <div className="galerie-pistes pointer-events-none relative z-10">
        {/* Introduction */}
        <div className="galerie-bloc flex items-end pb-[16svh] lg:items-center lg:pb-0">
          <Container>
            <div className="pointer-events-auto max-w-[40rem]">
              <Entree>
                <p className="mb-6 flex flex-wrap items-center gap-x-3 gap-y-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-plomb-clair">
                  {site.domaines.map((d, i) => (
                    <span key={d} className="flex items-center gap-3">
                      {i > 0 ? <Sparkle className="h-2 w-1.5 text-or" /> : null}
                      {d}
                    </span>
                  ))}
                </p>
              </Entree>
              <Entree delay={0.06}>
                <h1 className="h-display text-[clamp(2.3rem,5.4vw,4.3rem)] text-blanc">
                  De la première vue
                  <br />
                  à la <span className="mot-or">première vente.</span>
                </h1>
              </Entree>
              <Entree delay={0.12}>
                <p className="mt-7 max-w-[52ch] text-[clamp(1.02rem,1.35vw,1.2rem)] leading-relaxed text-plomb-clair">
                  {site.promesse} Six briques, assemblées selon votre activité.
                </p>
              </Entree>
              <Entree delay={0.18}>
                <div className="mt-9 flex flex-wrap gap-3">
                  <Button href="/contact" size="lg">
                    {site.cta.primary}
                    <ArrowIcon />
                  </Button>
                  <Button href="/services" variant="outline" size="lg">
                    {site.cta.secondary}
                  </Button>
                </div>
              </Entree>
              <Entree delay={0.3}>
                <p className="galerie-indice mt-10 flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.22em] text-plomb-clair">
                  <span
                    aria-hidden="true"
                    className="relative block h-8 w-px overflow-hidden bg-blanc/15"
                  >
                    <span className="absolute inset-x-0 top-0 h-3 bg-or motion-safe:animate-[indice_2.2s_ease-in-out_infinite]" />
                  </span>
                  Défilez · {etapesHero.length} étapes
                </p>
              </Entree>
            </div>
          </Container>
        </div>

        {/* Les six étapes */}
        {etapesHero.map((e, i) => (
          <article
            key={e.id}
            id={`etape-${e.id}`}
            className="galerie-bloc flex items-end pb-[14svh] lg:items-center lg:pb-0"
          >
            <Container>
              <div className="galerie-texte pointer-events-auto max-w-[30rem]">
                <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-or">
                  <span className="tnum">
                    {String(i + 1).padStart(2, "0")} / {total}
                  </span>
                  <span aria-hidden="true" className="block h-px w-8 bg-or/50" />
                  Démonstration
                </p>
                <h2 className="h-display mt-4 text-[clamp(2.2rem,5vw,4rem)] text-blanc">
                  {e.titre}
                </h2>
                <p className="mt-4 max-w-[42ch] text-[clamp(1rem,1.25vw,1.15rem)] leading-relaxed text-plomb-clair">
                  {e.description}
                </p>
                <Link
                  href={`/services#${e.service}`}
                  className="mt-6 inline-flex items-center gap-2 text-[14px] font-medium text-blanc underline decoration-or/60 underline-offset-[6px] transition-colors hover:text-or"
                >
                  En savoir plus
                  <ArrowIcon />
                </Link>
                {/* Visuel en image simple : affiché en mode statique ; en mode
                    immersif, conservé pour les lecteurs d'écran (même URL que
                    la texture 3D, donc déjà en cache). */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={e.visuel.src}
                  alt={e.visuel.alt}
                  loading="lazy"
                  decoding="async"
                  className="galerie-visuel mt-8 w-full max-w-[34rem]"
                />
              </div>
            </Container>
          </article>
        ))}
      </div>
    </section>
  );
}
