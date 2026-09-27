/**
 * ACTE 5 — Intelligence.
 * Jawabot : l'assistant répond aux questions répétitives et qualifie la demande
 * avant de la transmettre.
 *
 * Le fil est volontairement banal — horaires, tarif, disponibilité — parce que
 * c'est exactement ce qui occupe un commerçant toute la journée. Montrer une
 * prouesse conversationnelle serait moins parlant que montrer ce qu'on lui
 * retire des mains.
 */
export function ChatJawabot() {
  return (
    <div className="overflow-hidden rounded-2xl border border-noir/12 bg-blanc shadow-[0_28px_70px_-40px_rgba(14,17,22,0.45)]">
      <div className="flex items-center gap-2.5 border-b border-noir/10 px-4 py-3">
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-noir">
          <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" aria-hidden="true">
            <rect x="7.3" y="3" width="1.4" height="10" rx="0.7" className="fill-blanc" />
            <rect x="7.3" y="3" width="1.4" height="10" rx="0.7" transform="rotate(60 8 8)" className="fill-blanc" />
            <rect x="7.3" y="3" width="1.4" height="10" rx="0.7" transform="rotate(120 8 8)" className="fill-blanc" />
          </svg>
        </span>
        <div className="leading-tight">
          <p className="text-[12.5px] font-medium text-noir">Jawabot</p>
          <p className="text-[10px] text-plomb">Répond 24 h/24</p>
        </div>
        <span className="ml-auto text-[10px] text-noir">En ligne</span>
      </div>

      <div className="space-y-2.5 px-4 py-4">
        <Msg from="client">Bonjour, vous prenez encore des rendez-vous samedi ?</Msg>
        <Msg from="bot">
          Bonjour ! Il reste deux créneaux samedi : 10:15 et 16:00. Souhaitez-vous
          que je vous en réserve un ?
        </Msg>
        <Msg from="client">16:00, c&apos;est possible pour une coupe et la barbe ?</Msg>
        <Msg from="bot">
          C&apos;est noté — 45 minutes. Je vous envoie la confirmation, il me faut
          juste votre prénom et votre numéro.
        </Msg>

        <div className="!mt-4 flex items-center gap-2 rounded-lg border border-noir/10 bg-gris-clair px-3 py-2.5">
          <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 shrink-0 text-noir" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 8.5l3.5 3.5L13 5" />
          </svg>
          <p className="text-[11px] leading-snug text-noir">
            Demande qualifiée et transmise au CRM
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 border-t border-noir/10 px-4 py-3">
        <div className="flex-1 rounded-full border border-noir/12 px-3.5 py-2 text-[11px] text-plomb">
          Écrire un message…
        </div>
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-noir">
          <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 text-blanc" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 8h9M8.5 4l4 4-4 4" />
          </svg>
        </span>
      </div>
    </div>
  );
}

function Msg({
  from,
  children,
}: {
  from: "client" | "bot";
  children: React.ReactNode;
}) {
  const isClient = from === "client";
  return (
    <div className={`flex ${isClient ? "justify-end" : "justify-start"}`}>
      <p
        className={`max-w-[84%] rounded-2xl px-3.5 py-2.5 text-[11.5px] leading-snug ${
          isClient
            ? "rounded-br-md bg-noir text-blanc"
            : "rounded-bl-md bg-gris-clair text-noir"
        }`}
      >
        {children}
      </p>
    </div>
  );
}
