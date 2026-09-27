import type { Metadata } from "next";
import {
  Container,
  SectionHead,
  Eyebrow,
  Button,
  ArrowIcon,
} from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/Reveal";
import { Entree } from "@/components/ui/Entree";
import { method } from "@/lib/content";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Studio — partenaire digital 360°",
  description:
    "STAR DIGI PRO assemble image de marque, présence digitale et outils de gestion pour les TPE, PME et commerces en France et en Belgique.",
  alternates: { canonical: "/a-propos" },
};

const principes = [
  {
    title: "Une brique à la fois",
    body: "Un projet qui démarre par tout refaire échoue plus souvent qu'il ne réussit. Nous préférons livrer ce qui manque le plus, le mettre en service, puis continuer.",
  },
  {
    title: "Pas d'outil pour l'outil",
    body: "Un CRM inutilisé coûte plus cher qu'un carnet bien tenu. Nous n'installons un système que si quelqu'un s'en servira réellement le lundi matin.",
  },
  {
    title: "L'IA quand elle sert",
    body: "Un assistant a du sens là où les mêmes questions reviennent dix fois par jour. Ailleurs, c'est un gadget — et nous le disons.",
  },
  {
    title: "Ce qui est livré vous appartient",
    body: "Fichiers sources, accès, noms de domaine, comptes : tout reste à votre nom. Un prestataire ne doit jamais être un point de blocage.",
  },
];

export default function AProposPage() {
  return (
    <>
      <section className="pb-16 pt-32 sm:pt-40">
        <Container>
          <Entree>
            <Eyebrow>Studio</Eyebrow>
          </Entree>
          <Entree delay={0.06}>
            <h1 className="h-display max-w-[16ch] text-[clamp(2.75rem,6.4vw,6.5rem)] text-blanc">
              Ni agence de com, ni agence web.
            </h1>
          </Entree>
          <Entree delay={0.12}>
            <div className="mt-7 max-w-[62ch] space-y-5 text-[clamp(1rem,1.3vw,1.16rem)] leading-relaxed text-plomb-clair">
              <p>
                La plupart des commerces et des PME travaillent avec trois
                prestataires qui ne se parlent pas : l&apos;un fait le logo,
                l&apos;autre le site, un troisième s&apos;occupe des réseaux. Le
                résultat tient rarement ensemble, et personne n&apos;est
                responsable du parcours complet.
              </p>
              <p>
                STAR DIGI PRO existe pour couvrir ce parcours d&apos;un bout à
                l&apos;autre : l&apos;image qui attire, le site qui convertit, les
                outils qui suivent les demandes, les automatisations qui
                entretiennent la relation.
              </p>
              <p className="text-plomb-clair">
                Nous intervenons en France et en Belgique, auprès de TPE, PME,
                indépendants et commerces de proximité.
              </p>
            </div>
          </Entree>
        </Container>
      </section>

      <section className="border-t border-blanc/10 py-20 lg:py-24">
        <Container>
          <Reveal>
            <SectionHead
              eyebrow="Principes"
              title="Quatre règles que nous nous appliquons."
            />
          </Reveal>

          <div className="mt-12 grid gap-px overflow-hidden border border-blanc/12 bg-blanc/10 sm:grid-cols-2">
            {principes.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.05}>
                <div className="flex h-full flex-col bg-noir p-7">
                  <span className="tnum text-[11px] text-blanc">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="h-section mt-3 text-[19px] text-blanc">
                    {p.title}
                  </h3>
                  <p className="mt-3 text-[14.5px] leading-relaxed text-plomb-clair">
                    {p.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-graphite/45 py-20 lg:py-24">
        <Container>
          <Reveal>
            <SectionHead
              eyebrow="Méthode"
              title="Comment se déroule un projet."
              lead="Le même cadre, quelle que soit la taille du chantier — d'un simple logo à un dispositif complet."
            />
          </Reveal>

          <ol className="mt-12 border-t border-blanc/15">
            {method.map((m) => (
              <Reveal
                key={m.n}
                as="li"
                className="grid gap-4 border-b border-blanc/15 py-7 sm:grid-cols-[auto_1fr_2fr] sm:gap-10"
              >
                  <span className="tnum text-[12px] text-blanc sm:pt-1.5">
                    {m.n}
                  </span>
                  <h3 className="h-section text-[19px] text-blanc">
                    {m.title}
                  </h3>
                  <p className="max-w-[58ch] text-[15px] leading-relaxed text-plomb-clair">
                    {m.body}
                  </p>
              </Reveal>
            ))}
          </ol>
        </Container>
      </section>

      <section className="py-20 lg:py-24">
        <Container>
          <Reveal>
            <div className="grain relative overflow-hidden bg-noir px-7 py-14 sm:px-12">
              <SectionHead
                tone="clair"
                title="Parlons de votre activité."
                lead="Un échange suffit généralement à identifier les deux priorités qui comptent."
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
