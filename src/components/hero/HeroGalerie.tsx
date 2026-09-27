"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Container, Button, ArrowIcon } from "@/components/ui/primitives";
import { Entree } from "@/components/ui/Entree";
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
      <div className="galerie-scene grain sticky top-0 h-svh overflow-hidden">
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
                  className={`group flex items-center gap-2 px-2 py-2 text-[11px] font-medium uppercase tracking-[0.16em] transition-colors duration-300 ${
                    etape === i ? "text-blanc" : "text-plomb-clair hover:text-blanc"
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className={`block h-px transition-[width,background-color] duration-500 ${
                      etape === i ? "w-8 bg-blanc" : "w-4 bg-current"
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
        <div className="galerie-bloc flex items-end pb-[11svh] pt-24 lg:items-center lg:pb-0 lg:pt-0">
          <Container>
            <div className="pointer-events-auto max-w-[62rem]">
              <Entree>
                <p className="label mb-8 hidden items-center gap-4 text-plomb-clair sm:flex">
                  {site.name}
                  <span aria-hidden="true" className="block h-px w-10 bg-blanc/30" />
                  Studio digital 360°
                </p>
              </Entree>
              <Entree delay={0.06}>
                <h1 className="h-display text-[clamp(2.6rem,7vw,8.25rem)] text-blanc">
                  De la première vue
                  <br />
                  <span className="mot-accent">à la première vente.</span>
                </h1>
              </Entree>
              <Entree delay={0.12}>
                <p className="mt-9 flex flex-wrap items-center gap-x-4 gap-y-1 text-[clamp(1rem,1.3vw,1.18rem)] text-blanc">
                  {["Communication.", "Design.", "Digital.", "Automatisation."].map(
                    (m) => (
                      <span key={m}>{m}</span>
                    ),
                  )}
                </p>
                <p className="mt-3 max-w-[48ch] text-[clamp(0.98rem,1.2vw,1.08rem)] leading-relaxed text-plomb-clair">
                  {site.promesse}
                </p>
              </Entree>
              <Entree delay={0.18}>
                <div className="mt-10 flex flex-wrap gap-3">
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
                <p className="galerie-indice label mt-10 flex items-center sm:mt-12 gap-4 text-plomb-clair">
                  <span
                    aria-hidden="true"
                    className="relative block h-9 w-px overflow-hidden bg-blanc/15"
                  >
                    <span className="absolute inset-x-0 top-0 h-3 bg-blanc motion-safe:animate-[indice_2.4s_var(--ease-soft)_infinite]" />
                  </span>
                  Six étapes · faites défiler
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
            data-univers={e.id}
            className="galerie-bloc flex items-end pb-[14svh] lg:items-center lg:pb-0"
          >
            <Container>
              <div className="galerie-texte pointer-events-auto max-w-[36rem]">
                {/* L'accent de l'étape porte sur le repère, le filet et le
                    lien — jamais sur le titre, qui reste blanc. */}
                <p className="label flex items-center gap-4 text-plomb-clair">
                  <span className="tnum text-accent-texte">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span aria-hidden="true" className="block h-px w-10 bg-accent-texte/70" />
                  <span className="tnum">{total}</span>
                </p>
                <h2 className="h-display mt-6 text-[clamp(2.75rem,5.6vw,6.5rem)] text-blanc">
                  {e.titre}
                </h2>
                <p className="mt-6 text-[clamp(1.2rem,1.7vw,1.55rem)] font-medium leading-snug tracking-[-0.02em] text-blanc">
                  {e.concept}
                </p>
                <p className="mt-3 max-w-[44ch] text-[clamp(0.98rem,1.15vw,1.08rem)] leading-relaxed text-plomb-clair">
                  {e.description}
                </p>
                <Link
                  href={`/services#${e.service}`}
                  className="group/lien mt-8 inline-flex items-center gap-3 border-b border-accent-texte/60 pb-1.5 text-[14px] font-medium text-blanc transition-colors duration-500 hover:border-accent-texte hover:text-accent-texte"
                >
                  En savoir plus
                  <ArrowIcon className="transition-transform duration-500 group-hover/lien:translate-x-1" />
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
                  width={1440}
                  height={810}
                  className="galerie-visuel mt-8 h-auto w-full max-w-[34rem]"
                />
              </div>
            </Container>
          </article>
        ))}
      </div>
    </section>
  );
}
