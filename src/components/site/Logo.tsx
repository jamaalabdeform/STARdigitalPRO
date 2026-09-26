import Image from "next/image";

/**
 * Logotype STAR DIGI PRO.
 *
 * Composition en deux parties, pour une raison précise :
 *
 * - Le SYMBOLE (S doré + étoile) vient de la charte fournie. Celle-ci n'existe
 *   qu'en planche PNG de 1536×1024 où le symbole occupe ~170 px : c'est donc un
 *   raster, affiché ici sous sa taille native pour rester net. ⚠ À remplacer par
 *   le fichier vectoriel (.svg / .ai) dès qu'il sera disponible — voir BRAND.md.
 *
 * - Le LOGOTYPE est composé typographiquement en Plus Jakarta Sans, avec « PRO »
 *   en or comme sur la charte. Étant du texte, il reste parfaitement net à
 *   toutes les tailles et se lit par les moteurs de recherche.
 */

export function LogoMark({
  size = 34,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <Image
      src="/brand/mark.png"
      alt=""
      aria-hidden="true"
      width={170}
      height={140}
      priority
      className={className}
      style={{ height: size, width: "auto" }}
    />
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
    sm: { mark: 28, text: "text-[14px]", track: "tracking-[0.12em]" },
    md: { mark: 34, text: "text-[16.5px]", track: "tracking-[0.13em]" },
    lg: { mark: 56, text: "text-[26px]", track: "tracking-[0.14em]" },
  }[size];

  const encre = tone === "clair" ? "text-blanc" : "text-noir";

  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <LogoMark size={dims.mark} className="shrink-0" />
      <span className="flex flex-col leading-none">
        <span
          className={`font-extrabold ${dims.text} ${dims.track} ${encre}`}
        >
          STAR DIGI <span className="text-or">PRO</span>
        </span>
        {baseline ? (
          <span
            className={`mt-2 text-[9px] uppercase tracking-[0.24em] ${
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
