import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

/* -------------------------------------------------------------- Container -- */

export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`mx-auto w-full max-w-[1440px] px-[var(--gutter)] ${className}`}
    >
      {children}
    </div>
  );
}

/* ---------------------------------------------------------------- Eyebrow -- */
/* `tone` décrit la couleur du TEXTE, pas celle du fond.
   Le site étant à dominante sombre, `clair` est la valeur par défaut. */

export function Eyebrow({
  children,
  tone = "clair",
}: {
  children: ReactNode;
  tone?: "clair" | "sombre" | "accent";
}) {
  const tones = {
    clair: "text-plomb-clair",
    sombre: "text-plomb",
    accent: "text-blanc",
  };
  return (
    <p className={`label mb-6 ${tones[tone]}`}>
      {children}
    </p>
  );
}

/* ------------------------------------------------------------ SectionHead -- */

export function SectionHead({
  eyebrow,
  title,
  lead,
  tone = "clair",
  align = "left",
  className = "",
}: {
  eyebrow?: ReactNode;
  title: ReactNode;
  lead?: ReactNode;
  /** Couleur du texte : `clair` sur fond sombre, `sombre` sur fond clair. */
  tone?: "clair" | "sombre";
  align?: "left" | "center";
  className?: string;
}) {
  const clair = tone === "clair";
  return (
    <div
      className={`${align === "center" ? "mx-auto max-w-4xl text-center" : "max-w-4xl"} ${className}`}
    >
      {eyebrow ? (
        <Eyebrow tone={clair ? "clair" : "sombre"}>{eyebrow}</Eyebrow>
      ) : null}
      <h2
        className={`h-section text-[clamp(2.2rem,5vw,4.5rem)] ${
          clair ? "text-blanc" : "text-noir"
        }`}
      >
        {title}
      </h2>
      {lead ? (
        <p
          className={`mt-7 max-w-[62ch] text-[clamp(1rem,1.2vw,1.12rem)] leading-relaxed ${
            clair ? "text-plomb-clair" : "text-plomb"
          }`}
        >
          {lead}
        </p>
      ) : null}
    </div>
  );
}

/* ----------------------------------------------------------------- Button -- */

type ButtonVariant =
  | "primary"
  | "outline"
  | "outlineDark"
  | "dark"
  | "accent"
  | "ghost";

/* Rectangles nets, sans arrondi : la sobriété d'un objet imprimé. Survol :
   inversion de couleur et léger déplacement de la flèche, rien de plus. */
const buttonBase =
  "group/btn inline-flex items-center justify-center gap-3 font-medium tracking-[-0.005em] transition-[background-color,color,border-color] duration-500 ease-[var(--ease-soft)] whitespace-nowrap [&_svg]:transition-transform [&_svg]:duration-500 hover:[&_svg]:translate-x-1";

const buttonSizes = {
  md: "px-5 py-3 text-[14px]",
  lg: "px-7 py-[1.05rem] text-[15px]",
};

const buttonVariants: Record<ButtonVariant, string> = {
  /** Plein blanc, sur fond sombre. */
  primary:
    "border border-blanc bg-blanc text-noir hover:bg-transparent hover:text-blanc",
  /** Contour, sur fond sombre. */
  outline:
    "border border-blanc/30 text-blanc hover:border-blanc hover:bg-blanc hover:text-noir",
  /** Contour, sur fond clair. */
  outlineDark:
    "border border-noir/30 text-noir hover:border-noir hover:bg-noir hover:text-blanc",
  /** Plein noir, sur fond clair. */
  dark: "border border-noir bg-noir text-blanc hover:bg-transparent hover:text-noir",
  /** Aplat à l'accent de l'univers (`data-univers`), sur fond sombre.
      Réservé aux pages métier : l'exception, pas la règle. */
  accent:
    "border border-accent bg-accent text-accent-encre hover:border-accent-texte hover:bg-transparent hover:text-accent-texte",
  ghost: "text-blanc hover:bg-blanc/10",
};

type ButtonProps = {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: keyof typeof buttonSizes;
  className?: string;
} & (
  | ({ href: string } & Omit<ComponentProps<typeof Link>, "href" | "children">)
  | ({ href?: undefined } & Omit<ComponentProps<"button">, "children">)
);

export function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  ...rest
}: ButtonProps) {
  const cls = `${buttonBase} ${buttonSizes[size]} ${buttonVariants[variant]} ${className}`;

  if (typeof rest.href === "string") {
    const { href, ...linkProps } = rest as { href: string };
    return (
      <Link href={href} className={cls} {...linkProps}>
        {children}
      </Link>
    );
  }

  return (
    <button className={cls} {...(rest as ComponentProps<"button">)}>
      {children}
    </button>
  );
}

/* ------------------------------------------------------------------- Pill -- */

export function Pill({
  children,
  tone = "clair",
}: {
  children: ReactNode;
  tone?: "clair" | "sombre" | "accent";
}) {
  const tones = {
    clair: "border-blanc/20 text-plomb-clair",
    sombre: "border-noir/20 text-graphite",
    accent: "border-blanc/50 text-blanc",
  };
  return (
    <span
      className={`inline-flex items-center border px-2.5 py-1 text-[11.5px] tracking-[0.02em] ${tones[tone]}`}
    >
      {children}
    </span>
  );
}

/* --------------------------------------------------------------- ArrowIcon -- */

export function ArrowIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      aria-hidden="true"
      className={`h-[14px] w-[14px] ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 8h10M9 4l4 4-4 4" />
    </svg>
  );
}
