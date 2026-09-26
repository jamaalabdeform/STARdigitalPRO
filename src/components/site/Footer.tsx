import Link from "next/link";
import { Logo } from "./Logo";
import { Container, ArrowIcon } from "@/components/ui/primitives";
import { site, nav, verticals } from "@/lib/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-blanc/10 bg-noir text-plomb-clair">
      <Container className="py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Logo tone="clair" size="lg" baseline />
            <p className="mt-6 max-w-[34ch] text-[14.5px] leading-relaxed text-plomb-clair">
              {site.baseline}
            </p>
            <p className="mt-5 text-[13px] text-plomb-clair">
              {site.markets.join(" · ")}
            </p>
          </div>

          <FooterCol title="Services">
            <FooterLink href="/services">Toutes les prestations</FooterLink>
            <FooterLink href="/services#identite">Identité &amp; branding</FooterLink>
            <FooterLink href="/services#print">Création graphique</FooterLink>
            <FooterLink href="/services#web">Sites &amp; e-commerce</FooterLink>
            <FooterLink href="/services#crm">CRM &amp; parcours client</FooterLink>
            <FooterLink href="/services#automatisation">Automatisation</FooterLink>
            <FooterLink href="/services#ia">IA &amp; Jawabot</FooterLink>
          </FooterCol>

          <FooterCol title="Métiers">
            {verticals.map((v) => (
              <FooterLink key={v.slug} href={`/solutions/${v.slug}`}>
                {v.navLabel}
              </FooterLink>
            ))}
          </FooterCol>

          <FooterCol title="Société">
            {nav
              .filter((i) => i.href !== "/services")
              .map((i) => (
                <FooterLink key={i.href} href={i.href}>
                  {i.label}
                </FooterLink>
              ))}
            {site.contact.email ? (
              <FooterLink href={`mailto:${site.contact.email}`}>
                {site.contact.email}
              </FooterLink>
            ) : null}
            {site.contact.phone && site.contact.phoneHref ? (
              <FooterLink href={site.contact.phoneHref}>
                {site.contact.phone}
              </FooterLink>
            ) : null}
          </FooterCol>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-blanc/10 pt-7 text-[12.5px] md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {site.name} — {site.domain}
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 text-blanc transition-colors duration-300 hover:text-or"
          >
            {site.cta.project}
            <ArrowIcon />
          </Link>
        </div>
      </Container>
    </footer>
  );
}

function FooterCol({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.22em] text-plomb-clair">
        {title}
      </p>
      <ul className="flex flex-col gap-2.5">{children}</ul>
    </div>
  );
}

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <li>
      <Link
        href={href}
        className="text-[14px] text-plomb-clair transition-colors duration-300 hover:text-or"
      >
        {children}
      </Link>
    </li>
  );
}
