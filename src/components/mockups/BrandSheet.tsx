/**
 * ACTE 1 — Être vu.
 * Planche de marque : lockup, nuancier, spécimen typographique, déclinaisons.
 *
 * Entièrement construite en balisage et CSS, sans image importée : c'est le
 * composant lui-même qui sert de démonstration. Les libellés restent neutres
 * (« Votre marque ») pour ne jamais laisser croire à un client réel.
 */
export function BrandSheet() {
  const palette = [
    { hex: "#0E1116", name: "Encre" },
    { hex: "#3366FF", name: "Signal" },
    { hex: "#FF8B4A", name: "Braise" },
    { hex: "#F6F4EF", name: "Papier" },
  ];

  return (
    <div className="overflow-hidden rounded-2xl border border-noir/12 bg-blanc shadow-[0_28px_70px_-40px_rgba(14,17,22,0.45)]">
      <div className="flex items-center justify-between border-b border-noir/10 px-5 py-3">
        <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-plomb">
          Planche de marque
        </span>
        <span className="text-[11px] text-plomb">01 / 04</span>
      </div>

      {/* Lockup sur fond encre */}
      <div className="grain relative flex h-40 items-center justify-center bg-noir">
        <div className="flex flex-col items-center gap-2.5">
          <svg viewBox="0 0 40 40" className="h-9 w-9" aria-hidden="true">
            <circle cx="20" cy="20" r="18.5" fill="none" stroke="#F6F4EF" strokeWidth="1.2" />
            <path d="M20 9v22M11 14.5l18 11M29 14.5l-18 11" stroke="#F6F4EF" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
          <span className="font-[family-name:var(--font-display)] text-[17px] font-semibold tracking-[0.28em] text-blanc">
            VOTRE MARQUE
          </span>
          <span className="text-[9px] uppercase tracking-[0.42em] text-plomb">
            Depuis 2026
          </span>
        </div>
      </div>

      {/* Nuancier */}
      <div className="grid grid-cols-4">
        {palette.map((c) => (
          <div key={c.hex} className="border-r border-noir/8 last:border-r-0">
            <div className="h-12" style={{ backgroundColor: c.hex }} />
            <div className="px-3 py-2.5">
              <p className="text-[11.5px] font-medium text-noir">{c.name}</p>
              <p className="tnum text-[10.5px] text-plomb">{c.hex}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Spécimen + déclinaisons */}
      <div className="grid grid-cols-[auto_1fr] items-center gap-5 border-t border-noir/10 px-5 py-4">
        <div className="flex items-baseline gap-2">
          <span className="font-[family-name:var(--font-display)] text-[40px] font-semibold leading-none tracking-[-0.04em] text-noir">
            Aa
          </span>
          <div className="leading-tight">
            <p className="text-[11.5px] font-medium text-noir">Space Grotesk</p>
            <p className="text-[10.5px] text-plomb">Display · 600</p>
          </div>
        </div>

        <div className="flex justify-end gap-2" aria-hidden="true">
          {/* Déclinaisons : carte de visite, menu, story. */}
          <div className="h-11 w-16 rounded border border-noir/15 bg-gris-2" />
          <div className="h-11 w-8 rounded border border-noir/15 bg-gris-2" />
          <div className="h-11 w-6 rounded border border-noir/15 bg-or-voile" />
        </div>
      </div>
    </div>
  );
}
