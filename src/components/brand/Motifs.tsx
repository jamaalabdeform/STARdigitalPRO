import type { ReactNode } from "react";

/* ============================================================================
   Motifs graphiques STAR DIGI PRO
   Reprend les « éléments graphiques » de la charte — étoile à quatre branches,
   traînées dorées, champ de particules — mais redessinés en vectoriel plutôt
   qu'extraits de la planche : ils restent nets à toute taille et pèsent
   quelques centaines d'octets.
   ============================================================================ */

/** Étoile à quatre branches du symbole de marque. Axe vertical plus long. */
export function Sparkle({
  className = "",
  title,
}: {
  className?: string;
  title?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 32"
      className={className}
      role={title ? "img" : "presentation"}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      <path
        d="M12 0 Q13.1 12.6 24 16 Q13.1 19.4 12 32 Q10.9 19.4 0 16 Q10.9 12.6 12 0 Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** Halo doré diffus, à poser derrière un bloc. Purement décoratif. */
export function HaloOr({
  className = "",
  size = 520,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <span
      aria-hidden="true"
      className={`halo-or ${className}`}
      style={{ width: size, height: size }}
    />
  );
}

/** Champ de particules dorées, en dégradé de disparition vers le bas. */
export function TrameOr({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`trame-or pointer-events-none absolute inset-0 ${className}`}
      style={{
        maskImage: "linear-gradient(to bottom, #000, transparent 72%)",
        WebkitMaskImage: "linear-gradient(to bottom, #000, transparent 72%)",
      }}
    />
  );
}

/** Filet doré qui s'éteint sur les bords — séparateur de section. */
export function FiletOr({ className = "" }: { className?: string }) {
  return <div aria-hidden="true" className={`filet-or ${className}`} />;
}

/**
 * Traînée lumineuse dorée, en SVG.
 * Deux courbes de largeur variable qui se croisent, avec un flou léger : c'est
 * la transposition vectorielle des « backgrounds » dorés de la charte.
 */
export function TraineeOr({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 600 300"
      aria-hidden="true"
      className={`pointer-events-none ${className}`}
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id="sdp-trainee" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#D4AF37" stopOpacity="0" />
          <stop offset="45%" stopColor="#E8C868" stopOpacity="0.85" />
          <stop offset="70%" stopColor="#D4AF37" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#D4AF37" stopOpacity="0" />
        </linearGradient>
        <filter id="sdp-flou" x="-20%" y="-60%" width="140%" height="220%">
          <feGaussianBlur stdDeviation="7" />
        </filter>
      </defs>
      <g filter="url(#sdp-flou)" fill="none" stroke="url(#sdp-trainee)">
        <path d="M-20 210 C 150 200, 240 90, 620 60" strokeWidth="3" />
        <path d="M-20 240 C 180 235, 300 130, 620 110" strokeWidth="1.4" opacity=".7" />
        <path d="M-20 175 C 120 170, 260 60, 620 20" strokeWidth="1" opacity=".5" />
      </g>
    </svg>
  );
}

/** Pastille ronde cerclée d'or, telle qu'utilisée sur les visuels sectoriels. */
export function PastilleOr({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-or/55 text-or ${className}`}
    >
      {children}
    </span>
  );
}
