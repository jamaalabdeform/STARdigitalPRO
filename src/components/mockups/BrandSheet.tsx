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
    { hex: "#050505", name: "Noir" },
    { hex: "#1B1B1B", name: "Graphite" },
    { hex: "#B7B7B7", name: "Gris" },
    { hex: "#F4F3EF", name: "Cassé" },
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
      <div className="relative flex h-40 items-center justify-center bg-noir">
        <div className="flex flex-col items-center gap-2.5">
          <svg viewBox="0 0 40 40" className="h-9 w-9" aria-hidden="true">
            <rect x="1" y="1" width="38" height="38" fill="none" stroke="#F4F3EF" strokeWidth="1" />
            <path d="M12 28 20 12M20 28 28 12" stroke="#F4F3EF" strokeWidth="1.2" />
          </svg>
          <span className="font-[family-name:var(--font-display)] text-[17px] font-semibold tracking-[0.28em] text-blanc">
            VOTRE MARQUE
          </span>
          <span className="text-[9px] uppercase tracking-[0.42em] text-plomb-clair">
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
            <p className="text-[11.5px] font-medium text-noir">Inter</p>
            <p className="text-[10.5px] text-plomb">Display · 650</p>
          </div>
        </div>

        <div className="flex justify-end gap-2" aria-hidden="true">
          {/* Déclinaisons : carte de visite, menu, story. */}
          <div className="h-11 w-16 rounded border border-noir/15 bg-gris-clair" />
          <div className="h-11 w-8 rounded border border-noir/15 bg-gris-clair" />
          <div className="h-11 w-6 rounded border border-noir/15 bg-gris-clair" />
        </div>
      </div>
    </div>
  );
}
