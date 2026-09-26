import type { Metadata } from "next";
import {
  Container,
  SectionHead,
  Eyebrow,
  Button,
  Pill,
  ArrowIcon,
} from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/Reveal";
import { BrandSheet } from "@/components/mockups/BrandSheet";
import { PhoneSite } from "@/components/mockups/PhoneSite";
import { BookingWidget } from "@/components/mockups/BookingWidget";
import { CrmPipeline } from "@/components/mockups/CrmPipeline";
import { AutomationFlow } from "@/components/mockups/AutomationFlow";
import { ChatJawabot } from "@/components/mockups/ChatJawabot";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Réalisations — démonstrations et concepts",
  description:
    "Démonstrations d'interfaces construites par STAR DIGI PRO : planche de marque, site mobile, réservation, pipeline CRM, automatisation et assistant Jawabot.",
  alternates: { canonical: "/realisations" },
};

const demos = [
  {
    id: "marque",
    kind: "Identité",
    title: "Planche de marque",
    body: "Lockup, nuancier, spécimen typographique et déclinaisons. Le point de départ de toute cohérence : ce document sert ensuite de référence à tous les supports, du menu à la publication.",
    visual: <BrandSheet />,
  },
  {
    id: "site",
    kind: "Web · Recherche locale",
    title: "Site mobile et fiche d'établissement",
    body: "La majorité des visites se fait sur téléphone. Le site et la fiche en ligne travaillent ensemble : l'une amène, l'autre convainc, et les deux doivent dire la même chose.",
    visual: <PhoneSite />,
  },
  {
    id: "reservation",
    kind: "Conversion",
    title: "Réservation et rappel automatique",
    body: "Choisir un créneau doit prendre trois gestes. La confirmation part immédiatement, le rappel la veille — c'est le moyen le plus simple de limiter les rendez-vous oubliés.",
    visual: <BookingWidget />,
  },
  {
    id: "crm",
    kind: "Gestion",
    title: "Pipeline commercial",
    body: "Les demandes arrivent du site, de WhatsApp, du téléphone. Elles atterrissent au même endroit, avec leur origine et leur prochaine étape.",
    visual: <CrmPipeline />,
  },
  {
    id: "automatisation",
    kind: "Automatisation",
    title: "Scénario de fidélisation",
    body: "Un déclencheur, une temporisation, deux actions. Ce qui se répète à l'identique n'a pas à occuper quelqu'un tous les jours.",
    visual: <AutomationFlow />,
  },
  {
    id: "jawabot",
    kind: "IA",
    title: "Assistant Jawabot",
    body: "Horaires, disponibilités, tarifs : les questions qui reviennent sans cesse sont traitées, et seules les demandes sérieuses remontent, déjà qualifiées.",
    visual: <ChatJawabot />,
  },
];

export default function RealisationsPage() {
  return (
    <>
      <section className="pb-14 pt-32 sm:pt-40">
        <Container>
          <Reveal>
            <Eyebrow>Réalisations</Eyebrow>
          </Reveal>
          <Reveal delay={0.06}>
            <h1 className="h-display max-w-[19ch] text-[clamp(2.2rem,5vw,3.9rem)] text-blanc">
              Démonstrations et concepts.
            </h1>
          </Reveal>
          <Reveal delay={0.12}>
            <div className="mt-7 max-w-[62ch] space-y-4 text-[clamp(1rem,1.3vw,1.16rem)] leading-relaxed text-plomb-clair">
              <p>
                Les modules présentés ici sont construits en code et fonctionnent
                dans cette page — ce ne sont ni des images, ni des captures
                d&apos;écran, ni des maquettes retouchées.
              </p>
              <p className="text-plomb-clair">
                Ce sont des <strong className="font-medium">démonstrations</strong>.
                Aucun n&apos;est un projet client et aucun n&apos;est présenté comme
                tel. Les portfolios clients seront publiés lorsque les projets
                concernés seront en ligne et les accords obtenus.
              </p>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="pb-20 lg:pb-28">
        <Container>
          <div className="flex flex-col gap-16 lg:gap-24">
            {demos.map((d, i) => (
              <article
                key={d.id}
                id={d.id}
                className="scroll-mt-28 border-t border-blanc/12 pt-10"
              >
                <div
                  className={`grid items-center gap-10 lg:grid-cols-2 lg:gap-16 ${
                    i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
                  }`}
                >
                  <Reveal>
                    <div>
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-plomb">
                          {d.kind}
                        </span>
                        <Pill tone="or">Démonstration</Pill>
                      </div>
                      <h2 className="h-section mt-4 max-w-[18ch] text-[clamp(1.5rem,2.8vw,2.2rem)] text-blanc">
                        {d.title}
                      </h2>
                      <p className="mt-5 max-w-[52ch] text-[15.5px] leading-relaxed text-plomb-clair">
                        {d.body}
                      </p>
                    </div>
                  </Reveal>

                  <Reveal delay={0.1}>
                    <div className="lg:pl-4">{d.visual}</div>
                  </Reveal>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="pb-24">
        <Container>
          <Reveal>
            <div className="grain relative overflow-hidden rounded-3xl bg-noir px-7 py-14 sm:px-12">
              <SectionHead
                tone="clair"
                title="Vous voulez voir ce que ça donnerait chez vous ?"
                lead="Nous partons de votre activité réelle : ce que vous vendez, qui vous appelle, et ce qui vous fait perdre du temps."
              />
              <div className="mt-8">
                <Button href="/contact" size="lg">
                  {site.cta.primary}
                  <ArrowIcon />
                </Button>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
