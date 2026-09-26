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
      className={`mx-auto w-full max-w-[1400px] px-[var(--gutter)] ${className}`}
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
  tone?: "clair" | "sombre" | "or";
}) {
  const tones = {
    clair: "text-plomb-clair",
    sombre: "text-plomb",
    or: "text-or",
  };
  return (
    <p
      className={`mb-5 text-[11px] font-semibold uppercase tracking-[0.22em] ${tones[tone]}`}
    >
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
      className={`${align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"} ${className}`}
    >
      {eyebrow ? (
        <Eyebrow tone={clair ? "clair" : "sombre"}>{eyebrow}</Eyebrow>
      ) : null}
      <h2
        className={`h-section text-[clamp(1.9rem,4.2vw,3.25rem)] ${
          clair ? "text-blanc" : "text-noir"
        }`}
      >
        {title}
      </h2>
      {lead ? (
        <p
          className={`mt-5 text-[clamp(1rem,1.25vw,1.13rem)] leading-relaxed ${
            clair ? "text-plomb-clair" : "text-anthracite/80"
          }`}
        >
          {lead}
        </p>
      ) : null}
    </div>
  );
}

/* ----------------------------------------------------------------- Button -- */

type ButtonVariant = "primary" | "outline" | "outlineDark" | "ghost";

const buttonBase =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-[0.01em] transition-[background-color,color,border-color,transform] duration-300 ease-[var(--ease-soft)] active:translate-y-px whitespace-nowrap";

const buttonSizes = {
  md: "px-5 py-3 text-[14px]",
  lg: "px-7 py-4 text-[15px]",
};

const buttonVariants: Record<ButtonVariant, string> = {
  /* L'or porte du texte noir — règle de la charte, visible sur l'icône
     applicative. Du blanc sur or serait illisible. */
  primary: "bg-or text-noir hover:bg-or-clair",
  /** Contour, sur fond sombre. */
  outline:
    "border border-blanc/25 text-blanc hover:border-or hover:bg-or hover:text-noir",
  /** Contour, sur fond clair. */
  outlineDark:
    "border border-noir/25 text-noir hover:border-or hover:bg-or hover:text-noir",
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
  tone?: "clair" | "sombre" | "or";
}) {
  const tones = {
    clair: "border-blanc/20 text-plomb-clair",
    sombre: "border-noir/15 text-anthracite",
    or: "border-or/40 text-or",
  };
  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-[12px] tracking-[0.02em] ${tones[tone]}`}
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
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 8h10M9 4l4 4-4 4" />
    </svg>
  );
}
