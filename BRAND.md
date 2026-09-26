# STAR DIGI PRO — kit d'identité et consignes d'intégration

Ce document est la référence de marque du site. Il traduit la charte fournie
(« Guide de marque premium Star Digi Pro ») en éléments directement utilisables
dans le code, et fixe les règles à respecter pour toute page ajoutée ensuite.

**Source** : `identité visuelle/charte graphique.png` — planche unique, 1536×1024.

---

## 1. Logo

### Composition

Le logotype se compose de deux parties, traitées différemment **pour une raison
technique importante** :

| Partie | Traitement | Pourquoi |
|---|---|---|
| Symbole (S doré + étoile) | Image raster `/brand/mark.png` | La charte n'existe qu'en PNG ; le symbole n'y occupe que ~170 px |
| Logotype « STAR DIGI PRO » | Texte, Plus Jakarta Sans 800 | Net à toute taille, lisible par les moteurs de recherche |

### ⚠ Limite à lever

Le symbole est un **raster de 170 × 140 px**. Il reste net jusqu'à environ
**85 px d'affichage**. Au-delà, il devient flou.

> **À fournir** : le fichier vectoriel du logo (`.svg`, `.ai` ou `.eps`).
> Dès réception, remplacer `/public/brand/mark.png` par un `.svg` et adapter
> `LogoMark` dans `src/components/site/Logo.tsx`. Aucune autre modification
> ne sera nécessaire.

### Déclinaisons disponibles

| Fichier | Usage |
|---|---|
| `/brand/mark.png` | Symbole détouré, **fonds sombres uniquement** |
| `/brand/icon-dark.png` | Tuile arrondie, or sur noir — favicon, réseaux |
| `/brand/icon-gold.png` | Tuile arrondie, noir sur or — icône applicative |
| `/brand/icon-mono.png` | Monochrome sur blanc — impression, fonds clairs |
| `/brand/apple-touch-icon.png` | 180 × 180 |

Le symbole détouré **ne doit pas** être posé sur un fond or : le détourage laisse
des halos. Utiliser `icon-gold.png` dans ce cas.

### Composant

```tsx
import { Logo, LogoMark } from "@/components/site/Logo";

<Logo />                              // sur fond sombre
<Logo tone="sombre" />                // sur fond clair
<Logo size="lg" baseline />           // avec la baseline
<LogoMark size={28} />                // symbole seul
```

---

## 2. Palette

Déclarée dans `src/app/globals.css`, bloc `@theme`. Tailwind v4 se configure en
CSS — **il n'y a pas de `tailwind.config.js`**.

| Token | Valeur | Rôle (charte) | Utilitaires |
|---|---|---|---|
| `noir` | `#0B0B0D` | Confiance, élégance | `bg-noir` `text-noir` |
| `anthracite` | `#1F1F24` | Sérénité, professionnalisme | `bg-anthracite` |
| `blanc` | `#FFFFFF` | Clarté, lisibilité | `text-blanc` |
| `gris` | `#F5F6F8` | Équilibre, arrière-plan | `bg-gris` |
| **`or`** | **`#D4AF37`** | **Valeur, premium, croissance** | `text-or` `bg-or` |
| `or-clair` | `#E8C868` | Survols, reflets | `hover:bg-or-clair` |
| `or-sombre` | `#A8862A` | **Or sur fond clair** | `text-or-sombre` |
| `bleu` | `#3B82F6` | Digital, technologie | `text-bleu` |
| `vert` | `#10B981` | Conversion, succès | `text-vert` |
| `plomb` / `plomb-clair` | `#70757E` / `#9AA0AA` | Textes secondaires | `text-plomb-clair` |

### Règles de contraste — non négociables

Ces trois règles viennent d'un audit de contraste automatisé qui a relevé
9 défauts réels lors de la mise en place de la charte :

1. **Sur l'or, le texte est NOIR.** Jamais blanc — le blanc sur `#D4AF37`
   plafonne à 2,1:1. C'est aussi la règle visible sur l'icône applicative.
