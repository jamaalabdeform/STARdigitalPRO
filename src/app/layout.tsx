import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { site } from "@/lib/site";

/* Plus Jakarta Sans est la typographie imposée par la charte de marque.
   Servie en local par next/font : aucune requête vers un tiers. */
const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.baseline}`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: site.name,
    url: site.url,
    title: `${site.name} — ${site.baseline}`,
    description: site.description,
    images: [{ url: "/brand/icon-dark.png", width: 192, height: 184 }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.baseline}`,
    description: site.description,
  },
  robots: { index: true, follow: true },
  icons: {
    icon: [{ url: "/brand/favicon.png", type: "image/png" }],
    apple: [{ url: "/brand/apple-touch-icon.png" }],
  },
};

/**
 * Données structurées limitées aux informations réellement connues.
 * Ni téléphone, ni e-mail, ni adresse ne sont déclarés tant qu'ils ne sont pas
 * fournis : un balisage inexact est pire qu'un balisage absent.
 */
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  url: site.url,
  slogan: site.baseline,
  description: site.description,
  logo: `${site.url}/brand/icon-dark.png`,
  areaServed: site.markets.map((m) => ({ "@type": "Country", name: m })),
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr" className={`${jakarta.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        {/* Marque <html> avant le premier rendu : les apparitions au défilement
            ne sont masquées que si le JavaScript tourne réellement. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.add("js")`,
          }}
        />
        <a
          href="#contenu"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-or focus:px-5 focus:py-3 focus:font-medium focus:text-noir"
        >
          Aller au contenu
        </a>
        <Header />
        <main id="contenu" className="flex-1">
          {children}
        </main>
        <Footer />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
      </body>
    </html>
  );
}
