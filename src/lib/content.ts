/**
 * Contenu éditorial du site, en un seul endroit.
 *
 * Règle tenue partout dans ce fichier : aucun client, aucun témoignage, aucun
 * chiffre de résultat. Tout ce qui est affirmé est soit une description de
 * prestation, soit une observation de terrain — jamais une statistique inventée.
 */

/* ------------------------------------------------ Hero : les six étapes --- */
/* Galerie 3D de l'accueil. Chaque visuel est une capture des maquettes de
   `components/mockups/` (voir public/hero/) : ce sont des démonstrations,
   aucune ne représente un client. */

export type EtapeHero = {
  id: string;
  titre: string;
  description: string;
  visuel: { src: string; alt: string };
  /** Ancre de la page Services qui détaille l'étape. */
  service: string;
};

export const etapesHero: EtapeHero[] = [
  {
    id: "identite",
    titre: "Identité",
    description:
      "Un logo, une charte et des supports qui parlent d'une seule voix, de la devanture à l'écran du téléphone.",
    visuel: {
      src: "/hero/identite.webp",
      alt: "Démonstration d'une planche de marque : logotype, palette de couleurs et typographie.",
    },
    service: "identite",
  },
  {
    id: "site",
    titre: "Site",
    description:
      "Un site rapide, compris en dix secondes, construit pour faire passer à l'action : appeler, venir, réserver.",
    visuel: {
      src: "/hero/site.webp",
      alt: "Démonstration d'un site mobile et de sa fiche d'établissement avec boutons Itinéraire, Appeler et Réserver.",
    },
    service: "web",
  },
  {
    id: "reservation",
    titre: "Réservation",
    description:
      "Vos clients choisissent leur créneau en ligne, à toute heure, sans passer par le téléphone.",
    visuel: {
      src: "/hero/reservation.webp",
      alt: "Démonstration d'un module de réservation avec choix du jour et de l'heure, et rappel automatique.",
    },
    service: "crm",
  },
  {
    id: "crm",
    titre: "CRM",
    description:
      "Chaque demande arrive au même endroit et se suit jusqu'à la vente. Plus rien ne se perd entre un carnet et WhatsApp.",
    visuel: {
      src: "/hero/crm.webp",
      alt: "Démonstration d'un pipeline commercial en quatre colonnes : nouveau contact, qualifié, devis envoyé, client.",
    },
    service: "crm",
  },
  {
    id: "automatisation",
    titre: "Automatisation",
    description:
      "Rappels, relances et demandes d'avis partent tout seuls, au bon moment, sans y penser.",
    visuel: {
      src: "/hero/automatisation.webp",
      alt: "Démonstration d'un scénario automatisé : rendez-vous terminé, attente de 48 h, demande d'avis puis offre fidélité.",
    },
    service: "automatisation",
  },
  {
    id: "ia",
    titre: "IA",
    description:
      "Un assistant qui répond à vos clients jour et nuit et qualifie les demandes avant qu'elles ne vous arrivent.",
    visuel: {
      src: "/hero/ia.webp",
      alt: "Démonstration d'une conversation avec l'assistant Jawabot.",
    },
    service: "ia",
  },
];

/* ------------------------------------------------------------- Services --- */

export type Service = {
  id: string;
  label: string;
  short: string;
  body: string;
  items: string[];
};

