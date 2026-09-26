/**
 * Visuel principal du hero : la chaîne complète, d'une brique à l'autre.
 *
 * C'est l'argument du positionnement rendu visible en un coup d'œil — le site
 * n'est qu'un maillon parmi six. Une impulsion parcourt le tracé en continu
 * pour suggérer la circulation ; l'animation s'arrête si le visiteur a demandé
 * la réduction des mouvements (règle globale dans globals.css).
 */

const bricks = [
  { label: "Identité", meta: "Logo, charte, supports" },
  { label: "Site", meta: "Vitrine, catalogue, e-commerce" },
  { label: "Réservation", meta: "Rendez-vous, formulaires" },
  { label: "CRM", meta: "Demandes centralisées" },
  { label: "Automatisation", meta: "Rappels, relances, avis" },
  { label: "IA", meta: "Jawabot, qualification" },
];

export function SystemDiagram() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-noir/12 bg-blanc p-6 shadow-[0_34px_80px_-44px_rgba(14,17,22,0.5)] sm:p-7">
      <div className="mb-6 flex items-baseline justify-between">
        <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-plomb">
          Le parcours complet
        </p>
        <p className="text-[11px] text-plomb">6 briques</p>
      </div>

      <ol className="relative flex flex-col gap-0">
        {/* Rail vertical + impulsion */}
        <span
          aria-hidden="true"
          className="absolute left-[7px] top-2 bottom-2 w-px bg-noir/12"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute left-[5.5px] top-0 h-14 w-[4px] rounded-full bg-gradient-to-b from-transparent via-or to-transparent motion-safe:animate-[descend_4.5s_linear_infinite]"
        />

        {bricks.map((b, i) => (
          <li key={b.label} className="relative flex items-start gap-4 py-3">
            <span
              aria-hidden="true"
              className={`relative z-10 mt-1.5 h-[15px] w-[15px] shrink-0 rounded-full border-2 bg-blanc ${
                i === bricks.length - 1
                  ? "border-or"
                  : i === 0
                    ? "border-noir"
                    : "border-or"
              }`}
            />
            <div className="min-w-0">
              <p className="text-[14.5px] font-medium leading-tight text-noir">
                {b.label}
              </p>
              <p className="mt-0.5 text-[12.5px] leading-tight text-plomb">
                {b.meta}
              </p>
            </div>
            <span className="tnum ml-auto pt-1 text-[11px] text-plomb/70">
              {String(i + 1).padStart(2, "0")}
            </span>
          </li>
        ))}
      </ol>

      <p className="mt-6 border-t border-noir/10 pt-4 text-[12.5px] leading-relaxed text-anthracite/70">
        Vous n&apos;avez pas besoin des six. Vous avez besoin de celles qui
        manquent — et qu&apos;elles fonctionnent ensemble.
      </p>

      <style>{`
        @keyframes descend {
          0%   { transform: translateY(0); opacity: 0; }
          8%   { opacity: 1; }
          92%  { opacity: 1; }
          100% { transform: translateY(calc(100% + 300px)); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
