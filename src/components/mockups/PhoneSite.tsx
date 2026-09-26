/**
 * ACTE 2 — Être cliqué.
 * Un téléphone affichant un site, adossé à une fiche d'établissement telle
 * qu'elle apparaît dans une recherche locale.
 *
 * Aucun nom d'enseigne réelle : la fiche décrit un secteur et une ville, ce qui
 * reste réaliste sans inventer de client.
 */
export function PhoneSite() {
  return (
    <div className="flex items-end gap-5">
      {/* --------------------------------------------------------- Téléphone */}
      <div className="relative w-[212px] shrink-0 rounded-[30px] border border-noir/15 bg-noir p-[7px] shadow-[0_30px_70px_-34px_rgba(14,17,22,0.6)]">
        <div className="absolute left-1/2 top-[14px] z-10 h-[5px] w-[54px] -translate-x-1/2 rounded-full bg-gris/25" />
        <div className="overflow-hidden rounded-[24px] bg-gris">
          {/* Hero du site */}
          <div className="grain relative h-[150px] bg-anthracite px-4 pb-4 pt-9">
            <div className="flex h-full flex-col justify-end">
              <p className="text-[8px] uppercase tracking-[0.26em] text-plomb-clair">
                Ouvert aujourd&apos;hui
              </p>
              <p className="mt-1.5 font-[family-name:var(--font-display)] text-[19px] font-semibold leading-[1.05] tracking-[-0.03em] text-blanc">
                Réservez
                <br />
                en 30 secondes
              </p>
              <div className="mt-2.5 w-fit rounded-full bg-or px-3 py-1.5 text-[9px] font-semibold text-noir">
                Prendre rendez-vous
              </div>
            </div>
          </div>

          {/* Contenu */}
          <div className="space-y-2.5 px-4 py-4">
            {["Prestations", "Galerie", "Horaires & accès"].map((row) => (
              <div
                key={row}
                className="flex items-center justify-between border-b border-noir/10 pb-2 last:border-b-0"
              >
                <span className="text-[10px] text-noir">{row}</span>
                <span className="text-[10px] text-plomb">›</span>
              </div>
            ))}
            <div className="flex gap-1.5 pt-1">
              <div className="h-9 flex-1 rounded bg-gris-2" />
              <div className="h-9 flex-1 rounded bg-gris-2" />
              <div className="h-9 flex-1 rounded bg-gris-2" />
            </div>
          </div>
        </div>
      </div>

      {/* --------------------------------------------- Fiche recherche locale */}
      <div className="hidden w-[244px] rounded-xl border border-noir/12 bg-blanc p-4 shadow-[0_18px_44px_-28px_rgba(14,17,22,0.4)] sm:block">
        <div className="flex items-start gap-3">
          <div className="h-10 w-10 shrink-0 rounded-lg bg-gris-2" aria-hidden="true" />
          <div className="min-w-0">
            <p className="truncate text-[12.5px] font-medium text-noir">
              Salon de coiffure · Mons
            </p>
            <div className="mt-1 flex items-center gap-1.5">
              <span className="tnum text-[11px] font-medium text-noir">4,9</span>
              <span className="flex gap-[1px]" aria-hidden="true">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg key={i} viewBox="0 0 10 10" className="h-2.5 w-2.5 fill-or">
                    <path d="M5 0l1.3 3.2L9.8 3.6 7.2 5.9l.8 3.5L5 7.6 2 9.4l.8-3.5L.2 3.6l3.5-.4z" />
                  </svg>
                ))}
              </span>
            </div>
            <p className="mt-0.5 text-[10.5px] text-plomb">Avis vérifiés</p>
          </div>
        </div>

        <div className="mt-3.5 grid grid-cols-3 gap-1.5">
          {["Itinéraire", "Appeler", "Réserver"].map((a, i) => (
            <div
              key={a}
              className={`rounded-md py-1.5 text-center text-[9.5px] ${
                i === 2
                  ? "bg-or text-noir"
                  : "border border-noir/12 text-anthracite"
              }`}
            >
              {a}
            </div>
          ))}
        </div>

        <div className="mt-3 space-y-1.5 border-t border-noir/10 pt-3">
          <Row label="Aujourd&apos;hui" value="09:00 – 18:30" />
          <Row label="Site web" value="en ligne" accent />
        </div>
      </div>
    </div>
  );
}

function Row({
  label,
  value,
  accent = false,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-[10px] text-plomb">{label}</span>
      <span
        className={`tnum text-[10px] ${accent ? "text-or-sombre" : "text-noir"}`}
      >
        {value}
      </span>
    </div>
  );
}