export const services: Service[] = [
  {
    id: "identite",
    label: "Identité & branding",
    short:
      "Logo, identité visuelle, charte graphique et univers de marque cohérent.",
    body: "Une identité n'est pas un logo isolé. C'est un système : des formes, des couleurs, une typographie et des règles qui tiennent aussi bien sur une devanture que sur un écran de téléphone.",
    items: [
      "Logo et déclinaisons",
      "Charte graphique",
      "Palette et typographie",
      "Univers photo et ton",
      "Gabarits réutilisables",
    ],
  },
  {
    id: "print",
    label: "Création graphique & print",
    short:
      "Menus, flyers, affiches, catalogues, présentations et visuels digitaux.",
    body: "Les supports du quotidien sont souvent le premier contact physique avec votre marque. Ils méritent le même soin que la page d'accueil.",
    items: [
      "Menus et cartes",
      "Flyers et affiches",
      "Catalogues et brochures",
      "Présentations commerciales",
      "Visuels réseaux sociaux",
    ],
  },
  {
    id: "web",
    label: "Sites & e-commerce",
    short:
      "Sites vitrines, expériences premium, catalogues, e-commerce et landing pages.",
    body: "Un site se juge sur trois points : ce qu'on comprend en dix secondes, la vitesse d'affichage, et la facilité à passer à l'action. Le reste est de la décoration.",
    items: [
      "Site vitrine et site premium",
      "Landing page de campagne",
      "Catalogue produits",
      "Boutique en ligne",
      "Optimisation d'un site existant",
    ],
  },
  {
    id: "crm",
    label: "CRM & parcours client",
    short:
      "Centralisation des prospects, suivi commercial, réservation et gestion client.",
    body: "La plupart des demandes se perdent entre un carnet, une boîte mail et trois conversations WhatsApp. Un CRM ne sert pas à faire moderne, il sert à ne plus rien perdre.",
    items: [
      "Centralisation des demandes",
      "Pipeline et suivi",
      "Prise de rendez-vous",
      "Base clients",
      "Tableaux de bord",
    ],
  },
  {
    id: "automatisation",
    label: "Automatisation",
    short: "Relances, rappels, workflows, WhatsApp, e-mails et tâches répétitives.",
    body: "Tout ce qui se répète à l'identique peut être confié à un scénario : confirmations, rappels de rendez-vous, relances de devis, demandes d'avis.",
    items: [
      "Confirmations et rappels",
      "Relances de devis",
      "Demandes d'avis",
      "Scénarios e-mail et WhatsApp",
      "Notifications internes",
    ],
  },
  {
    id: "ia",
    label: "IA & Jawabot",
    short:
      "Assistants conversationnels et automatisations intelligentes, quand elles apportent une vraie valeur.",
    body: "L'IA n'est pas un argument de vente. Elle a sa place quand elle absorbe des questions répétitives ou qualifie une demande avant qu'elle n'arrive sur votre téléphone. Sinon, elle n'en a pas.",
    items: [
      "Jawabot, assistant conversationnel",
      "FAQ intelligente",
      "Qualification des demandes",
      "Tri et routage",
      "Automatisations sur mesure",
    ],
  },
];

/* ------------------------------------------------- Les cinq actes (home) --- */

export type Act = {
  n: string;
  eyebrow: string;
  title: string;
  body: string;
  bullets: string[];
};

export const acts: Act[] = [
  {
    n: "01",
    eyebrow: "Être vu",
    title: "L'image décide avant vous",
    body: "Avant le premier mot échangé, un client a déjà jugé votre enseigne, votre carte, votre photo de profil. L'identité visuelle n'est pas un supplément esthétique : c'est la première information que vous donnez sur votre niveau d'exigence.",
    bullets: ["Logo et identité", "Charte et déclinaisons", "Menus, flyers, supports"],
  },
  {
    n: "02",
    eyebrow: "Être cliqué",
    title: "Être trouvé, puis être choisi",
    body: "On vous cherche sur un téléphone, souvent à dix minutes de chez vous, souvent pressé. Ce qui compte alors : apparaître, charger vite, et rendre évident le geste suivant.",
    bullets: ["Site rapide et lisible", "Fiche établissement soignée", "Parcours mobile d'abord"],
  },
  {
    n: "03",
    eyebrow: "Convertir",
    title: "Transformer l'intention en rendez-vous",
    body: "Un visiteur intéressé qui doit appeler pendant vos heures d'ouverture est un client que vous perdez la moitié du temps. Réservation, formulaire ou WhatsApp : l'action doit être possible à l'instant où l'envie est là.",
    bullets: ["Réservation en ligne", "Formulaires courts", "WhatsApp et rappel immédiat"],
  },
  {
    n: "04",
    eyebrow: "Gérer",
    title: "Ne plus rien perdre en route",
    body: "Les demandes arrivent par cinq canaux différents. Sans endroit unique pour les recevoir, certaines restent sans réponse — et c'est rarement celles qu'on croit.",
    bullets: ["Toutes les demandes au même endroit", "Suivi commercial", "Base clients"],
  },
  {
    n: "05",
    eyebrow: "Vendre et fidéliser",
    title: "Ce qui se répète peut être automatisé",
    body: "Rappels de rendez-vous, relances de devis, demandes d'avis, offres de retour : ces gestes font la différence sur l'année, et personne n'a le temps de les faire à la main tous les jours.",
    bullets: ["Rappels et relances", "Avis clients", "Fidélisation et assistants"],
  },
];

