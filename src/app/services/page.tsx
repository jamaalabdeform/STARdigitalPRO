import type { Metadata } from "next";
import Link from "next/link";
import {
  Container,
  SectionHead,
  Eyebrow,
  Button,
  ArrowIcon,
} from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/Reveal";
import { services } from "@/lib/content";
import { site, verticals } from "@/lib/site";

export const metadata: Metadata = {
  title: "Services — identité, web, CRM, automatisation et IA",
  description:
    "Identité visuelle, supports graphiques, sites et e-commerce, CRM, automatisation et assistants intelligents. Les six briques que STAR DIGI PRO assemble selon votre activité.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <section className="pb-16 pt-32 sm:pt-40">
        <Container>
          <Reveal>
            <Eyebrow>Services</Eyebrow>
          </Reveal>
          <Reveal delay={0.06}>
            <h1 className="h-display max-w-[20ch] text-[clamp(2.2rem,5vw,3.9rem)] text-blanc">
              Six briques. Assemblées selon votre activité.
            </h1>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-7 max-w-[60ch] text-[clamp(1rem,1.3vw,1.16rem)] leading-relaxed text-plomb-clair">
              Rares sont les entreprises qui ont besoin des six en même temps. La
              question utile n&apos;est pas « que peut-on faire ? » mais « qu&apos;est-ce
              qui manque réellement, et dans quel ordre ? ».
            </p>
          </Reveal>
          <Reveal delay={0.18}>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button href="/contact" size="lg">
                {site.cta.primary}
                <ArrowIcon />
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Sommaire ancré */}
      <section className="border-y border-blanc/10 py-5">
        <Container>
          <nav aria-label="Sommaire des services" className="no-bar overflow-x-auto">
            <ul className="flex gap-2">
              {services.map((s, i) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className="inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-blanc/15 px-4 py-2 text-[13.5px] text-plomb-clair transition-colors duration-300 hover:border-or hover:bg-or hover:text-noir"
                  >
                    <span className="tnum text-[11px] text-plomb">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </Container>
      </section>

      {/* Détail de chaque brique */}
      <section className="py-16 lg:py-24">
        <Container>
          <div className="flex flex-col gap-16 lg:gap-24">
            {services.map((s, i) => (
              <article
                key={s.id}
                id={s.id}
                className="scroll-mt-28 border-t border-blanc/12 pt-10"
              >
                <Reveal>
                  <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
                    <div>
                      <span className="tnum text-[12px] text-or">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h2 className="h-section mt-3 max-w-[16ch] text-[clamp(1.6rem,3vw,2.3rem)] text-blanc">
                        {s.label}
                      </h2>
                    </div>

                    <div>
                      <p className="max-w-[58ch] text-[clamp(1rem,1.3vw,1.13rem)] leading-relaxed text-plomb-clair">
                        {s.body}
                      </p>
                      <ul className="mt-7 grid gap-x-8 gap-y-3 sm:grid-cols-2">
                        {s.items.map((item) => (
                          <li
                            key={item}
                            className="flex items-start gap-3 border-b border-blanc/10 pb-3 text-[14.5px] text-plomb-clair"
                          >
                            <span
                              aria-hidden="true"
                              className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-or"
                            />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Reveal>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* Renvoi vers les pages métier */}
      <section className="bg-anthracite/45 py-20 lg:py-24">
        <Container>
          <Reveal>
            <SectionHead
              eyebrow="Par métier"
              title="Vous préférez voir ce que ça donne dans votre secteur ?"
              lead="Les mêmes briques, appliquées aux contraintes réelles de votre activité."
            />
          </Reveal>
          <div className="mt-10 flex flex-wrap gap-3">
            {verticals.map((v, i) => (
              <Reveal key={v.slug} delay={i * 0.05}>
                <Link
                  href={`/solutions/${v.slug}`}
                  className="inline-flex items-center gap-2 rounded-full border border-blanc/20 bg-noir px-5 py-3 text-[14px] text-blanc transition-colors duration-300 hover:border-or hover:bg-or hover:text-noir"
                >
                  {v.navLabel}
                  <ArrowIcon />
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-20 lg:py-24">
        <Container>
          <Reveal>
            <div className="grain relative overflow-hidden rounded-3xl bg-noir px-7 py-14 sm:px-12">
              <h2 className="h-display max-w-[22ch] text-[clamp(1.7rem,3.6vw,2.7rem)] text-blanc">
                Un diagnostic avant tout devis.
              </h2>
              <p className="mt-5 max-w-[56ch] text-[15.5px] leading-relaxed text-plomb-clair">
                Nous regardons ce qui existe, ce qui fonctionne et ce qui coince.
                Vous repartez avec un ordre de priorité clair, même si vous
                décidez ensuite de ne rien lancer avec nous.
              </p>
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
