# STAR DIGI PRO — stardigipro.com

Site commercial de STAR DIGI PRO, partenaire digital 360° pour les TPE, PME et
commerces en France et en Belgique.

Construit avec **Next.js 16** (App Router, Turbopack), **TypeScript** et
**Tailwind CSS v4**. Seule dépendance d'affichage : **three.js** via
**React Three Fiber**, pour la galerie 3D du hero d'accueil. Aucune librairie
d'animation, aucun kit de composants : tout le reste est écrit dans ce dépôt.

---

## Démarrer

```bash
npm install
npm run dev        # http://localhost:3000
```

```bash
npm run build      # build de production
npm start          # sert le build
npx eslint src     # vérification du code
```

Node 20.9+ requis (Next.js 16).

---

## ⚠ À compléter avant mise en ligne

Trois points volontairement laissés vides. Rien n'a été inventé à leur place :
des coordonnées ou des tarifs fictifs sur un site commercial se retournent
toujours contre leur auteur.

### 1. Coordonnées — `src/lib/site.ts`

Le pack projet ne fournissait ni téléphone, ni e-mail, ni adresse. Les champs
valent `null` et l'interface les masque proprement tant qu'ils le sont.

```ts
contact: {
  email: null,       // "contact@stardigipro.com"
  phone: null,       // "+33 X XX XX XX XX"
  phoneHref: null,   // "tel:+33XXXXXXXXX"
  whatsapp: null,
  address: null,
},
social: { linkedin: null, instagram: null },
```

Une fois renseignés, ils apparaissent automatiquement dans le pied de page, la
page contact et les données structurées.

### 2. Destination du formulaire — `.env.local`

```bash
cp .env.example .env.local
```

```bash
CONTACT_WEBHOOK_URL=https://...   # Formspree, Make, n8n, route API, CRM…
```

Tant que cette variable est absente, le formulaire valide la saisie puis
**annonce explicitement** qu'il n'est relié à aucune destination. Il n'affiche
jamais « message envoyé » dans le vide : une demande perdue en silence est le
pire défaut possible sur une page de contact.

L'action serveur est dans `src/app/actions.ts` — elle envoie un POST JSON et se
branche sur n'importe quel service acceptant ce format.

### 3. Analytics

`NEXT_PUBLIC_GA_ID` et `NEXT_PUBLIC_META_PIXEL_ID` sont prévus dans
`.env.example` mais **aucun script de suivi n'est installé** : le brief
interdisait les identifiants fictifs. Ajoutez le tag voulu dans
`src/app/layout.tsx` une fois les vrais identifiants connus.

---

## Structure

```
src/
  app/
    layout.tsx              polices, métadonnées, JSON-LD Organization
    page.tsx                accueil (8 blocs)
    services/               les 6 briques détaillées
    solutions/[slug]/       4 pages métier, générées statiquement
    realisations/           démonstrations d'interfaces
    a-propos/  contact/
    actions.ts              action serveur du formulaire
    robots.ts  sitemap.ts  not-found.tsx
    globals.css             design system (tokens Tailwind v4)
  components/
    site/                   Header, Footer, Logo
    ui/                     primitives, Reveal, Entree, Faq, ContactForm
    hero/                   galerie 3D de l'accueil (HeroGalerie, GalerieScene)
    mockups/                les interfaces de démonstration
  lib/
    site.ts                 marque, navigation, coordonnées
    content.ts              tout le contenu éditorial
```

Le contenu rédactionnel est centralisé dans `src/lib/content.ts` : les textes se
modifient là, sans toucher aux composants.

---

## Design system

Tailwind v4 se configure **en CSS**, pas en `tailwind.config.js`. Les tokens
sont déclarés dans le bloc `@theme` de `src/app/globals.css` et génèrent leurs
utilitaires automatiquement.

Palette, typographie (**Plus Jakarta Sans**) et règles de contraste : voir
**`BRAND.md`**, qui fait référence.

---

## Hero d'accueil : galerie 3D

Adapté du modèle v0 « 3D Gallery Photography » (plans d'images en profondeur,
flou de mise au point, effet tissu au défilement). Le hero présente STAR DIGI
PRO, puis les six étapes — Identité, Site, Réservation, CRM, Automatisation,
IA — chacune avec un visuel, un titre et une courte description.

