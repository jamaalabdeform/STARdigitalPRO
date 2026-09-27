# STAR DIGI PRO — charte noir / blanc et consignes d'intégration

Référence de marque du site. Elle traduit la brand board « STAR DIGI PRO »
(2026, direction noir / blanc) en éléments directement utilisables dans le code,
et fixe les règles à respecter pour toute page ajoutée ensuite.

> **Principe.** Le premium ne se démontre pas, il se ressent. Pas d'or, pas de
> halo, pas de dégradé décoratif, pas de 3D gratuite. La tenue vient de la
> proportion, de la typographie, de l'espace, du contraste et de la précision.

---

## 1. Logo

### Symbole

Deux obliques — le passage de la première vue à la première vente,
l'impulsion, la progression. Dessinable à main levée, lisible à 16 px, sans
aucun effet. Vectoriel, défini une seule fois :

```tsx
import { Logo, LogoMark } from "@/components/site/Logo";

<Logo />                        // symbole + wordmark, sur fond sombre
<Logo tone="sombre" />          // sur fond clair
<Logo size="lg" baseline />     // avec la signature (pied de page)
<LogoMark className="h-5 w-[30px]" />  // symbole seul, hérite de la couleur
```

`LogoMark` utilise `currentColor` : noir, blanc et inversé viennent d'une seule
source.

### Wordmark

« STAR DIGI » en demi-gras, « PRO » en regular, Inter. La hiérarchie passe par
la graisse, jamais par la couleur.

### Fichiers

| Fichier | Usage |
|---|---|
| `/brand/logo.svg` | Symbole seul, noir, vectoriel |
| `/brand/favicon.svg` | Tuile noire, symbole blanc cassé |
| `/brand/favicon.png` | Favicon 96 px |
| `/brand/apple-touch-icon.png` | Icône iOS 180 px |
| `/brand/icon-dark.png` | Tuile 512 px, symbole clair sur noir (JSON-LD, réseaux) |
| `/brand/icon-light.png` | Tuile 512 px, symbole noir sur blanc cassé (fonds clairs, impression) |

### Tailles minimales

16 px (favicon) · 24 px (icône) · 40 px (version compacte) · 80 px (version
horizontale). Zone de protection : la hauteur d'une oblique sur les quatre
côtés.

### Interdits

Aucun effet (ombre, lueur, dégradé, 3D). Pas de couleur autre que noir, blanc
ou blanc cassé. Ne pas déformer les obliques, ni en changer l'angle.

---

## 2. Palette

Déclarée dans `src/app/globals.css`, bloc `@theme`. Tailwind v4 se configure en
CSS — **il n'y a pas de `tailwind.config.js`**.

| Token | Valeur | Rôle | Utilitaires |
|---|---|---|---|
| `noir` | `#050505` | Fond principal | `bg-noir` `text-noir` |
| `graphite` | `#1B1B1B` | Surfaces sur fond noir | `bg-graphite` |
| `graphite-2` | `#2A2A2A` | Filets sur fond noir | `border-graphite-2` |
| `gris-subtil` | `#B7B7B7` | Fragments de titre en retrait | `text-gris-subtil` |
| `gris-clair` | `#E8E8E8` | Surfaces sur fond clair | `bg-gris-clair` |
| `casse` | `#F4F3EF` | Blanc cassé — sections claires | `bg-casse` |
| `blanc` | `#FFFFFF` | Texte sur noir, boutons | `text-blanc` `bg-blanc` |
| `plomb` | `#5C5C5C` | Texte secondaire **sur fond clair** | `text-plomb` |
| `plomb-clair` | `#A3A3A3` | Texte secondaire **sur fond sombre** | `text-plomb-clair` |

`vert` (`#1F9D6B`) et `alerte` (`#E5484D`) sont des rôles **fonctionnels**
(succès, erreur de formulaire), hors identité.

**Aucune couleur d'accent.** La charte fonctionne sans. Si un accent est un
jour ajouté, il reste sous 5 % de la surface et ne devient jamais la marque.

### Proportions

Noir ~70 % · blanc cassé ~20 % (sections de respiration) · gris et blanc pour
le texte et les filets.

### Contrastes — non négociables

1. Sur fond sombre, le texte secondaire est `plomb-clair`, jamais `plomb`.
2. Sur fond clair, le texte secondaire est `plomb`, jamais `plomb-clair`.
3. Dans une section claire, un bouton plein est `variant="dark"`, jamais
   `primary` (blanc sur blanc cassé).

Tous deux tiennent 4,5:1 jusque sur `graphite` et `gris-clair`. Vérifié par
axe-core sur les 10 routes (§ 9).

---

## 3. Typographie

**Inter** (police variable), alternative libre à Suisse Int'l retenue par la
charte. Chargée par `next/font/google` dans `src/app/layout.tsx` : servie en
local, aucune requête vers un tiers.

| Rôle | Classe / style | Taille indicative |
|---|---|---|
| Display | `.h-display` — 600, approche −0,05 em, interligne 0,94 | `clamp(2.6rem, 7vw, 8.25rem)` |
| Heading | `.h-section` — 600, approche −0,04 em | `clamp(2.2rem, 5vw, 4.5rem)` |
| Title | 500–600, approche −0,02 em | 19–26 px |
| Body | 400, interligne 1,6 | 16–18 px |
| Caption | 400, `plomb` / `plomb-clair` | 12,5–14 px |
| Label | `.label` — 500, capitales, +0,18 em | 11 px |

