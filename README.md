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

### 2. Destination du formulaire — e-mail via Resend

Les demandes partent par e-mail à **contact@stipway.com** (modifiable via
`CONTACT_EMAIL_TO`), avec l'adresse du visiteur en « Répondre à ».

1. Créer un compte gratuit sur [resend.com](https://resend.com), puis une clé
   dans **API Keys**.
2. La renseigner dans `RESEND_API_KEY` : `.env.local` en local
   (`cp .env.example .env.local`), ou **Vercel → Project → Settings →
   Environment Variables** en production, puis redéployer.

⚠ Sans domaine vérifié, l'expéditeur de test `onboarding@resend.dev` ne peut
écrire **qu'à l'adresse du compte Resend**. Soit le compte Resend est créé avec
contact@stipway.com, soit on vérifie le domaine dans Resend (quelques
enregistrements DNS) et on renseigne `CONTACT_EMAIL_FROM`, par exemple
`STAR DIGI PRO <site@stardigipro.com>`.

Alternative : `CONTACT_WEBHOOK_URL` (Make, n8n, CRM…), utilisée seulement si
`RESEND_API_KEY` est vide. Sans aucune des deux, le formulaire valide la saisie
puis **annonce explicitement** qu'il n'est relié à aucune destination et
renvoie vers WhatsApp — il n'affiche jamais « message envoyé » dans le vide.

Code : `src/app/actions.ts` (action serveur) et `src/lib/contact.ts` (types et
état initial — un fichier « use server » ne peut exporter que des fonctions).

### WhatsApp

Bouton flottant en bas à droite de toutes les pages
(`src/components/site/WhatsAppButton.tsx`) : lien `wa.me` vers le numéro de
`site.contact.whatsapp` (`src/lib/site.ts`), avec un message pré-rempli.

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

Charte **noir / blanc** (2026) : palette, typographie (**Inter**), logo,
boutons, mouvement et règles de contraste — voir **`BRAND.md`**, qui fait
référence.

### Refonte noir / blanc — ce qui a changé

- Palette : or, halos, trames de particules et traînées supprimés ; noir
  `#050505`, graphite, gris, blanc cassé `#F4F3EF`. Aucune couleur d'accent.
- Typographie : Plus Jakarta Sans → Inter ; titres display jusqu'à 132 px.
- Logo : nouveau symbole à deux obliques (SVG, `currentColor`), favicons et
  icônes régénérés.
- Composants : boutons rectangulaires (survol par inversion), angles droits,
  filets d'un pixel, header allégé (« Studio », CTA « Parler de votre
  projet »).
- Hero : six visuels de campagne noir et blanc ; mouvement 3D atténué, sans
  particules.
- Photos métier passées en noir et blanc (`.photo-nb`).

### Couleur contextuelle — la marque reste monochrome, le contenu vit

- Visuels couleur (`design/masters/couleur/`, source de vérité) : les 6 du
  hero et 4 photos secteurs, recadrées au-dessus du texte qu'elles
  incrustaient.
- `data-univers` fixe un accent par section ou par page (métiers, étapes du
  hero) ; couleurs fonctionnelles dans les maquettes (statuts CRM, sélection,
  flux actif, confirmation). Détail : `BRAND.md` § 2 bis.
- Accueil : Offre 360° sur fond clair, métiers en grands visuels couleur,
  parcours sur gris chaud. Pages métier : photo couleur et bouton à l'accent
  du métier.
- Image de partage : photo couleur, logo noir et blanc.

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
- **Visuels :** `public/hero/*.webp`, campagne couleur fournie par STAR DIGI
  PRO (masters PNG 1600 × 900 dans `design/masters/couleur/`). Convertis en
  WebP 1440 × 810 (40–80 Ko), bords fondus en transparence pour se mêler au
  noir de la scène. Une seule source WebP, partagée par la texture 3D et
  l'image de repli (déjà en cache) ; l'AVIF est réservé aux photos secteurs,
  servies par `next/image` (`images.formats` dans `next.config.ts`).
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
  en Inter (`src/assets/fonts/`, licence OFL).
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
  | `/` (avec galerie 3D) | 97 | 100 | 100 | 100 |
  | `/services` | 98 | 100 | 100 | 100 |
  | `/realisations` | 98 | 100 | 100 | 100 |
  | `/a-propos` | 96 | 100 | 100 | 100 |
  | `/contact` | 98 | 100 | 100 | 100 |
  | `/solutions/restaurants` | 95 | 100 | 100 | 100 |

Non vérifié : le rendu sur appareils physiques.
