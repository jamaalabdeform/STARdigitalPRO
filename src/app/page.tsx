import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import {
  Container,
  SectionHead,
  Button,
  Pill,
  ArrowIcon,
} from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/Reveal";
import { Entree } from "@/components/ui/Entree";
import { Faq } from "@/components/ui/Faq";
import {
  Sparkle,
  HaloOr,
  TrameOr,
  TraineeOr,
  FiletOr,
  PastilleOr,
} from "@/components/brand/Motifs";
import { BrandIcon, iconeParService } from "@/components/brand/Icons";
import { SystemDiagram } from "@/components/mockups/SystemDiagram";
import { BrandSheet } from "@/components/mockups/BrandSheet";
import { PhoneSite } from "@/components/mockups/PhoneSite";
import { BookingWidget } from "@/components/mockups/BookingWidget";
import { CrmPipeline } from "@/components/mockups/CrmPipeline";
import { AutomationFlow } from "@/components/mockups/AutomationFlow";
import { ChatJawabot } from "@/components/mockups/ChatJawabot";
import { services, acts, method, faq, universVerticale } from "@/lib/content";
import { site, verticals } from "@/lib/site";

export const metadata: Metadata = {
  title: `${site.name} — ${site.baseline}`,
  description: site.description,
  alternates: { canonical: "/" },
};

const actVisuals = [
  <BrandSheet key="a1" />,
  <PhoneSite key="a2" />,
  <BookingWidget key="a3" />,
  <CrmPipeline key="a4" />,
  <AutomationFlow key="a5" />,
];