2. **Sur fond clair, l'or de texte est `or-sombre`**, pas `or` : l'or pur sur
   blanc tombe également à 2,1:1.
3. **L'or pur (`or`) est réservé** aux fonds sombres et aux aplats non textuels
   (pastilles, filets, points d'état).

Un script d'audit réutilisable est décrit au § 9.

---

## 3. Typographie

**Plus Jakarta Sans**, imposée par la charte. Chargée par `next/font/google`
dans `src/app/layout.tsx` — servie en local, aucune requête vers un tiers.

| Classe | Usage | Graisse |
|---|---|---|
| `.h-display` | Titres de page (h1) | 800 |
| `.h-section` | Titres de section (h2, h3) | 700 |
| *(défaut)* | Texte courant | 400 |
| `.tnum` | Chiffres alignés (prix, dates, pipelines) | — |
| `.mot-or` | Met un fragment de titre en or | — |

### Principe d'accentuation

Le logotype met « PRO » en or. On applique la même logique aux titres : **un
seul fragment en or par titre**, celui qui porte le sens.

```tsx
<h1 className="h-display">
  De la première vue<br />à la <span className="mot-or">première vente.</span>
</h1>
```

---

## 4. Iconographie

`src/components/brand/Icons.tsx` — trait de 1,4 px, extrémités arrondies,
grille 24 × 24, couleur héritée (`currentColor`).

**Prestations** : `branding` `web` `ecommerce` `reservation` `crm`
`automatisation` `ia` `reseaux` `acquisition` `fidelisation`

**Secteurs** : `restaurants` `barbers` `beaute` `automobile` `commerce`

```tsx
import { BrandIcon, iconeParService } from "@/components/brand/Icons";

<BrandIcon name="crm" className="h-7 w-7 text-or" />
<BrandIcon name={iconeParService["web"]} className="h-6 w-6 text-or" />
```

Deux tables de correspondance évitent de recâbler les icônes à la main :
`iconeParService` (les 6 briques) et `iconeParVerticale` (les 4 métiers).

---

## 5. Motifs graphiques

`src/components/brand/Motifs.tsx` — **tous en vectoriel**, redessinés plutôt
qu'extraits de la planche : nets à toute taille, quelques centaines d'octets.

| Composant | Effet |
|---|---|
| `<Sparkle />` | Étoile à 4 branches du symbole |
| `<HaloOr />` | Halo doré diffus, derrière un bloc |
| `<TrameOr />` | Champ de particules dorées, en fondu |
| `<TraineeOr />` | Traînée lumineuse dorée |
| `<FiletOr />` | Séparateur horizontal qui s'éteint sur les bords |
| `<PastilleOr />` | Pastille ronde cerclée d'or, pour une icône |

Classe utilitaire `carte-or` : liseré doré sur le bord supérieur au survol.

### Dosage

Un halo **ou** une traînée par section, jamais les deux à pleine intensité.
Les motifs accompagnent, ils ne décorent pas pour eux-mêmes.

---

## 6. Direction photo et vidéo

Déduite des visuels sectoriels de la charte.

**Traitement** — fonds sombres dominants, éclairage chaud et directionnel,
sources lumineuses dorées visibles dans le cadre (ampoules, bougies, reflets),
faible profondeur de champ, contraste marqué, noirs profonds non déboussés.

**Cadrage** — plans d'ambiance plutôt que plans produits détourés. Les personnes
apparaissent de profil, de dos ou en action ; le sujet reste le lieu et le geste.

**À proscrire** — banque d'images générique sur fond blanc, lumière neutre de
bureau, sourires face caméra, teintes froides, aplats bleutés de type SaaS.

**Intégration** — toujours sous un voile sombre
(`bg-gradient-to-t from-noir via-noir/85 to-noir/35`) et à `opacity-30` à `45`,
pour que la typographie reste lisible par-dessus.

### ⚠ Images actuelles = provisoires

`/public/verticals/*.jpg` proviennent de **vignettes de la charte** (360 px de
large à la source, recadrées au-dessus des libellés incrustés). Elles donnent la
direction, **ce ne sont pas des visuels de production**. À remplacer par de
vraies photographies au format 2:1, 1600 px de large minimum.

---

## 7. Assets par verticale

| Secteur | Accroche officielle | Photo | Icône |
|---|---|---|---|
| Restaurants | De la première envie à la réservation. | `/verticals/restaurants.jpg` | `restaurants` |
| Barbers | Une image forte. Un planning rempli. | `/verticals/barbers.jpg` | `barbers` |
| Beauté | Votre expérience commence avant le rendez-vous. | `/verticals/beaute.jpg` | `beaute` |
| Automobile | Une image à la hauteur de ce que vous vendez. | `/verticals/automobile.jpg` | `automobile` |

Les accroches sont **celles de la charte, mot pour mot**. Ne pas les réécrire.

```tsx
import { universVerticale } from "@/lib/content";
const { photo, accroche } = universVerticale["barbers"];
```

---

## 8. Consignes d'intégration

### Ajouter une section

Le site est **à dominante sombre**. Une section sans fond hérite de `noir`.

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

`tone` décrit **la couleur du texte**, pas celle du fond :
`clair` = texte clair sur fond sombre (défaut), `sombre` = l'inverse.
Les composants `Eyebrow`, `SectionHead`, `Pill`, `Faq` et `Logo` suivent tous
cette convention.

### Boutons

| Variante | Contexte |
|---|---|
| `primary` *(défaut)* | Or, texte noir — action principale |
| `outline` | Contour clair, **sur fond sombre** |
| `outlineDark` | Contour sombre, **sur fond clair** |
| `ghost` | Sans fond |

⚠ Ne jamais poser `hidden` directement sur `<Button>` : le composant applique
déjà `inline-flex`, et à spécificité égale c'est l'ordre dans la feuille qui
tranche. Envelopper : `<span className="hidden sm:contents"><Button …/></span>`.

### Cartes

```tsx
<div className="carte-or rounded-2xl border border-blanc/12 bg-anthracite/60 p-7">
```

### Maquettes d'interface

Les modules de `src/components/mockups/` sont des **cartes claires**, y compris
sur fond sombre — c'est le traitement de la charte elle-même. Ne pas les
inverser. Y appliquer les règles de contraste du § 2 (or sombre sur blanc, noir
sur or).

### Règles de fond

- Aucun faux client, faux témoignage ou chiffre inventé. Les cartes de
  démonstration portent un secteur et une ville, jamais un nom d'entreprise.
- Tout module de démonstration porte une pastille « Démo ».
- Les coordonnées absentes restent `null` dans `src/lib/site.ts` et
  l'interface les masque — ne jamais inventer un numéro pour « remplir ».

---

## 9. Vérifier une modification

```bash
npx next build                  # types + 9 routes
npx eslint src --max-warnings=0
```

### Audit de contraste

Le passage à la charte a introduit 9 défauts de contraste invisibles à l'œil nu,
tous détectés par mesure. Après toute modification de couleurs, rejouer l'audit :
ouvrir chaque page, parcourir les éléments porteurs de texte, comparer la
couleur calculée du texte au premier fond opaque de la chaîne d'ancêtres, et
signaler tout rapport inférieur à 3:1.

### Responsive

Tester **375 / 430 / 768 / 1024 / 1440 px**. Attention : `body` porte
`overflow-x: hidden`, donc `scrollWidth - clientWidth` vaut toujours 0 et **ne
détecte aucun débordement**. Mesurer les rectangles des éléments à la place, en
excluant ceux placés dans un conteneur `overflow-x: auto`.

---

## 10. Reste à fournir

| Élément | Impact |
|---|---|
| **Logo vectoriel** (`.svg` / `.ai`) | Débloque le logo net au-delà de 85 px |
| **Photographies réelles** par secteur | Remplace les vignettes de la charte |
| **Coordonnées** (e-mail, téléphone, adresse) | Actuellement masquées faute de données |
| **Destination du formulaire** (`CONTACT_WEBHOOK_URL`) | Le formulaire annonce qu'il n'est pas relié |
| **Identifiants analytics** | Aucun script posé, pas d'ID fictif |
