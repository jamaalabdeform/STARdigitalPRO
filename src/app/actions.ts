"use server";

/**
 * Traitement du formulaire de contact.
 *
 * Destination, par ordre de priorité :
 *
 * 1. **E-mail via Resend** si RESEND_API_KEY est défini. Les demandes partent
 *    vers CONTACT_EMAIL_TO (par défaut contact@stipway.com), avec l'adresse du
 *    visiteur en « Répondre à ». Appel HTTP direct à l'API : aucune dépendance.
 * 2. **Webhook** si CONTACT_WEBHOOK_URL est défini (Make, n8n, CRM…).
 * 3. Sinon, le formulaire l'annonce clairement au visiteur. Afficher « message
 *    envoyé » alors que rien n'est transmis ferait perdre de vraies demandes —
 *    c'est le pire défaut possible sur une page de contact.
 *
 * Variables : voir `.env.example`.
 */

const DESTINATAIRE_PAR_DEFAUT = "contact@stipway.com";
/* Expéditeur de test fourni par Resend, utilisable sans domaine vérifié —
   uniquement vers l'adresse du compte Resend. À remplacer par une adresse du
   domaine une fois celui-ci vérifié (ex. « STAR DIGI PRO <site@stardigipro.com> »). */
const EXPEDITEUR_PAR_DEFAUT = "STAR DIGI PRO <onboarding@resend.dev>";

const LIBELLES: Record<ContactField, string> = {
  nom: "Nom",
  entreprise: "Entreprise",
  email: "E-mail",
  telephone: "Téléphone",
  secteur: "Secteur",
  besoin: "Besoin principal",
  message: "Message",
};

const echapper = (v: string) =>
  v
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

async function envoyerParEmail(
  cle: string,
  values: Record<ContactField, string>,
): Promise<void> {
  const lignes = (Object.keys(LIBELLES) as ContactField[]).filter(
    (k) => values[k],
  );

  const texte = lignes
    .map((k) => `${LIBELLES[k]} : ${values[k]}`)
    .join("\n");

  const html = `<table cellpadding="6" style="font-family:Arial,sans-serif;font-size:14px;border-collapse:collapse">${lignes
    .map(
      (k) =>
        `<tr><td style="color:#5c5c5c;vertical-align:top;white-space:nowrap">${LIBELLES[k]}</td><td style="color:#050505">${echapper(values[k]).replaceAll("\n", "<br>")}</td></tr>`,
    )
    .join("")}</table>`;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${cle}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: process.env.CONTACT_EMAIL_FROM || EXPEDITEUR_PAR_DEFAUT,
      to: [process.env.CONTACT_EMAIL_TO || DESTINATAIRE_PAR_DEFAUT],
      reply_to: values.email || undefined,
      subject: `Nouvelle demande — ${values.nom}${values.entreprise ? ` (${values.entreprise})` : ""}`,
      text: texte,
      html,
    }),
  });

  if (!response.ok) {
    throw new Error(`Resend ${response.status} : ${await response.text()}`);
  }
}

import type { ContactField, ContactState } from "@/lib/contact";

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

  const cleResend = process.env.RESEND_API_KEY;
  const endpoint = process.env.CONTACT_WEBHOOK_URL;

  if (!cleResend && !endpoint) {
    console.warn(
      "[contact] Ni RESEND_API_KEY ni CONTACT_WEBHOOK_URL : la demande n'a pas été transmise.",
      { entreprise: values.entreprise, secteur: values.secteur },
    );
    return {
      status: "unconfigured",
      message:
        "Le formulaire n'est pas encore relié à une destination. Écrivez-nous sur WhatsApp en attendant.",
      values,
    };
  }

  if (cleResend) {
    try {
      await envoyerParEmail(cleResend, values);
      return {
        status: "success",
        message:
          "Merci, votre demande est bien arrivée. Nous revenons vers vous rapidement.",
      };
    } catch (error) {
      console.error("[contact] Échec de l'envoi par e-mail :", error);
      return {
        status: "error",
        message:
          "L'envoi a échoué. Réessayez dans un instant, ou écrivez-nous sur WhatsApp.",
        values,
      };
    }
  }

  try {
    const response = await fetch(endpoint as string, {
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
