"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Logo } from "./Logo";
import { Button, ArrowIcon } from "@/components/ui/primitives";
import { nav, verticals } from "@/lib/site";

export function Header() {
  const pathname = usePathname();
  const [stuck, setStuck] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const solutionsRef = useRef<HTMLDivElement>(null);

  /* Fond opaque seulement après avoir quitté le haut de page. */
  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Toute navigation referme ce qui est ouvert.
     Ajustement pendant le rendu plutôt que dans un effet : React applique le
     changement avant la peinture, sans le rendu supplémentaire qu'entraînerait
     un setState différé. */
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setMenuOpen(false);
    setSolutionsOpen(false);
  }

  /* Échap ferme, et le menu mobile bloque le défilement du fond. */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setMenuOpen(false);
      setSolutionsOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  /* Clic hors du panneau Solutions. */
  useEffect(() => {
    if (!solutionsOpen) return;
    const onDown = (e: MouseEvent) => {
      if (!solutionsRef.current?.contains(e.target as Node)) {
        setSolutionsOpen(false);
      }
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [solutionsOpen]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500 ${
        stuck || menuOpen
          ? "border-b border-blanc/10 bg-noir/85 backdrop-blur-xl backdrop-saturate-150"
          : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-6 px-[var(--gutter)] py-4">
        <Link href="/" aria-label="STAR DIGI PRO — accueil" className="shrink-0">
          <Logo />
        </Link>

        {/* ------------------------------------------------ Navigation large */}
        <nav
          aria-label="Navigation principale"
          className="hidden items-center gap-1 lg:flex"
        >
          <NavLink href="/services" active={isActive("/services")}>
            Services
          </NavLink>

          <div ref={solutionsRef} className="relative">
            <button
              type="button"
              aria-expanded={solutionsOpen}
              aria-haspopup="true"
              onClick={() => setSolutionsOpen((v) => !v)}
              className={`flex items-center gap-1.5 rounded-full px-3.5 py-2 text-[14px] transition-colors duration-300 ${
                isActive("/solutions")
                  ? "text-blanc"
                  : "text-plomb-clair hover:text-blanc"
              }`}
            >
              Solutions
              <svg
                viewBox="0 0 12 12"
                aria-hidden="true"
                className={`h-3 w-3 transition-transform duration-300 ${solutionsOpen ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              >
                <path d="M3 4.5 6 7.5 9 4.5" />
              </svg>
            </button>

            {solutionsOpen ? (
              <div className="absolute left-0 top-full z-10 mt-2 w-[330px] overflow-hidden rounded-2xl border border-blanc/12 bg-anthracite shadow-[0_24px_60px_-24px_rgba(0,0,0,0.6)]">
                {verticals.map((v) => (
                  <Link
                    key={v.slug}
                    href={`/solutions/${v.slug}`}
                    className="group flex flex-col gap-1 border-b border-blanc/8 px-5 py-4 last:border-b-0 hover:bg-blanc/5"
                  >
                    <span className="flex items-center gap-2 text-[14px] font-medium text-blanc">
                      {v.navLabel}
                      <ArrowIcon className="opacity-0 transition-opacity duration-300 group-hover:opacity-60" />
                    </span>
                    <span className="text-[12.5px] leading-snug text-plomb-clair">
                      {v.teaser}
                    </span>
                  </Link>
                ))}
              </div>
            ) : null}
          </div>

          {nav
            .filter((item) => item.href !== "/services")
            .map((item) => (
              <NavLink
                key={item.href}
                href={item.href}
                active={isActive(item.href)}
              >
                {item.label}
              </NavLink>
            ))}
        </nav>

        <div className="flex items-center gap-2">
          {/* Enveloppe plutôt que `hidden` sur le bouton : `Button` pose déjà
              `inline-flex`, et à specificité égale c'est l'ordre dans la feuille
              qui tranche — le masquage ne serait pas garanti. */}
          <span className="hidden sm:contents">
            <Button href="/contact">Demander un audit</Button>
          </span>

          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-controls="menu-mobile"
            aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-blanc/20 text-blanc lg:hidden"
          >
            <svg viewBox="0 0 20 20" aria-hidden="true" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round">
              {menuOpen ? (
                <path d="M5 5l10 10M15 5L5 15" />
              ) : (
                <path d="M3 6h14M3 13h14" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* ----------------------------------------------- Navigation mobile */}
      {menuOpen ? (
        <div
          id="menu-mobile"
          className="h-[calc(100dvh-72px)] overflow-y-auto border-t border-blanc/10 bg-noir px-[var(--gutter)] pb-10 pt-6 lg:hidden"
        >
          <nav aria-label="Navigation mobile" className="flex flex-col">
            <MobileLink href="/services">Services</MobileLink>

            <p className="mb-2 mt-7 text-[11px] font-medium uppercase tracking-[0.22em] text-plomb-clair">
              Solutions par métier
            </p>
            {verticals.map((v) => (
              <MobileLink key={v.slug} href={`/solutions/${v.slug}`} small>
                {v.navLabel}
              </MobileLink>
            ))}

            <div className="mt-7 flex flex-col">
              {nav
                .filter((item) => item.href !== "/services")
                .map((item) => (
                  <MobileLink key={item.href} href={item.href}>
                    {item.label}
                  </MobileLink>
                ))}
            </div>

            <Button href="/contact" size="lg" className="mt-8 w-full">
              Demander un audit
            </Button>
          </nav>
        </div>
      ) : null}
    </header>
  );
}

function NavLink({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={`rounded-full px-3.5 py-2 text-[14px] transition-colors duration-300 ${
        active ? "text-blanc" : "text-plomb-clair hover:text-blanc"
      }`}
    >
      {children}
    </Link>
  );
}

function MobileLink({
  href,
  children,
  small = false,
}: {
  href: string;
  children: React.ReactNode;
  small?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`border-b border-blanc/10 py-3.5 text-blanc ${
        small
          ? "text-[16px] text-plomb-clair"
          : "h-section text-[22px]"
      }`}
    >
      {children}
    </Link>
  );
}