`.mot-accent` met un fragment de titre en retrait (`gris-subtil` sur fond
sombre, `plomb` sur fond clair), comme « PRO » dans le wordmark.

---

## 4. Iconographie

`src/components/brand/Icons.tsx` — trait de 1,4 px, grille 24 × 24, couleur
héritée (`currentColor`), noir ou blanc uniquement. Les icônes servent
l'interface, elles ne décorent pas.

```tsx
import { BrandIcon, iconeParService } from "@/components/brand/Icons";

<BrandIcon name="crm" className="h-6 w-6 text-blanc" />
```

---

## 5. Motifs

`src/components/brand/Motifs.tsx` — volontairement réduit :

- `Oblique` : une oblique du symbole, en séparateur ou en repère ;
- `Filet` : filet d'un pixel ;
- `Pastille` : cadre carré au trait fin, pour porter une icône.

Classes CSS : `.filet`, `.carte-ligne` (filet supérieur qui se dessine au
survol), `.grain` (grain photographique très léger, grands aplats noirs
seulement), `.photo-nb` (passe une photo en noir et blanc).

Supprimés avec l'ancienne charte : halos, trames de particules, traînées
dorées, liserés or.

---

## 6. Direction image

- **Noir et blanc**, contrasté, cinématographique, grain léger.
- Documentaire premium : gestes métier, matières, architectures, objets.
- Jamais de sourire publicitaire face caméra, jamais de photo générique de
  bureau.
- Les six visuels du hero (`public/hero/`) forment une campagne : même
  lumière, même contraste, même profondeur. Ils ne contiennent aucun titre —
  les textes sont en HTML.

Pour remplacer un visuel du hero : format 16:10, fond sombre, puis conversion
en WebP 1440 × 900 avec bords fondus en transparence (voir README).

---

## 7. Mouvement

Lent · précis · fluide · architectural.

- **Autorisé** : fondu, révélation par masque, translation courte, échelle très
  faible, `clip-path`.
- **Interdit** : rebond, lueur, rotation gratuite, particules, animation
  permanente.
- Courbe unique : `--ease-soft` (`cubic-bezier(0.22, 1, 0.36, 1)`), durées
  0,5–0,9 s.
- `prefers-reduced-motion` neutralise tout, y compris la galerie 3D (qui passe
  en mode statique).

---

## 8. Consignes d'intégration

### Ajouter une section

Le site est **à dominante noire**. Une section sans fond hérite de `noir`.

```tsx
{/* Section sombre — le cas courant */}
<section className="py-20 lg:py-28">
  <Container>
    <SectionHead eyebrow="…" title="…" lead="…" />
  </Container>
</section>

{/* Section claire — respiration, 1 à 2 par page maximum */}
<section className="sec-claire py-20 lg:py-28">
  <Container>
    <SectionHead tone="sombre" eyebrow="…" title="…" />
  </Container>
</section>
```

`tone` décrit **la couleur du texte**, pas celle du fond : `clair` = texte
clair sur fond sombre (défaut), `sombre` = l'inverse.

### Boutons

Rectangles nets, sans arrondi. Survol : inversion de couleur et léger
déplacement de la flèche.

| Variante | Contexte |
|---|---|
| `primary` *(défaut)* | Plein blanc, **sur fond sombre** — action principale |
| `outline` | Contour clair, **sur fond sombre** |
| `dark` | Plein noir, **sur fond clair** |
| `outlineDark` | Contour sombre, **sur fond clair** |
| `ghost` | Sans fond |

⚠ Ne jamais poser `hidden` directement sur `<Button>` : le composant applique
déjà `inline-flex`. Envelopper : `<span className="hidden sm:contents">…</span>`.

### Cartes

Peu de cartes : préférer la typographie, les filets et l'espace. Quand une
carte est nécessaire : angles droits, filet d'un pixel, pas d'ombre.

```tsx
<div className="carte-ligne border border-blanc/12 p-7">
```

### Maquettes d'interface

Les modules de `src/components/mockups/` sont des démonstrations d'interface,
en noir et blanc. Ils gardent de légers arrondis (ce sont des écrans), mais
aucune couleur d'accent : sélection et actions en noir.

### Règles de fond

- Aucun faux client, faux témoignage ou chiffre inventé.
- Tout module de démonstration porte une pastille « Démo ».
- Les coordonnées absentes restent `null` dans `src/lib/site.ts` et
  l'interface les masque — ne jamais inventer un numéro pour « remplir ».

---

## 9. Vérifier une modification

```bash
npx next build
npx eslint src --max-warnings=0
```

- **Contrastes** : après toute modification de couleurs, rejouer axe-core sur
  toutes les routes, à 390 et 1440 px.
- **Responsive** : tester 375 / 430 / 768 / 1024 / 1440 px. `body` porte
  `overflow-x: hidden` : mesurer les rectangles des éléments plutôt que
  `scrollWidth`.

---

## 10. Reste à fournir

| Élément | Impact |
|---|---|
| **Photographies réelles** par secteur | Les vignettes actuelles sont petites (720 × 188), passées en noir et blanc |
| **Coordonnées** (e-mail, téléphone, adresse) | Actuellement masquées faute de données |
| **Destination du formulaire** (`CONTACT_WEBHOOK_URL`) | Le formulaire annonce qu'il n'est pas relié |
| **Identifiants analytics** | Aucun script posé, pas d'ID fictif |
