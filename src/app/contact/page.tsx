import type { Metadata } from "next";
import { Container, Eyebrow } from "@/components/ui/primitives";
import { Entree } from "@/components/ui/Entree";
import { ContactForm } from "@/components/ui/ContactForm";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact — parler de votre projet",
  description:
    "Décrivez votre activité et ce que vous souhaitez améliorer. STAR DIGI PRO vous indique les briques réellement pertinentes. France et Belgique.",
  alternates: { canonical: "/contact" },
};

const etapes = [
  {
    title: "Vous décrivez votre activité",
    body: "Ce que vous vendez, comment les clients vous trouvent aujourd'hui, ce qui vous fait perdre du temps.",
  },
  {
    title: "Nous regardons l'existant",
    body: "Site, fiche en ligne, supports, outils de gestion. Ce qui tient la route est conservé.",
  },
  {
    title: "Vous recevez des priorités",
    body: "Deux ou trois actions classées par impact, avec ce qui peut attendre. Sans engagement de votre part.",
  },
];

export default function ContactPage() {
  return (
    <section className="pb-24 pt-32 sm:pt-40">
      <Container>
        <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          {/* Colonne explicative */}
          <div className="min-w-0">
            <Entree>
              <Eyebrow>Contact</Eyebrow>
            </Entree>
            <Entree delay={0.06}>
              <h1 className="h-display max-w-[12ch] text-[clamp(2.75rem,6.4vw,6.5rem)] text-blanc">
                Parler de votre projet.
              </h1>
            </Entree>
            <Entree delay={0.12}>
              <p className="mt-6 max-w-[46ch] text-[16px] leading-relaxed text-plomb-clair">
                Gratuit et sans engagement. L&apos;objectif est de vous donner un
                avis utile, pas de vous vendre le maximum de prestations.
              </p>
            </Entree>

            <Entree delay={0.18}>
              <ol className="mt-10 border-t border-blanc/15">
                {etapes.map((e, i) => (
                  <li
                    key={e.title}
                    className="flex gap-5 border-b border-blanc/15 py-5"
                  >
                    <span className="tnum mt-0.5 text-[12px] text-blanc">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h2 className="text-[15px] font-medium text-blanc">
                        {e.title}
                      </h2>
                      <p className="mt-1.5 max-w-[42ch] text-[14px] leading-relaxed text-plomb-clair">
                        {e.body}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </Entree>

            <Entree delay={0.24}>
              <div className="mt-10 space-y-2 text-[14px] text-plomb-clair">
                <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-plomb-clair">
                  Zones d&apos;intervention
                </p>
                <p>{site.markets.join(" · ")}</p>

                {/* Affichés seulement une fois renseignés dans src/lib/site.ts */}
                {site.contact.email ? (
                  <p>
                    <a
                      href={`mailto:${site.contact.email}`}
                      className="border-b border-blanc/25 pb-0.5 transition-colors duration-300 hover:border-blanc hover:text-blanc"
                    >
                      {site.contact.email}
                    </a>
                  </p>
                ) : null}
                {site.contact.phone && site.contact.phoneHref ? (
                  <p>
                    <a
                      href={site.contact.phoneHref}
                      className="border-b border-blanc/25 pb-0.5 transition-colors duration-300 hover:border-blanc hover:text-blanc"
                    >
                      {site.contact.phone}
                    </a>
                  </p>
                ) : null}
              </div>
            </Entree>
          </div>

          {/* Formulaire */}
          <Entree delay={0.1} className="min-w-0">
            <div className="min-w-0 bg-casse p-7 sm:p-10">
              <ContactForm />
            </div>
          </Entree>
        </div>
      </Container>
    </section>
  );
}
