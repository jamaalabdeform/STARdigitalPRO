import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { site } from "@/lib/site";

/* Inter : alternative libre à Suisse Int'l, retenue par la charte noir / blanc.
   Police variable (toutes graisses en un fichier), servie en local par
   next/font : aucune requête vers un tiers. */
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
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
    // Image : src/app/opengraph-image.tsx (convention de fichier Next.js).
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
    <html lang="fr" className={`${inter.variable} h-full antialiased`}>
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
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-blanc focus:px-5 focus:py-3 focus:font-medium focus:text-noir"
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
