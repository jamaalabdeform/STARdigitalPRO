/**
 * ACTE 3 — Convertir.
 * Module de réservation : prestation, créneaux, confirmation, relais WhatsApp.
 *
 * Composant de démonstration : les créneaux sont statiques et aucun état n'est
 * réellement modifiable. Il illustre le parcours, il ne le simule pas.
 */
export function BookingWidget() {
  const slots = [
    { time: "09:30", free: true },
    { time: "10:15", free: false },
    { time: "11:00", free: true },
    { time: "13:45", free: true },
    { time: "14:30", free: false },
    { time: "15:15", free: true },
  ];

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
      <div className="w-full overflow-hidden rounded-2xl border border-noir/12 bg-blanc shadow-[0_28px_70px_-40px_rgba(14,17,22,0.45)] sm:max-w-[290px]">
        <div className="border-b border-noir/10 px-4 py-3">
          <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-plomb">
            Réservation
          </p>
          <p className="mt-1.5 text-[14px] font-medium text-noir">
            Coupe &amp; barbe · 45 min
          </p>
        </div>

        {/* Bande de dates */}
        <div className="flex gap-1.5 border-b border-noir/10 px-4 py-3">
          {[
            { d: "Mar", n: "24" },
            { d: "Mer", n: "25" },
            { d: "Jeu", n: "26" },
            { d: "Ven", n: "27" },
          ].map((day, i) => (
            <div
              key={day.n}
              className={`flex flex-1 flex-col items-center rounded-lg py-2 ${
                i === 2
                  ? "bg-noir text-blanc"
                  : "border border-noir/10 text-graphite"
              }`}
            >
              <span className="text-[9.5px] uppercase tracking-[0.12em] opacity-70">
                {day.d}
              </span>
              <span className="tnum text-[14px] font-medium">{day.n}</span>
            </div>
          ))}
        </div>

        {/* Créneaux */}
        <div className="grid grid-cols-3 gap-1.5 px-4 py-3.5">
          {slots.map((s, i) => (
            <div
              key={s.time}
              className={`tnum rounded-md py-2 text-center text-[11.5px] ${
                !s.free
                  ? "border border-noir/8 text-plomb line-through"
                  : i === 3
                    ? "bg-info text-blanc"
                    : "border border-noir/15 text-noir"
              }`}
            >
              {s.time}
            </div>
          ))}
        </div>

        <div className="border-t border-noir/10 px-4 py-3">
          <div className="rounded-lg bg-info py-2.5 text-center text-[12.5px] font-semibold text-blanc">
            Confirmer 13:45
          </div>
          <p className="mt-2 text-center text-[10.5px] text-plomb">
            Confirmation immédiate · Rappel automatique la veille
          </p>
        </div>
      </div>

      {/* Fil de confirmation */}
      <div className="w-full rounded-2xl border border-noir/12 bg-gris-clair p-3.5 sm:max-w-[240px]">
        <p className="mb-3 text-[10.5px] font-medium uppercase tracking-[0.2em] text-plomb">
          Rappel automatique
        </p>
        <div className="space-y-2">
          <Bubble side="in">
            Bonjour, votre rendez-vous est confirmé jeudi 26 à 13:45.
          </Bubble>
          <Bubble side="in" plomb>
            Rappel envoyé la veille à 18:00.
          </Bubble>
          <Bubble side="out">Parfait, merci !</Bubble>
        </div>
      </div>
    </div>
  );
}

function Bubble({
  children,
  side,
  plomb = false,
}: {
  children: React.ReactNode;
  side: "in" | "out";
  plomb?: boolean;
}) {
  const isOut = side === "out";
  return (
    <div className={`flex ${isOut ? "justify-end" : "justify-start"}`}>
      <p
        className={`max-w-[88%] rounded-xl px-3 py-2 text-[11px] leading-snug ${
          isOut
            ? "rounded-br-sm bg-noir text-blanc"
            : plomb
              ? "rounded-bl-sm border border-noir/10 bg-blanc/60 text-plomb"
              : "rounded-bl-sm bg-blanc text-noir"
        }`}
      >
        {children}
      </p>
    </div>
  );
}