/* --------------------------------------------------------------- Méthode --- */

export const method = [
  {
    n: "01",
    title: "Comprendre",
    body: "Analyser l'activité, les clients et les outils déjà en place. Beaucoup de choses fonctionnent déjà : autant les garder.",
  },
  {
    n: "02",
    title: "Prioriser",
    body: "Identifier les deux ou trois améliorations qui changent réellement quelque chose, et écarter le reste pour plus tard.",
  },
  {
    n: "03",
    title: "Concevoir",
    body: "Créer l'identité, l'expérience ou le système. Chaque choix est motivé par un usage, pas par une tendance.",
  },
  {
    n: "04",
    title: "Déployer",
    body: "Mettre en ligne, connecter les outils, tester sur de vrais parcours et sur de vrais téléphones.",
  },
  {
    n: "05",
    title: "Faire évoluer",
    body: "Ajouter une brique quand l'activité le demande, pas avant. Un dispositif qui grandit avec l'entreprise.",
  },
];

/* ------------------------------------------------------------------- FAQ --- */

export const faq = [
  {
    q: "Faites-vous uniquement des sites internet ?",
    a: "Non. Le site n'est qu'une brique. Nous intervenons sur l'identité visuelle, les supports imprimés, le site, la réservation, le CRM, les automatisations et les assistants conversationnels. Certains projets ne comportent d'ailleurs aucun site.",
  },
  {
    q: "Peut-on commencer petit ?",
    a: "C'est même ce que nous recommandons le plus souvent. Commencez par ce qui vous manque vraiment — un logo, une page de réservation, une remise à plat de votre fiche en ligne — et ajoutez le reste quand le besoin se fait sentir.",
  },
  {
    q: "Travaillez-vous en France et en Belgique ?",
    a: "Oui, sur les deux marchés. Les échanges se font à distance, avec des rendez-vous sur place lorsque le projet le justifie.",
  },
  {
    q: "Proposez-vous un suivi après la mise en ligne ?",
    a: "Oui. Un dispositif digital vit : contenus à mettre à jour, scénarios à ajuster, évolutions à prévoir. Le suivi s'adapte au projet, du simple maintien technique à l'accompagnement continu.",
  },
  {
    q: "Pouvez-vous reprendre un site existant ?",
    a: "Oui. Selon l'état et la technologie du site, nous l'améliorons, le complétons ou le reconstruisons. Le diagnostic préalable sert précisément à trancher cette question honnêtement.",
  },
  {
    q: "L'intelligence artificielle est-elle obligatoire ?",
    a: "Pas du tout. Nous la proposons lorsqu'elle règle un problème concret — trop de questions répétitives, demandes hors horaires, qualification à faire. Si ce n'est pas votre cas, nous ne l'installons pas.",
  },
];

/* ------------------------------------------------- Pages métier détaillées --- */

export type Vertical = {
  slug: string;
  label: string;
  navLabel: string;
  metaTitle: string;
  metaDescription: string;
  hero: string;
  intro: string;
  problems: string[];
  solutions: { title: string; body: string }[];
  faq: { q: string; a: string }[];
  cta: string;
};

