/**
 * Configuration centrale du site.
 *
 * Les formulations de marque (baseline, promesse, domaines d'intervention)
 * proviennent de la charte « Guide de marque premium Star Digi Pro » et ne
 * doivent pas être réécrites librement.
 *
 * ⚠ COORDONNÉES À COMPLÉTER
 * Ni téléphone, ni e-mail, ni adresse n'ont été fournis. Rien n'a été inventé :
 * les champs inconnus valent `null` et l'interface les masque proprement au
 * lieu d'afficher un faux numéro. Une fois renseignés, ils apparaissent
 * automatiquement partout (en-tête, pied de page, contact, JSON-LD).
 */

export const site = {
  name: "STAR DIGI PRO",
  domain: "stardigipro.com",
  url: "https://stardigipro.com",

  /** Baseline officielle — figure sous le logotype sur tous les supports. */
  baseline: "De la première vue à la première vente.",

  /** Promesse longue, telle que formulée sur la charte. */
  promesse:
    "Votre partenaire digital 360° pour les entrepreneurs qui veulent grandir.",

  /** Domaines, dans l'ordre de la charte. */
  domaines: [
    "Communication",
    "Web",
    "CRM",
    "Automatisation",
    "IA",
  ],

  description:
    "STAR DIGI PRO accompagne les entreprises dans leur image, leur présence digitale et leurs outils de croissance : identité visuelle, supports graphiques, sites, CRM, automatisations et solutions intelligentes.",

  markets: ["France", "Belgique"],

  /** À renseigner — voir l'avertissement en tête de fichier. */
  contact: {
    email: null as string | null,
    phone: null as string | null,
    phoneHref: null as string | null,
    whatsapp: null as string | null,
    address: null as string | null,
  },

  social: {
    linkedin: null as string | null,
    instagram: null as string | null,
  },

  cta: {
    primary: "Parler de votre projet",
    secondary: "Découvrir nos solutions",
    project: "Parler de votre projet",
  },
} as const;

export const nav = [
  { href: "/services", label: "Services" },
  { href: "/realisations", label: "Réalisations" },
  { href: "/a-propos", label: "Studio" },
  { href: "/contact", label: "Contact" },
] as const;

/**
 * Les quatre verticales. Les accroches sont celles de la charte, reprises mot
 * pour mot depuis les visuels sectoriels.
 */
export const verticals = [
  {
    slug: "restaurants",
    label: "Restaurants",
    navLabel: "Restaurants",
    teaser: "De la première envie à la réservation.",
  },
  {
    slug: "barbers",
    label: "Barbers",
    navLabel: "Barber shops",
    teaser: "Une image forte. Un planning rempli.",
  },
  {
    slug: "beaute",
    label: "Beauté",
    navLabel: "Instituts de beauté",
    teaser: "Votre expérience commence avant le rendez-vous.",
  },
  {
    slug: "automobile",
    label: "Automobile",
    navLabel: "Automobile",
    teaser: "Une image à la hauteur de ce que vous vendez.",
  },
] as const;

export type VerticalSlug = (typeof verticals)[number]["slug"];
