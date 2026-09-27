import { site } from "@/lib/site";

/**
 * Bouton WhatsApp flottant, en bas à droite de toutes les pages.
 *
 * Lien `wa.me` avec un message pré-rempli : aucun script tiers, rien ne se
 * charge tant que le visiteur ne clique pas. Monochrome comme le reste de la
 * marque ; seul le glyphe porte le vert WhatsApp — couleur fonctionnelle, qui
 * rend le canal reconnaissable au premier coup d'œil.
 */

const MESSAGE = "Bonjour STAR DIGI PRO, je souhaite parler de mon projet.";

export function WhatsAppButton() {
  const numero = site.contact.whatsapp;
  if (!numero) return null;

  const href = `https://wa.me/${numero.replace(/\D/g, "")}?text=${encodeURIComponent(MESSAGE)}`;

  return (
    /* Dans un repère <aside> : tout contenu doit appartenir à une région. */
    <aside aria-label="Contact rapide">
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Nous écrire sur WhatsApp (nouvelle fenêtre)"
        className="group fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center gap-3 rounded-full border border-blanc/15 bg-noir/90 text-blanc sm:w-auto sm:px-5 shadow-[0_18px_40px_-18px_rgba(0,0,0,0.7)] backdrop-blur-md transition-[border-color,background-color] duration-500 ease-[var(--ease-soft)] hover:border-blanc/40 hover:bg-noir sm:bottom-6 sm:right-6"
      >
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          className="h-6 w-6 shrink-0 fill-[#25D366]"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
        </svg>
        {/* Libellé masqué sur mobile : l'icône seule ne gêne pas la navigation
          des étapes du hero, centrée en bas d'écran. */}
        <span className="hidden text-[13.5px] font-medium sm:inline">
          WhatsApp
        </span>
      </a>
    </aside>
  );
}