export const verticalPages: Vertical[] = [
  {
    slug: "restaurants",
    label: "Restaurants",
    navLabel: "Restaurants",
    metaTitle: "Création de site et solutions digitales pour restaurants",
    metaDescription:
      "Identité, menus, site, réservation, avis et fidélisation pour les restaurants en France et en Belgique. STAR DIGI PRO assemble les briques utiles à votre établissement.",
    hero: "De la première impression à la prochaine réservation.",
    intro:
      "Un restaurant se choisit en quelques secondes, souvent sur un téléphone, souvent à l'heure du repas. Tout ce qui ralentit ce moment — une carte illisible, un numéro qui sonne dans le vide, une photo floue — coûte une table.",
    problems: [
      "La carte n'est pas consultable correctement sur un téléphone.",
      "Les réservations passent uniquement par le téléphone, en plein service.",
      "Les photos et la fiche en ligne ne reflètent pas le niveau de la cuisine.",
      "Les avis ne sont ni sollicités ni suivis.",
    ],
    solutions: [
      {
        title: "Identité et carte",
        body: "Logo, univers visuel, carte imprimée et version digitale toujours à jour, lisible sans zoomer.",
      },
      {
        title: "Site et réservation",
        body: "Un site rapide qui présente le lieu, la carte et les horaires, avec une réservation accessible en trois gestes.",
      },
      {
        title: "Fiche en ligne et avis",
        body: "Mise à niveau de la fiche d'établissement, photos cohérentes, sollicitation d'avis automatisée après le repas.",
      },
      {
        title: "Fidélisation",
        body: "Base clients, offres de retour et messages saisonniers envoyés sans y penser.",
      },
    ],
    faq: [
      {
        q: "Peut-on garder notre système de réservation actuel ?",
        a: "Oui, s'il fonctionne. Nous l'intégrons proprement au site plutôt que d'imposer un changement d'outil sans raison.",
      },
      {
        q: "La carte change souvent, est-ce un problème ?",
        a: "Non, c'est prévu : la version digitale est conçue pour être modifiée par vos soins, sans nous solliciter.",
      },
    ],
    cta: "Auditer mon restaurant",
  },
  {
    slug: "barbers",
    label: "Barbers",
    navLabel: "Barber shops",
    metaTitle: "Site, réservation et fidélisation pour barber shops",
    metaDescription:
      "Identité, site, booking, rappels, avis et CRM pour les barber shops en France et en Belgique. Une image forte et un système qui tient le rythme.",
    hero: "Votre image attire. Votre système transforme et fidélise.",
    intro:
      "Le métier se joue autant sur Instagram qu'au fauteuil. L'image amène les demandes ; encore faut-il qu'elles se transforment en rendez-vous tenus, et que le client revienne dans trois semaines plutôt que dans trois mois.",
    problems: [
      "Les demandes arrivent en message privé et se perdent entre deux coupes.",
      "Les rendez-vous non honorés coûtent des créneaux entiers.",
      "Le compte social est soigné, mais il n'existe aucun point de chute.",
      "Rien n'est mis en place pour faire revenir un client satisfait.",
    ],
    solutions: [
      {
        title: "Identité et image",
        body: "Logo, univers visuel et gabarits pour publier vite sans casser la cohérence.",
      },
      {
        title: "Site et réservation",
        body: "Une page qui montre le travail et ouvre la réservation à toute heure, y compris quand le salon est fermé.",
      },
      {
        title: "Rappels automatiques",
        body: "Confirmation immédiate et rappel la veille : le moyen le plus simple de réduire les oublis.",
      },
      {
        title: "Avis et fidélisation",
        body: "Demande d'avis après la prestation, relance de retour et base clients exploitable.",
      },
    ],
    faq: [
      {
        q: "Faut-il un site si le compte Instagram fonctionne déjà bien ?",
        a: "Le compte attire, mais il ne prend pas les rendez-vous à votre place et ne vous appartient pas. Un point de chute que vous maîtrisez reste utile, même simple.",
      },
      {
        q: "Peut-on gérer plusieurs barbiers et des agendas distincts ?",
        a: "Oui. La réservation peut distinguer les praticiens, les prestations et leurs durées respectives.",
      },
    ],
    cta: "Auditer mon barber shop",
  },
  {
    slug: "beaute",
    label: "Beauté",
    navLabel: "Instituts de beauté",
    metaTitle: "Site et réservation pour instituts de beauté et spas",
    metaDescription:
      "Branding, site, prise de rendez-vous, offres, cartes cadeaux, rappels et CRM pour les instituts de beauté en France et en Belgique.",
    hero: "Une expérience premium avant même le rendez-vous.",
    intro:
      "Dans la beauté, la promesse se joue sur le ressenti. Si le parcours en ligne est confus ou daté, il contredit l'expérience proposée en cabine — et le doute s'installe avant la première visite.",
    problems: [
      "Le catalogue de soins est long et difficile à parcourir.",
      "Les cartes cadeaux se gèrent encore à la main.",
      "Les créneaux libres de dernière minute restent vides.",
      "Les clientes et clients ne reviennent pas faute de relance.",
    ],
    solutions: [
      {
        title: "Identité et univers",
        body: "Une direction visuelle cohérente, du logo aux supports en cabine, qui tient la promesse de l'enseigne.",
      },
      {
        title: "Site et prise de rendez-vous",
        body: "Des soins présentés clairement, avec durée et déroulé, et une réservation qui ne décourage personne.",
      },
      {
        title: "Offres et cartes cadeaux",
        body: "Coffrets, forfaits et cartes cadeaux vendus en ligne, sans gestion manuelle.",
      },
      {
        title: "Rappels et fidélisation",
        body: "Rappel avant le soin, message de suivi après, invitation à revenir au bon moment.",
      },
    ],
    faq: [
      {
        q: "Peut-on vendre des cartes cadeaux en ligne ?",
        a: "Oui, avec génération automatique du bon et suivi de son utilisation.",
      },
      {
        q: "Peut-on proposer des forfaits de plusieurs séances ?",
        a: "Oui. Forfaits, abonnements et cures se présentent et se réservent comme une prestation classique.",
      },
    ],
    cta: "Auditer mon activité beauté",
  },
  {
    slug: "automobile",
    label: "Automobile",
    navLabel: "Automobile",
    metaTitle: "Site premium et gestion des leads pour l'automobile",
    metaDescription:
      "Identité, site premium, catalogue véhicules, formulaires, WhatsApp, CRM et relances pour les professionnels de l'automobile en France et en Belgique.",
    hero: "Présentez vos véhicules et services avec le niveau d'image qu'ils méritent.",
    intro:
      "Un véhicule se vend d'abord en photo. Entre une annonce noyée dans une plateforme et une présentation soignée sur votre propre site, l'écart de perception — et de marge — est considérable.",
    problems: [
      "Les véhicules ne sont visibles que sur des plateformes, au milieu des concurrents.",
      "Les demandes arrivent par plusieurs canaux et se perdent.",
      "Un prospect non rappelé dans la journée est généralement un prospect perdu.",
      "La présentation ne reflète pas le niveau de gamme proposé.",
    ],
    solutions: [
      {
        title: "Image et identité",
        body: "Une direction visuelle sérieuse, qui inspire confiance sur un achat à plusieurs milliers d'euros.",
      },
      {
        title: "Site et catalogue",
        body: "Fiches véhicules ou prestations complètes, rapides à charger, avec photos mises en valeur.",
      },
      {
        title: "Captation des demandes",
        body: "Formulaires courts, WhatsApp et rappel immédiat, directement reliés au suivi commercial.",
      },
      {
        title: "CRM et relances",
        body: "Chaque demande tracée, chaque relance programmée, rien qui dépende de la mémoire de quelqu'un.",
      },
    ],
    faq: [
      {
        q: "Le catalogue peut-il se mettre à jour automatiquement ?",
        a: "Selon l'outil de gestion de stock utilisé, une synchronisation est souvent possible. C'est un point que nous vérifions au diagnostic.",
      },
      {
        q: "Cela concerne-t-il aussi les garages et carrosseries ?",
        a: "Oui. La logique est la même : présenter les prestations, capter les demandes et les suivre jusqu'au rendez-vous.",
      },
    ],
    cta: "Auditer mon activité automobile",
  },
];

export function getVertical(slug: string): Vertical | undefined {
  return verticalPages.find((v) => v.slug === slug);
}

/**
 * Univers visuel par secteur, repris de la charte.
 *
 * `accroche` est la formule officielle du secteur — à ne pas réécrire.
 * `photo` pointe vers le bandeau d'ambiance extrait de la planche de marque.
 *
 * ⚠ Ces images proviennent de vignettes de la charte (360 px de large à la
 * source) : elles donnent la direction photo mais ne sont pas des visuels de
 * production. À remplacer par de vraies photographies — voir BRAND.md.
 */
export const universVerticale: Record<
  string,
  { photo: string; accroche: string }
> = {
  restaurants: {
    photo: "/verticals/restaurants.jpg",
    accroche: "De la première envie à la réservation.",
  },
  barbers: {
    photo: "/verticals/barbers.jpg",
    accroche: "Une image forte. Un planning rempli.",
  },
  beaute: {
    photo: "/verticals/beaute.jpg",
    accroche: "Votre expérience commence avant le rendez-vous.",
  },
  automobile: {
    photo: "/verticals/automobile.jpg",
    accroche: "Une image à la hauteur de ce que vous vendez.",
  },
};
