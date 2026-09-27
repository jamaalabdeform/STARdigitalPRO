import type { ReactNode } from "react";

/* ============================================================================
   Iconographie STAR DIGI PRO
   Trait fin, extrémités arrondies, grille 24×24, couleur héritée (`currentColor`)
   pour se poser aussi bien en blanc sur fond noir qu'en noir sur fond clair.
   Reprend les deux familles de la charte : icônes de prestation et icônes
   sectorielles.
   ============================================================================ */

const traits = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.4,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

/* ------------------------------------------------- Icônes de prestation --- */

const prestations = {
  branding: (
    <>
      <path d="M12 3a9 9 0 1 0 0 18 1.8 1.8 0 0 0 1.4-2.9 1.8 1.8 0 0 1 1.4-2.9h1.7A3.5 3.5 0 0 0 20.9 11 9 9 0 0 0 12 3Z" />
      <circle cx="8.4" cy="10.4" r=".9" />
      <circle cx="11.4" cy="7.4" r=".9" />
      <circle cx="15.3" cy="9" r=".9" />
    </>
  ),
  web: (
    <>
      <rect x="3" y="5" width="18" height="11.5" rx="1.6" />
      <path d="M3 9h18M9.5 20.5h5M12 16.5v4" />
    </>
  ),
  ecommerce: (
    <>
      <path d="M3 4.5h1.8l2.2 9.4a1.8 1.8 0 0 0 1.8 1.4h7.1a1.8 1.8 0 0 0 1.8-1.4L19.4 8H6.2" />
      <circle cx="9.6" cy="19" r="1.3" />
      <circle cx="16.8" cy="19" r="1.3" />
    </>
  ),
  reservation: (
    <>
      <rect x="3.5" y="5.5" width="17" height="15" rx="1.8" />
      <path d="M8 3v4M16 3v4M3.5 10h17" />
      <circle cx="9" cy="14.5" r="1" />
    </>
  ),
  crm: (
    <>
      <circle cx="9.2" cy="8.4" r="3.1" />
      <path d="M3.4 20a5.8 5.8 0 0 1 11.6 0" />
      <circle cx="17.4" cy="9.6" r="2.2" />
      <path d="M17 20a4.6 4.6 0 0 0-2.4-4" />
    </>
  ),
  automatisation: (
    <>
      <circle cx="12" cy="12" r="3.1" />
      <path d="M12 3v2.3M12 18.7V21M3 12h2.3M18.7 12H21M5.6 5.6l1.6 1.6M16.8 16.8l1.6 1.6M18.4 5.6l-1.6 1.6M7.2 16.8l-1.6 1.6" />
    </>
  ),
  ia: (
    <>
      <rect x="4.5" y="8.5" width="15" height="10.5" rx="2.4" />
      <path d="M12 4.6v3.9" />
      <circle cx="12" cy="3.6" r="1.1" />
      <circle cx="9.3" cy="13.4" r=".95" />
      <circle cx="14.7" cy="13.4" r=".95" />
    </>
  ),
  reseaux: (
    <>
      <path d="M4 20h16" />
      <path d="M7 20v-5.4M12 20V5.6M17 20v-8.6" />
    </>
  ),
  acquisition: (
    <>
      <path d="M4 10.2v3.6a1 1 0 0 0 1 1h2.2l6.3 4V5.2l-6.3 4H5a1 1 0 0 0-1 1Z" />
      <path d="M17.4 9.2a4.2 4.2 0 0 1 0 5.6" />
    </>
  ),
  fidelisation: (
    <path d="M12 20.3s-7.2-4.4-7.2-9.2A3.9 3.9 0 0 1 12 8.6a3.9 3.9 0 0 1 7.2 2.5c0 4.8-7.2 9.2-7.2 9.2Z" />
  ),
} as const;

/* ------------------------------------------------- Icônes sectorielles --- */

const secteurs = {
  restaurants: (
    <>
      <path d="M7 3v6.2a2.1 2.1 0 0 0 4.2 0V3M9.1 11.3V21" />
      <path d="M16.4 3c1.9 1.9 1.9 6.1 0 8.1V21" />
    </>
  ),
  barbers: (
    <>
      <circle cx="6" cy="6.8" r="2.5" />
      <circle cx="6" cy="17.2" r="2.5" />
      <path d="M8.2 8.4 19.5 19.6M8.2 15.6 19.5 4.4" />
    </>
  ),
  beaute: (
    <>
      <path d="M12 20.4c0-5 2.4-8.1 5.1-9.1.8 3.6-.6 7.1-5.1 9.1Z" />
      <path d="M12 20.4c0-5-2.4-8.1-5.1-9.1-.8 3.6.6 7.1 5.1 9.1Z" />
      <path d="M12 20.4c-2-4.1-2-7.2 0-10.2 2 3 2 6.1 0 10.2Z" />
    </>
  ),
  automobile: (
    <>
      <path d="M4.2 16.4v-3.1l2-5.2h11.6l2 5.2v3.1" />
      <path d="M4.2 13.3h15.6" />
      <circle cx="7.8" cy="16.7" r="1.6" />
      <circle cx="16.2" cy="16.7" r="1.6" />
    </>
  ),
  commerce: (
    <>
      <path d="M6.3 8h11.4l1 12.2H5.3L6.3 8Z" />
      <path d="M9.2 8V6.2a2.8 2.8 0 0 1 5.6 0V8" />
    </>
  ),
} as const;

export type NomPrestation = keyof typeof prestations;
export type NomSecteur = keyof typeof secteurs;

const registre: Record<string, ReactNode> = { ...prestations, ...secteurs };

export function BrandIcon({
  name,
  className = "h-6 w-6",
  title,
}: {
  name: NomPrestation | NomSecteur;
  className?: string;
  title?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      role={title ? "img" : "presentation"}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      {...traits}
    >
      {registre[name]}
    </svg>
  );
}

/** Correspondance entre les six briques de services et leur icône. */
export const iconeParService: Record<string, NomPrestation> = {
  identite: "branding",
  print: "acquisition",
  web: "web",
  crm: "crm",
  automatisation: "automatisation",
  ia: "ia",
};

/** Correspondance entre les quatre verticales et leur icône sectorielle. */
export const iconeParVerticale: Record<string, NomSecteur> = {
  restaurants: "restaurants",
  barbers: "barbers",
  beaute: "beaute",
  automobile: "automobile",
};