export default function Home() {
  return (
    <>
      {/* ═══════════════════════════════════════════════════════ 1. HERO ═══ */}
      <section className="relative overflow-hidden pb-20 pt-32 sm:pt-40 lg:pb-28">
        <TrameOr />
        <HaloOr className="-left-40 -top-40" size={640} />
        <TraineeOr className="absolute inset-x-0 top-10 h-[420px] w-full opacity-70" />

        <Container className="relative">
          <div className="grid items-center gap-12 lg:grid-cols-[1.12fr_0.88fr] lg:gap-16">
            <div>
              <Entree>
                <p className="mb-6 flex flex-wrap items-center gap-x-3 gap-y-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-plomb-clair">
                  {site.domaines.map((d, i) => (
                    <span key={d} className="flex items-center gap-3">
                      {i > 0 ? (
                        <Sparkle className="h-2 w-1.5 text-or" />
                      ) : null}
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
                <p className="mt-7 max-w-[54ch] text-[clamp(1.02rem,1.35vw,1.2rem)] leading-relaxed text-plomb-clair">
                  {site.promesse} Image de marque, présence digitale, CRM,
                  automatisations et solutions intelligentes — assemblés selon
                  votre activité.
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

              <Entree delay={0.24}>
                <p className="mt-9 flex flex-wrap items-center gap-x-3 gap-y-2 text-[13px] text-plomb-clair">
                  <span>France</span>
                  <span aria-hidden="true" className="text-or">
                    ·
                  </span>
                  <span>Belgique</span>
                  <span aria-hidden="true" className="text-or">
                    ·
                  </span>
                  <span>Solutions sur mesure</span>
                </p>
              </Entree>
            </div>

            <Entree delay={0.14}>
              <SystemDiagram />
            </Entree>
          </div>
        </Container>
      </section>

      <FiletOr />

      {/* ══════════════════════════════════════════════════ 2. OFFRE 360° ═══ */}
      <section className="py-20 lg:py-28">
        <Container>
          <Reveal>
            <SectionHead
              eyebrow="Offre 360°"
              title="Vous n'avez pas besoin de multiplier les prestataires."
              lead="Un logo sans cohérence digitale ne suffit pas. Un site sans parcours client ne suffit pas. Un CRM sans stratégie ne suffit pas. Nous assemblons les briques réellement utiles à votre activité, de l'identité jusqu'aux automatisations."
            />
          </Reveal>

          <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-blanc/12 bg-blanc/10 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => (
              <Reveal key={s.id} delay={i * 0.05}>
                <Link
                  href={`/services#${s.id}`}
                  className="carte-or group flex h-full flex-col bg-noir p-7 transition-colors duration-500 hover:bg-anthracite"
                >
                  <div className="flex items-start justify-between">
                    <BrandIcon
                      name={iconeParService[s.id]}
                      className="h-7 w-7 text-or"
                    />
                    <span className="tnum text-[11px] text-plomb-clair">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="h-section mt-6 flex items-center gap-2 text-[19px] text-blanc">
                    {s.label}
                    <ArrowIcon className="text-or opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  </h3>
                  <p className="mt-3 text-[14.5px] leading-relaxed text-plomb-clair">
                    {s.short}
                  </p>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ═════════════════════════════════════════════ 3. SOLUTIONS MÉTIER ═══ */}
      <section className="py-20 lg:py-28">
        <Container>
          <Reveal>
            <SectionHead
              eyebrow="Univers par secteur"
              title="Des solutions pensées pour votre métier."
              lead="Les besoins d'un restaurant ne sont pas ceux d'un garage. Chaque métier a ses moments de vérité — et ce sont eux qui déterminent les briques à installer."
            />
          </Reveal>

          <div className="mt-14 grid gap-5 sm:grid-cols-2">
            {verticals.map((v, i) => {
              const univers = universVerticale[v.slug];
              return (
                <Reveal key={v.slug} delay={i * 0.06}>
                  <Link
                    href={`/solutions/${v.slug}`}
                    className="group relative flex h-full flex-col justify-end overflow-hidden rounded-2xl border border-blanc/12 transition-[border-color,transform] duration-500 ease-[var(--ease-soft)] hover:-translate-y-0.5 hover:border-or/45"
                  >
                    <Image
                      src={univers.photo}
                      alt=""
                      width={720}
                      height={188}
                      className="absolute inset-0 h-full w-full object-cover opacity-45 transition-[opacity,transform] duration-700 ease-[var(--ease-soft)] group-hover:scale-[1.04] group-hover:opacity-60"
                    />
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-gradient-to-t from-noir via-noir/85 to-noir/35"
                    />

                    <div className="relative flex items-start gap-4 p-7 sm:p-8">
                      <PastilleOr>
                        <BrandIcon name={v.slug} className="h-6 w-6" />
                      </PastilleOr>
                      <div>
                        <h3 className="h-section text-[clamp(1.35rem,2.3vw,1.75rem)] text-blanc">
                          {v.navLabel}
                        </h3>
                        <p className="mt-2 max-w-[34ch] text-[14.5px] leading-relaxed text-plomb-clair">
                          {v.teaser}
                        </p>
                        <span className="mt-4 inline-flex items-center gap-2 text-[13.5px] font-semibold text-or">
                          Voir la solution
                          <ArrowIcon className="transition-transform duration-500 ease-[var(--ease-soft)] group-hover:translate-x-1" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>

      {/* ══════════════════════════════════ 4. PARCOURS — LES CINQ ACTES ═══ */}
      <section className="sec-claire py-20 lg:py-28">
        <Container>
          <Reveal>
            <SectionHead
              tone="sombre"
              eyebrow="Parcours de croissance"
              title="Commencez par votre besoin. Faites évoluer le reste ensuite."
              lead="Cinq étapes, de la première impression jusqu'au client qui revient. Vous n'avez pas à tout transformer d'un coup — mais il vaut mieux savoir où chaque chose se place."
            />
          </Reveal>

          <div className="mt-16 flex flex-col gap-20 lg:gap-28">
            {acts.map((act, i) => (
              <div
                key={act.n}
                className={`grid items-center gap-10 lg:grid-cols-2 lg:gap-16 ${
                  i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
                }`}
              >
                <Reveal>
                  <div>
                    <div className="flex items-center gap-4">
                      {/* Numéro décoratif, volontairement pâle : rendu en
                          pseudo-élément, hors de l'arbre d'accessibilité et
                          des contrôles de contraste qui ne concernent que le
                          texte porteur de sens. */}
                      <span
                        aria-hidden="true"
                        data-n={act.n}
                        className="tnum h-section text-[clamp(2.4rem,5vw,3.4rem)] text-noir/12 before:content-[attr(data-n)]"
                      />
                      <span className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-or-sombre">
                        <Sparkle className="h-3 w-2.5" />
                        {act.eyebrow}
                      </span>
                    </div>

                    <h3 className="h-section mt-3 max-w-[18ch] text-[clamp(1.6rem,3vw,2.4rem)] text-noir">
                      {act.title}
                    </h3>

                    <p className="mt-5 max-w-[50ch] text-[15.5px] leading-relaxed text-anthracite/80">
                      {act.body}
                    </p>

                    <ul className="mt-6 flex flex-wrap gap-2">
                      {act.bullets.map((b) => (
                        <li key={b}>
                          <Pill tone="sombre">{b}</Pill>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>

                <Reveal delay={0.1}>
                  <div className="lg:pl-4">
                    {actVisuals[i]}
                    {i === 4 ? (
                      <div className="mt-5">
                        <ChatJawabot />
                      </div>
                    ) : null}
                  </div>
                </Reveal>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ═══════════════════════════════════════════════ 5. RÉALISATIONS ═══ */}
      <section className="relative overflow-hidden py-20 lg:py-28">
        <HaloOr className="-right-32 top-1/4" size={520} />
        <Container className="relative">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <SectionHead
                eyebrow="Démonstrations"
                title="Des interfaces, pas des captures d'écran."
                lead="Les modules présentés sur cette page sont construits en code, dans ce site. Ce sont des démonstrations d'exécution — pas des projets clients, et jamais présentés comme tels."
              />
              <Button href="/realisations" variant="outline" size="lg">
                Voir les démonstrations
                <ArrowIcon />
              </Button>
            </div>
          </Reveal>

          <div className="mt-14 grid gap-5 md:grid-cols-3">
            <Reveal>
              <DemoCard
                icon="reservation"
                title="Réservation en ligne"
                meta="Booking · Rappels"
                body="Créneaux, confirmation immédiate et rappel automatique la veille."
              />
            </Reveal>
            <Reveal delay={0.06}>
              <DemoCard
                icon="crm"
                title="Pipeline commercial"
                meta="CRM · Suivi"
                body="Toutes les demandes au même endroit, quelle que soit leur origine."
              />
            </Reveal>
            <Reveal delay={0.12}>
              <DemoCard
                icon="ia"
                title="Assistant Jawabot"
                meta="IA · Qualification"
                body="Les questions répétitives absorbées, les demandes sérieuses transmises."
              />
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ═════════════════════════════════════════════════════ 6. MÉTHODE ═══ */}
      <section className="py-20 lg:py-28">
        <Container>
          <Reveal>
            <SectionHead
              eyebrow="Méthode"
              title="Cinq étapes, sans zone d'ombre."
              lead="Vous savez à tout moment ce qui est fait, ce qui reste à faire et pourquoi."
            />
          </Reveal>

          <ol className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-blanc/12 bg-blanc/10 md:grid-cols-5">
            {method.map((m, i) => (
              <Reveal
                key={m.n}
                as="li"
                delay={i * 0.05}
                className="flex h-full flex-col bg-noir p-6"
              >
                  <span className="tnum text-[11px] font-semibold text-or">
                    {m.n}
                  </span>
                  <h3 className="h-section mt-3 text-[17px] text-blanc">
                    {m.title}
                  </h3>
                  <p className="mt-2.5 text-[14px] leading-relaxed text-plomb-clair">
                    {m.body}
                  </p>
              </Reveal>
            ))}
          </ol>
        </Container>
      </section>

      {/* ═════════════════════════════════════════════════════════ 7. FAQ ═══ */}
      <section className="sec-claire py-20 lg:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <Reveal>
              <SectionHead
                tone="sombre"
                eyebrow="Questions fréquentes"
                title="Ce qu'on nous demande le plus souvent."
              />
            </Reveal>
            <Reveal delay={0.08}>
              <Faq items={faq} tone="sombre" />
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ══════════════════════════════════════════════════ 8. CTA FINAL ═══ */}
      <section className="py-20 lg:py-28">
        <Container>
          <Reveal>
            <div className="grain relative overflow-hidden rounded-3xl border border-or/30 bg-anthracite px-7 py-16 text-center sm:px-12 lg:py-20">
              <TrameOr />
              <HaloOr className="left-1/2 top-0 -translate-x-1/2" size={560} />
              <div className="relative">
                <Sparkle className="mx-auto mb-7 h-9 w-7 text-or" />
                <h2 className="h-display mx-auto max-w-[20ch] text-[clamp(1.9rem,4.4vw,3.3rem)] text-blanc">
                  Et si votre digital travaillait réellement pour votre
                  entreprise ?
                </h2>
                <p className="mx-auto mt-6 max-w-[58ch] text-[15.5px] leading-relaxed text-plomb-clair">
                  Expliquez-nous votre activité et ce que vous souhaitez
                  améliorer. Nous vous dirons quelles briques sont réellement
                  pertinentes — y compris celles dont vous n&apos;avez pas
                  besoin.
                </p>
                <div className="mt-9 flex flex-wrap justify-center gap-3">
                  <Button href="/contact" size="lg">
                    {site.cta.project}
                    <ArrowIcon />
                  </Button>
                  <Button href="/services" variant="outline" size="lg">
                    Parcourir les services
                  </Button>
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}

/* ------------------------------------------------------------------------- */

function DemoCard({
  icon,
  title,
  meta,
  body,
}: {
  icon: "reservation" | "crm" | "ia";
  title: string;
  meta: string;
  body: string;
}) {
  return (
    <div className="carte-or flex h-full flex-col rounded-2xl border border-blanc/12 bg-anthracite/60 p-7">
      <div className="flex items-center justify-between">
        <BrandIcon name={icon} className="h-6 w-6 text-or" />
        <Pill tone="or">Démo</Pill>
      </div>
      <p className="mt-6 text-[11px] uppercase tracking-[0.18em] text-plomb-clair">
        {meta}
      </p>
      <h3 className="h-section mt-2 text-[19px] text-blanc">{title}</h3>
      <p className="mt-3 text-[14.5px] leading-relaxed text-plomb-clair">
        {body}
      </p>
    </div>
  );
}
