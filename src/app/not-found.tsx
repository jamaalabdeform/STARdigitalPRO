import type { Metadata } from "next";
import { Container, Button, ArrowIcon } from "@/components/ui/primitives";
import { verticals } from "@/lib/site";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page introuvable",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="pb-28 pt-40">
      <Container>
        <p className="tnum text-[13px] text-or">404</p>
        <h1 className="h-display mt-4 max-w-[16ch] text-[clamp(2.2rem,5vw,3.6rem)] text-blanc">
          Cette page n&apos;existe pas.
        </h1>
        <p className="mt-6 max-w-[48ch] text-[16px] leading-relaxed text-plomb-clair">
          Le lien est peut-être ancien, ou l&apos;adresse comporte une faute de
          frappe. Voici par où reprendre.
        </p>

        <div className="mt-9 flex flex-wrap gap-3">
          <Button href="/" size="lg">
            Retour à l&apos;accueil
            <ArrowIcon />
          </Button>
          <Button href="/services" variant="outline" size="lg">
            Voir les services
          </Button>
        </div>

        <div className="mt-14 border-t border-blanc/15 pt-7">
          <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.2em] text-plomb">
            Solutions par métier
          </p>
          <div className="flex flex-wrap gap-2.5">
            {verticals.map((v) => (
              <Link
                key={v.slug}
                href={`/solutions/${v.slug}`}
                className="inline-flex items-center gap-2 rounded-full border border-blanc/20 px-4 py-2 text-[13.5px] text-blanc transition-colors duration-300 hover:border-or hover:bg-or hover:text-noir"
              >
                {v.navLabel}
                <ArrowIcon />
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
