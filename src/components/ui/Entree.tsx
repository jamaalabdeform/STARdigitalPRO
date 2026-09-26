import type { CSSProperties, ReactNode } from "react";

/**
 * Apparition au chargement, pour le haut de page.
 *
 * Même rendu que `Reveal`, mais en animation CSS pure : elle démarre à la
 * première peinture au lieu d'attendre l'hydratation. Le titre du héros est le
 * plus grand élément visible (LCP) — le laisser masqué jusqu'à l'exécution du
 * JavaScript retardait son affichage de plusieurs centaines de millisecondes.
 *
 * Aucun état masqué ne dépend du script : sans JavaScript, l'animation joue
 * quand même et se termine visible.
 */
export function Entree({
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
  return (
    <Tag
      className={`entree ${className}`}
      style={delay ? ({ "--reveal-delay": `${delay}s` } as CSSProperties) : undefined}
    >
      {children}
    </Tag>
  );
}
