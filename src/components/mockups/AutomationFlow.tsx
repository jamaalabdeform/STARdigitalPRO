/**
 * ACTE 5 — Vendre et fidéliser.
 * Scénario d'automatisation : un déclencheur, une condition, des actions.
 *
 * Le tracé est dessiné en SVG plutôt qu'en bordures CSS : les jonctions restent
 * nettes à toutes les densités d'écran et le diagramme se replie proprement en
 * colonne sur mobile.
 */
export function AutomationFlow() {
  return (
    <div className="overflow-hidden rounded-2xl border border-noir/12 bg-blanc shadow-[0_28px_70px_-40px_rgba(14,17,22,0.45)]">
      <div className="flex items-center justify-between border-b border-noir/10 px-5 py-3">
        <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-plomb">
          Scénario automatisé
        </span>
        <span className="flex items-center gap-1.5 text-[11px] text-or-sombre">
          <span className="h-1.5 w-1.5 rounded-full bg-or" />
          Actif
        </span>
      </div>

      <div className="p-5">
        <div className="flex flex-col gap-0 sm:flex-row sm:items-stretch">
          <Node
            kind="trigger"
            title="Rendez-vous terminé"
            meta="Déclencheur"
          />
          <Connector />
          <Node kind="wait" title="Attendre 48 h" meta="Temporisation" />
          <Connector />
          <div className="flex flex-1 flex-col gap-2">
            <Node kind="action" title="Demande d'avis" meta="SMS ou WhatsApp" compact />
            <Node kind="action" title="Offre fidélité" meta="E-mail · J+60" compact />
          </div>
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-noir/10 pt-4 text-[11px] text-plomb">
          <span>Aucune saisie manuelle</span>
          <span>Arrêt automatique si réponse</span>
          <span className="text-noir">Journal consultable</span>
        </div>
      </div>
    </div>
  );
}

function Node({
  kind,
  title,
  meta,
  compact = false,
}: {
  kind: "trigger" | "wait" | "action";
  title: string;
  meta: string;
  compact?: boolean;
}) {
  const accent = {
    trigger: "border-l-or",
    wait: "border-l-plomb/50",
    action: "border-l-or",
  }[kind];

  return (
    /* Les nœuds simples s'étirent sur la hauteur de la colonne d'actions, qui en
       empile deux : sans centrage vertical, leur texte reste collé en haut et
       laisse une grande zone vide. */
    <div
      className={`flex flex-1 flex-col justify-center rounded-lg border border-noir/10 border-l-[3px] bg-gris/60 px-3.5 ${
        compact ? "py-2.5" : "py-3.5"
      } ${accent}`}
    >
      <p className="text-[9.5px] uppercase tracking-[0.16em] text-plomb">
        {meta}
      </p>
      <p className="mt-1 text-[12.5px] font-medium leading-tight text-noir">
        {title}
      </p>
    </div>
  );
}

/** Trait de liaison : horizontal en large, vertical en étroit. */
function Connector() {
  return (
    <div
      aria-hidden="true"
      className="flex shrink-0 items-center justify-center self-stretch py-1.5 sm:px-2 sm:py-0"
    >
      <svg
        viewBox="0 0 24 24"
        className="h-5 w-5 rotate-90 text-noir/25 sm:rotate-0"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3 12h16M14 7l5 5-5 5" />
      </svg>
    </div>
  );
}
