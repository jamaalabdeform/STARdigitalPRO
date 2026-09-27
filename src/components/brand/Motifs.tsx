import type { ReactNode } from "react";

/* ============================================================================
   Motifs graphiques STAR DIGI PRO — charte noir / blanc.
   Un seul élément décoratif : l'oblique, tirée du symbole. Le reste est porté
   par la typographie, les filets et l'espace.
   ============================================================================ */

/** Oblique du symbole, en séparateur ou en repère. Hérite de la couleur. */
export function Oblique({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 8 12"
      aria-hidden="true"
      className={className}
      role="presentation"
    >
      <path d="M0 12 5 0h3L3 12H0Z" fill="currentColor" />
    </svg>
  );
}

/** Filet d'un pixel — séparateur de section. */
export function Filet({ className = "" }: { className?: string }) {
  return <div aria-hidden="true" className={`filet ${className}`} />;
}

/** Cadre carré au trait fin, pour porter une icône. */
export function Pastille({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex h-11 w-11 shrink-0 items-center justify-center border border-current/25 ${className}`}
    >
      {children}
    </span>
  );
}