- **Défilement natif.** La scène WebGL est collée en fond (`sticky`) et la
  caméra avance d'une étape par écran défilé. La molette n'est pas
  interceptée : clavier, doigt et souris fonctionnent normalement, et le reste
  du site reprend après la sixième étape.
- **Contenu :** `etapesHero` dans `src/lib/content.ts`. Tout le texte est du
  HTML rendu côté serveur (indexable, lisible sans JavaScript).
- **Visuels :** `public/hero/*.webp`, captures des maquettes de
  `components/mockups/` sur fond transparent. Si une maquette change,
  recapturez-la pour que le hero reste cohérent.
- **Performance :** three.js (~850 Ko non compressés) n'est chargé qu'à la
  première interaction (défilement, souris, doigt, clavier). Le premier
  affichage n'en dépend pas ; le rendu s'arrête quand le hero sort de l'écran.
- **Repli statique** (pas de JavaScript, `prefers-reduced-motion`, ou WebGL
  indisponible) : pas de scène, les six étapes s'affichent en flux normal avec
  leur visuel en image.

---

## Les mockups

Les modules présentés (`src/components/mockups/`) sont construits en JSX et CSS
— ce ne sont ni des images, ni des captures d'écran.

`SystemDiagram`, `BrandSheet`, `PhoneSite`, `BookingWidget`, `CrmPipeline`,
`AutomationFlow`, `ChatJawabot`.

Deux règles y sont tenues :

- **Aucun client, réel ou fictif.** Les cartes du CRM portent un secteur et une
  ville (« Barber shop · Mons »), jamais un nom d'entreprise. La planche de
  marque affiche « VOTRE MARQUE ».
- **Aucun chiffre de résultat.** Pas de « +40 % de réservations » : rien ne le
  prouverait.

Ces modules sont étiquetés « Démonstration » partout où ils apparaissent.

---

## Accessibilité et performance

- HTML sémantique, `lang="fr"`, lien d'évitement, `aria-*` sur les éléments
  interactifs, focus visible.
- FAQ construite sur `<details>`/`<summary>` natifs : accessible au clavier et
  entièrement lisible par les moteurs de recherche, sans JavaScript.
- Apparitions au défilement via `IntersectionObserver`, une seule fois, en
  basculant un attribut du DOM plutôt qu'un état React.
- `prefers-reduced-motion` neutralise toutes les animations.
- L'état masqué des apparitions dépend d'une classe `js` posée sur `<html>` :
  si le script ne s'exécute pas, **rien n'est caché**.
- Le haut de page de chaque route utilise `Entree` (animation CSS pure) et
  non `Reveal` : le titre principal s'affiche dès la première peinture, sans
  attendre l'hydratation. `Reveal` reste réservé au contenu sous la ligne de
  flottaison.
- Image de partage 1200×630 générée au build (`src/app/opengraph-image.tsx`),
  en Plus Jakarta Sans (`src/assets/fonts/`, licence OFL).
- Les 9 routes sont pré-rendues en statique au build.

---

## Vérifications effectuées

- `npx next build` : 9 routes + `robots.txt` + `sitemap.xml`, sans erreur.
- `npx eslint src --max-warnings=0` : aucun avertissement.
- TypeScript : aucune erreur.
- Responsive contrôlé à **375 / 430 / 768 / 1024 / 1440 px** sur les 9 routes,
  par mesure des rectangles de chaque élément — aucun débordement horizontal.
- `robots.txt`, `sitemap.xml`, titres et descriptions uniques par page,
  JSON-LD `Organization` : vérifiés sur le build servi.

- axe-core sur les 10 routes (404 comprise), à 390 et 1440 px : aucune
  violation.
- Lighthouse (mobile, build de production) :

  | Page | Perf. | Access. | Bonnes pratiques | SEO |
  |---|---|---|---|---|
  | `/` (avec galerie 3D) | 95 | 100 | 100 | 100 |
  | `/services` | 99 | 100 | 100 | 100 |
  | `/realisations` | 99 | 100 | 100 | 100 |
  | `/a-propos` | 100 | 100 | 100 | 100 |
  | `/contact` | 98 | 100 | 100 | 100 |
  | `/solutions/restaurants` | 99 | 100 | 100 | 100 |

Non vérifié : le rendu sur appareils physiques.
