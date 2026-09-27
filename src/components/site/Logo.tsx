/**
 * Logotype STAR DIGI PRO.
 *
 * Symbole : deux obliques — le passage de la première vue à la première vente,
 * l'impulsion, la progression. Dessinable à main levée, lisible à 16 px, sans
 * aucun effet. Vectoriel, il hérite de la couleur du texte (`currentColor`) :
 * une seule source pour le noir, le blanc et l'inversé.
 *
 * Wordmark : « STAR DIGI » en demi-gras, « PRO » en regular — la hiérarchie
 * par la graisse, pas par la couleur.
 */

export function LogoMark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 32"
      aria-hidden="true"
      role="presentation"
      className={className}
    >
      <path d="M3 24 12 8h11l-9 16H3Z" fill="currentColor" />
      <path d="M18 24 27 8h15l-9 16H18Z" fill="currentColor" />
    </svg>
  );
}

export function Logo({
  tone = "clair",
  size = "md",
  baseline = false,
  className = "",
}: {
  /** `clair` : posé sur fond sombre (cas courant). `sombre` : sur fond clair. */
  tone?: "clair" | "sombre";
  size?: "sm" | "md" | "lg";
  baseline?: boolean;
  className?: string;
}) {
  const dims = {
    sm: { mark: "h-4 w-6", text: "text-[13px]" },
    md: { mark: "h-5 w-[30px]", text: "text-[14.5px]" },
    lg: { mark: "h-7 w-[42px]", text: "text-[20px]" },
  }[size];

  const encre = tone === "clair" ? "text-blanc" : "text-noir";

  return (
    <span className={`inline-flex items-center gap-2.5 ${encre} ${className}`}>
      <LogoMark className={`${dims.mark} shrink-0`} />
      <span className="flex flex-col leading-none">
        <span className={`font-semibold tracking-[-0.01em] ${dims.text}`}>
          STAR DIGI <span className="font-normal">PRO</span>
        </span>
        {baseline ? (
          <span
            className={`mt-2.5 text-[9px] uppercase tracking-[0.24em] ${
              tone === "clair" ? "text-plomb-clair" : "text-plomb"
            }`}
          >
            De la première vue à la première vente.
          </span>
        ) : null}
      </span>
    </span>
  );
}
