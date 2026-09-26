/**
 * ACTE 4 — Gérer.
 * Pipeline commercial : un prospect ne se perd plus entre un carnet, une boîte
 * mail et un téléphone.
 *
 * Les cartes ne portent aucun nom d'entreprise : un secteur et une ville
 * suffisent à rendre la scène crédible sans fabriquer de faux client.
 */
export function CrmPipeline() {
  const columns = [
    {
      title: "Nouveau contact",
      tone: "plomb" as const,
      cards: [
        { label: "Restaurant · Lille", meta: "Formulaire site" },
        { label: "Institut · Namur", meta: "WhatsApp" },
      ],
    },
    {
      title: "Qualifié",
      tone: "plomb" as const,
      cards: [
        { label: "Barber shop · Mons", meta: "Appel · 12 min" },
        { label: "Garage · Roubaix", meta: "Formulaire site" },
      ],
    },
    {
      title: "Devis envoyé",
      tone: "or" as const,
      cards: [{ label: "Boutique · Tournai", meta: "Relance J+3 programmée" }],
    },
    {
      /* Le vert de la charte porte « conversion, succès, croissance » :
         c'est exactement l'étape gagnée du pipeline. */
      title: "Client",
      tone: "vert" as const,
      cards: [{ label: "Restaurant · Valenciennes", meta: "Onboarding" }],
    },
  ];

  return (
    <div className="overflow-hidden rounded-2xl border border-noir/12 bg-blanc shadow-[0_28px_70px_-40px_rgba(14,17,22,0.45)]">
      <div className="flex items-center justify-between border-b border-noir/10 px-5 py-3">
        <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-plomb">
          Pipeline commercial
        </span>
        <span className="tnum text-[11px] text-plomb">6 opportunités</span>
      </div>

      <div
        role="region"
        aria-label="Colonnes du pipeline"
        tabIndex={0}
        className="no-bar grid grid-cols-4 gap-px overflow-x-auto bg-noir/8"
      >
        {columns.map((col) => (
          <div key={col.title} className="min-w-[132px] bg-blanc p-3">
            <div className="mb-2.5 flex items-center gap-1.5">
              <span
                className={`h-1.5 w-1.5 rounded-full ${
                  col.tone === "or"
                    ? "bg-or"
                    : col.tone === "vert"
                      ? "bg-vert"
                      : "bg-plomb/50"
                }`}
              />
              <span className="text-[10.5px] font-medium text-anthracite">
                {col.title}
              </span>
            </div>

            <div className="space-y-1.5">
              {col.cards.map((card) => (
                <div
                  key={card.label}
                  className="rounded-lg border border-noir/10 bg-gris/60 px-2.5 py-2"
                >
                  <p className="text-[10.5px] font-medium leading-tight text-noir">
                    {card.label}
                  </p>
                  <p className="mt-1 text-[9.5px] leading-tight text-plomb">
                    {card.meta}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-4 border-t border-noir/10 px-5 py-2.5 text-[10.5px] text-plomb">
        <span>Source : site, WhatsApp, appel</span>
        <span className="ml-auto text-or-sombre">Relances automatiques actives</span>
      </div>
    </div>
  );
}
