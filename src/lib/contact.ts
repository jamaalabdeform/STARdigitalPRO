/**
 * Types et état initial du formulaire de contact.
 *
 * Séparés de `app/actions.ts` : un fichier « use server » ne peut exporter que
 * des fonctions asynchrones. Y exporter `initialContactState` (un objet) faisait
 * échouer chaque envoi du formulaire côté serveur.
 */

export type ContactState = {
  status: "idle" | "success" | "error" | "unconfigured";
  message: string;
  fieldErrors?: Partial<Record<ContactField, string>>;
  values?: Partial<Record<ContactField, string>>;
};

export type ContactField =
  | "nom"
  | "entreprise"
  | "email"
  | "telephone"
  | "secteur"
  | "besoin"
  | "message";

export const initialContactState: ContactState = { status: "idle", message: "" };
