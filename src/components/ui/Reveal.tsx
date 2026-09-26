"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Apparition au défilement, déclenchée une seule fois.
 *
 * Volontairement sans librairie d'animation : un IntersectionObserver et une
 * transition CSS suffisent, pour quelques centaines d'octets au lieu de
 * plusieurs dizaines de kilo-octets de JavaScript.
 *
 * Le respect de `prefers-reduced-motion` est géré dans globals.css, qui neutralise
 * l'état initial : si le JavaScript ne s'exécute pas, le contenu reste visible.
 */
export function Reveal({
  children,
  delay = 0,
  as: Tag = "div",
  className = "",
}: {
  children: ReactNode;
  /** Décalage en secondes, pour échelonner une série d'éléments. */
  delay?: number;
  /* Liste fermée plutôt que `ElementType` : React Three Fiber ajoute ses
     éléments 3D aux types JSX globaux, ce qui rend `ElementType` inutilisable. */
  as?: "div" | "li" | "article" | "section";
  className?: string;
}) {
  // Intersection : la même ref doit convenir à chacune des balises possibles.
  const ref = useRef<HTMLDivElement & HTMLLIElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    /* L'apparition bascule un attribut du DOM plutôt qu'un état React : c'est un
       effet purement visuel, un re-rendu du composant n'y apporterait rien. */
    const show = () => el.setAttribute("data-shown", "true");

    if (typeof IntersectionObserver === "undefined") {
      show();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          show();
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.12 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={`reveal ${className}`}
      data-shown="false"
      style={delay ? ({ "--reveal-delay": `${delay}s` } as React.CSSProperties) : undefined}
    >
      {children}
    </Tag>
  );
}
