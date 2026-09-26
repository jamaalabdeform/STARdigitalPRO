"use server";

/**
 * Traitement du formulaire de contact.
 *
 * Parti pris : tant qu'aucune destination n'est configurée, le formulaire
 * l'annonce clairement au visiteur. Afficher « message envoyé » alors que rien
 * n'est transmis ferait perdre de vraies demandes — c'est le pire défaut
 * possible sur une page de contact.
 *
 * Pour l'activer, renseignez CONTACT_WEBHOOK_URL dans `.env.local` (voir
 * `.env.example`) : Formspree, Make, n8n, une route API maison ou un CRM.
 */

export type ContactState = {
  status: "idle" | "success" | "error" | "unconfigured";
  message: string;
  fieldErrors?: Partial<Record<ContactField, string>>;
  values?: Partial<Record<ContactField, string>>;
};

type ContactField =
  | "nom"
  | "entreprise"
  | "email"
  | "telephone"
  | "secteur"
  | "besoin"
  | "message";

export const initialContactState: ContactState = { status: "idle", message: "" };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function submitContact(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const get = (k: ContactField) => String(formData.get(k) ?? "").trim();

  const values = {
    nom: get("nom"),
    entreprise: get("entreprise"),
    email: get("email"),
    telephone: get("telephone"),
    secteur: get("secteur"),
    besoin: get("besoin"),
    message: get("message"),
  };

  /* Pot de miel : rempli uniquement par un robot. */
  if (String(formData.get("site") ?? "").length > 0) {
    return { status: "success", message: "Merci, votre demande est bien partie." };
  }

  const fieldErrors: Partial<Record<ContactField, string>> = {};

  if (values.nom.length < 2) fieldErrors.nom = "Indiquez votre nom.";
  if (!values.email && !values.telephone) {
    fieldErrors.email = "Laissez au moins un e-mail ou un téléphone.";
  } else if (values.email && !EMAIL_RE.test(values.email)) {
    fieldErrors.email = "Cette adresse e-mail semble incomplète.";
  }
  if (values.message.length > 4000) {
    fieldErrors.message = "Message trop long (4000 caractères maximum).";
  }

  if (Object.keys(fieldErrors).length > 0) {
    return {
      status: "error",
      message: "Quelques champs demandent une correction.",
      fieldErrors,
      values,
    };
  }

  const endpoint = process.env.CONTACT_WEBHOOK_URL;

  if (!endpoint) {
    console.warn(
      "[contact] CONTACT_WEBHOOK_URL absent : la demande n'a pas été transmise.",
      { entreprise: values.entreprise, secteur: values.secteur },
    );
    return {
      status: "unconfigured",
      message:
        "Le formulaire n'est pas encore relié à une destination. Configurez CONTACT_WEBHOOK_URL pour recevoir les demandes.",
      values,
    };
  }

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ ...values, source: "stardigipro.com" }),
    });

    if (!response.ok) {
      throw new Error(`Réponse ${response.status}`);
    }

    return {
      status: "success",
      message:
        "Merci, votre demande est bien arrivée. Nous revenons vers vous rapidement.",
    };
  } catch (error) {
    console.error("[contact] Échec de transmission :", error);
    return {
      status: "error",
      message:
        "L'envoi a échoué. Réessayez dans un instant, ou écrivez-nous directement.",
      values,
    };
  }
}
