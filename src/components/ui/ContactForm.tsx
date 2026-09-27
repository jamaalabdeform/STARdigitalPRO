"use client";

import { useActionState, useId } from "react";
import { submitContact, initialContactState } from "@/app/actions";
import { verticals } from "@/lib/site";

const besoins = [
  "Identité visuelle / logo",
  "Supports graphiques / print",
  "Site internet",
  "E-commerce / catalogue",
  "Réservation / prise de rendez-vous",
  "CRM / suivi des demandes",
  "Automatisation",
  "IA / Jawabot",
  "Je ne sais pas encore",
];

export function ContactForm() {
  const [state, formAction, pending] = useActionState(
    submitContact,
    initialContactState,
  );
  const uid = useId();
  const v = state.values ?? {};

  if (state.status === "success") {
    return (
      <div className="border border-noir/15 bg-gris-clair p-8">
        <p className="h-section text-[22px] text-noir">Demande reçue.</p>
        <p className="mt-3 max-w-[52ch] text-[15px] leading-relaxed text-graphite/80">
          {state.message}
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="flex min-w-0 flex-col gap-5" noValidate>
      {/* Pot de miel : masqué aux humains, invisible aux lecteurs d'écran. */}
      <div className="absolute left-[-9999px]" aria-hidden="true">
        <label htmlFor={`${uid}-site`}>Ne pas remplir</label>
        <input id={`${uid}-site`} name="site" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid min-w-0 gap-5 sm:grid-cols-2">
        <Field
          id={`${uid}-nom`}
          name="nom"
          label="Nom"
          required
          autoComplete="name"
          defaultValue={v.nom}
          error={state.fieldErrors?.nom}
        />
        <Field
          id={`${uid}-entreprise`}
          name="entreprise"
          label="Entreprise"
          autoComplete="organization"
          defaultValue={v.entreprise}
        />
        <Field
          id={`${uid}-email`}
          name="email"
          label="E-mail"
          type="email"
          autoComplete="email"
          defaultValue={v.email}
          error={state.fieldErrors?.email}
        />
        <Field
          id={`${uid}-telephone`}
          name="telephone"
          label="Téléphone"
          type="tel"
          autoComplete="tel"
          defaultValue={v.telephone}
        />

        <Select
          id={`${uid}-secteur`}
          name="secteur"
          label="Secteur"
          defaultValue={v.secteur}
          options={[
            ...verticals.map((x) => x.navLabel),
            "Boutique / commerce",
            "Artisan",
            "Autre activité",
          ]}
        />
        <Select
          id={`${uid}-besoin`}
          name="besoin"
          label="Besoin principal"
          defaultValue={v.besoin}
          options={besoins}
        />
      </div>

      <div className="flex min-w-0 flex-col gap-2">
        <label
          htmlFor={`${uid}-message`}
          className="text-[13px] font-medium text-graphite"
        >
          Votre projet en quelques lignes
        </label>
        <textarea
          id={`${uid}-message`}
          name="message"
          rows={5}
          defaultValue={v.message}
          placeholder="Votre activité, ce qui fonctionne, ce que vous aimeriez améliorer."
          className={`${controlClass} resize-y`}
        />
        {state.fieldErrors?.message ? (
          <p className="text-[12.5px] text-alerte">{state.fieldErrors.message}</p>
        ) : null}
      </div>

      {state.status === "error" || state.status === "unconfigured" ? (
        <p
          role="alert"
          className="border border-alerte/40 bg-alerte/10 px-4 py-3 text-[13.5px] leading-relaxed text-noir"
        >
          {state.message}
        </p>
      ) : null}

      <div className="flex flex-wrap items-center gap-4 pt-1">
        <button
          type="submit"
          disabled={pending}
          className="inline-flex items-center justify-center gap-3 border border-noir bg-noir px-7 py-4 text-[15px] font-medium text-blanc transition-colors duration-500 hover:bg-transparent hover:text-noir disabled:cursor-not-allowed disabled:opacity-60"
        >
          {pending ? "Envoi en cours…" : "Envoyer ma demande"}
        </button>
        <p className="text-[12.5px] text-plomb">
          Réponse sous un jour ouvré. Aucune donnée transmise à des tiers.
        </p>
      </div>
    </form>
  );
}

/* ------------------------------------------------------------------------- */

/* `min-w-0` est indispensable sur les contrôles : sans lui, un <select> impose
   comme largeur minimale celle de son option la plus longue, ce qui élargit la
   piste de grille et fait déborder toute la colonne sur petit écran. */
const controlClass =
  "w-full min-w-0 border border-noir/18 bg-blanc px-4 py-3 text-[15px] text-noir outline-none transition-colors duration-300 placeholder:text-plomb/70 focus:border-noir";

function Field({
  id,
  name,
  label,
  error,
  required = false,
  type = "text",
  autoComplete,
  defaultValue,
}: {
  id: string;
  name: string;
  label: string;
  error?: string;
  required?: boolean;
  type?: string;
  autoComplete?: string;
  defaultValue?: string;
}) {
  return (
    <div className="flex min-w-0 flex-col gap-2">
      <label htmlFor={id} className="text-[13px] font-medium text-graphite">
        {label}
        {required ? <span className="text-alerte"> *</span> : null}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        autoComplete={autoComplete}
        defaultValue={defaultValue}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-err` : undefined}
        className={`${controlClass} ${error ? "border-alerte" : ""}`}
      />
      {error ? (
        <p id={`${id}-err`} className="text-[12.5px] text-alerte">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function Select({
  id,
  name,
  label,
  options,
  defaultValue,
}: {
  id: string;
  name: string;
  label: string;
  options: string[];
  defaultValue?: string;
}) {
  return (
    <div className="flex min-w-0 flex-col gap-2">
      <label htmlFor={id} className="text-[13px] font-medium text-graphite">
        {label}
      </label>
      <select
        id={id}
        name={name}
        defaultValue={defaultValue ?? ""}
        className={`${controlClass} appearance-none bg-[length:12px] bg-[right_1rem_center] bg-no-repeat pr-10`}
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 12' fill='none' stroke='%237A838F' stroke-width='1.6' stroke-linecap='round'%3E%3Cpath d='M3 4.5 6 7.5 9 4.5'/%3E%3C/svg%3E\")",
        }}
      >
        <option value="">Sélectionner…</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}
