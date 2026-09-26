import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  Container,
  SectionHead,
  Button,
  ArrowIcon,
} from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/Reveal";
import { Faq } from "@/components/ui/Faq";
import { PhoneSite } from "@/components/mockups/PhoneSite";
import { BookingWidget } from "@/components/mockups/BookingWidget";
import { CrmPipeline } from "@/components/mockups/CrmPipeline";
import { AutomationFlow } from "@/components/mockups/AutomationFlow";
import { ChatJawabot } from "@/components/mockups/ChatJawabot";
import { verticalPages, getVertical, universVerticale } from "@/lib/content";
import { BrandIcon, type NomSecteur } from "@/components/brand/Icons";
import { PastilleOr, TrameOr } from "@/components/brand/Motifs";
import { site } from "@/lib/site";

/** Les quatre URL sont connues à l'avance : elles sont générées au build. */
export function generateStaticParams() {
  return verticalPages.map((v) => ({ slug: v.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/solutions/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const vertical = getVertical(slug);
  if (!vertical) return {};

  return {
    title: vertical.metaTitle,
    description: vertical.metaDescription,
    alternates: { canonical: `/solutions/${vertical.slug}` },
    openGraph: {
      title: `${vertical.metaTitle} — ${site.name}`,
      description: vertical.metaDescription,
      url: `/solutions/${vertical.slug}`,
    },
  };
}

/** Chaque métier reçoit les deux modules qui parlent le plus à son quotidien. */
const visuals: Record<string, React.ReactNode[]> = {
  restaurants: [<PhoneSite key="a" />, <AutomationFlow key="b" />],
  barbers: [<BookingWidget key="a" />, <ChatJawabot key="b" />],
  beaute: [<BookingWidget key="a" />, <AutomationFlow key="b" />],
  automobile: [<CrmPipeline key="a" />, <PhoneSite key="b" />],
};

export default async function VerticalPage({
  params,
}: PageProps<"/solutions/[slug]">) {
  const { slug } = await params;
  const vertical = getVertical(slug);
  if (!vertical) notFound();

  const univers = universVerticale[vertical.slug];
  const [visualA, visualB] = visuals[vertical.slug] ?? [null, null];
  const others = verticalPages.filter((v) => v.slug !== vertical.slug);

  return (
    <>
      {/* Hero — bandeau d'ambiance du secteur, issu de la charte */}
      <section className="relative overflow-hidden pb-16 pt-32 sm:pt-40">
        <div aria-hidden="true" className="absolute inset-x-0 top-0 h-[340px]">
          <Image
            src={univers.photo}
            alt=""
            width={720}
            height={188}
            priority
            className="h-full w-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-noir/55 via-noir/85 to-noir" />
        </div>
        <TrameOr />

        <Container className="relative">
          <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
            <div>
              <Reveal>
                <div className="mb-6 flex items-center gap-4">
                  <PastilleOr>
                    <BrandIcon name={vertical.slug as NomSecteur} className="h-6 w-6" />
                  </PastilleOr>
                  <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-or">
                    Solutions · {vertical.label}
                  </span>
                </div>
              </Reveal>
              <Reveal delay={0.06}>
                <h1 className="h-display max-w-[17ch] text-[clamp(2.1rem,4.8vw,3.7rem)] text-blanc">
                  {vertical.hero}
                </h1>
              </Reveal>
              <Reveal delay={0.09}>
                <p className="mt-4 text-[14px] font-semibold uppercase tracking-[0.14em] text-or-clair">
                  {univers.accroche}
                </p>
              </Reveal>
              <Reveal delay={0.12}>
                <p className="mt-7 max-w-[56ch] text-[clamp(1rem,1.3vw,1.14rem)] leading-relaxed text-plomb-clair">
                  {vertical.intro}
                </p>
              </Reveal>
              <Reveal delay={0.18}>
                <div className="mt-9 flex flex-wrap gap-3">
                  <Button href="/contact" size="lg">
                    {vertical.cta}
                    <ArrowIcon />
                  </Button>
                  <Button href="/services" variant="outline" size="lg">
                    Voir toutes les briques
                  </Button>
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.14}>
              <div>{visualA}</div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Constats de terrain */}
      <section className="border-t border-blanc/10 py-20 lg:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
            <Reveal>
              <SectionHead
                eyebrow="Ce qui coince souvent"
                title="Les points qui font perdre des clients."
                lead="Observations de terrain, pas statistiques : ce sont les situations que nous rencontrons le plus régulièrement dans ce métier."
              />
            </Reveal>

            <Reveal delay={0.08}>
              <ul className="border-t border-blanc/15">
                {vertical.problems.map((p, i) => (
                  <li
                    key={p}
                    className="flex items-start gap-5 border-b border-blanc/15 py-5"
                  >
                    <span className="tnum mt-0.5 text-[12px] text-or">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="max-w-[58ch] text-[15.5px] leading-relaxed text-plomb-clair">
                      {p}
                    </p>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Réponses */}
      <section className="bg-anthracite/45 py-20 lg:py-24">
        <Container>
          <Reveal>
            <SectionHead
              eyebrow="Ce que nous mettons en place"
              title="Les briques utiles à ce métier."
            />
          </Reveal>

          <div className="mt-12 grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
            <div className="grid gap-px overflow-hidden rounded-2xl border border-blanc/12 bg-blanc/10 sm:grid-cols-2">
              {vertical.solutions.map((s, i) => (
                <Reveal key={s.title} delay={i * 0.05}>
                  <div className="flex h-full flex-col bg-noir p-6">
                    <span className="tnum text-[11px] text-or">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="h-section mt-3 text-[17px] text-blanc">
                      {s.title}
                    </h3>
                    <p className="mt-2.5 text-[14px] leading-relaxed text-plomb-clair">
                      {s.body}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.12}>
              <div>{visualB}</div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* FAQ métier */}
      <section className="py-20 lg:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <Reveal>
              <SectionHead
                eyebrow="Questions fréquentes"
                title={`${vertical.label} : ce qu'on nous demande.`}
              />
            </Reveal>
            <Reveal delay={0.08}>
              <Faq items={vertical.faq} />
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Autres métiers + CTA */}
      <section className="pb-24">
        <Container>
          <Reveal>
            <div className="grain relative overflow-hidden rounded-3xl bg-noir px-7 py-14 sm:px-12">
              <h2 className="h-display max-w-[20ch] text-[clamp(1.7rem,3.6vw,2.7rem)] text-blanc">
                {vertical.cta}
              </h2>
              <p className="mt-5 max-w-[56ch] text-[15.5px] leading-relaxed text-plomb-clair">
                Décrivez-nous votre activité. Nous vous indiquons les deux ou
                trois priorités réelles, sans vendre ce qui ne servirait pas.
              </p>
              <div className="mt-8">
                <Button href="/contact" size="lg">
                  {site.cta.project}
                  <ArrowIcon />
                </Button>
              </div>

              <div className="mt-12 border-t border-blanc/15 pt-7">
                <p className="mb-4 text-[11px] uppercase tracking-[0.2em] text-plomb">
                  Autres métiers
                </p>
                <div className="flex flex-wrap gap-2.5">
                  {others.map((o) => (
                    <Link
                      key={o.slug}
                      href={`/solutions/${o.slug}`}
                      className="inline-flex items-center gap-2 rounded-full border border-blanc/25 px-4 py-2 text-[13.5px] text-blanc transition-colors duration-300 hover:bg-or hover:text-noir"
                    >
                      {o.navLabel}
                      <ArrowIcon />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
