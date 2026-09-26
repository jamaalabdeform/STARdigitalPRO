/**
 * Accordéon FAQ.
 *
 * Construit sur <details>/<summary> natifs : l'ouverture, le clavier et la
 * sémantique sont assurés par le navigateur, sans une ligne de JavaScript.
 * Un moteur de recherche lit donc l'intégralité des réponses, y compris celles
 * qui sont repliées.
 *
 * `tone` décrit la couleur du texte : `clair` sur fond sombre (cas courant sur
 * ce site), `sombre` dans les sections claires.
 */
export function Faq({
  items,
  tone = "clair",
}: {
  items: { q: string; a: string }[];
  tone?: "clair" | "sombre";
}) {
  const clair = tone === "clair";

  const filet = clair ? "border-blanc/15" : "border-noir/15";
  const question = clair ? "text-blanc" : "text-noir";
  const reponse = clair ? "text-plomb-clair" : "text-anthracite/80";
  const cercle = clair ? "border-blanc/25" : "border-noir/20";

  return (
    <div className={`border-t ${filet}`}>
      {items.map((item) => (
        <details
          key={item.q}
          className={`group border-b ${filet} [&_summary::-webkit-details-marker]:hidden`}
        >
          <summary
            className={`flex cursor-pointer list-none items-start justify-between gap-6 py-5 text-[clamp(1rem,1.6vw,1.15rem)] font-semibold ${question} transition-colors duration-300 hover:text-or`}
          >
            {item.q}
            <span
              aria-hidden="true"
              className={`mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border ${cercle} transition-transform duration-400 ease-[var(--ease-soft)] group-open:rotate-45`}
            >
              <svg
                viewBox="0 0 12 12"
                className="h-2.5 w-2.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              >
                <path d="M6 2v8M2 6h8" />
              </svg>
            </span>
          </summary>
          <p className={`max-w-[68ch] pb-6 pr-10 text-[15.5px] leading-relaxed ${reponse}`}>
            {item.a}
          </p>
        </details>
      ))}
    </div>
  );
}
