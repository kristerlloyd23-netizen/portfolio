"use client";

import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from "react";
import {
  CONTACT_LIMITS,
  contactSchema,
  getContactFieldErrors,
  type ContactField,
  type ContactFieldErrors,
} from "@/lib/contact-schema";
import { ArrowRightIcon, CheckIcon } from "@/components/Icons";
import styles from "./ContactForm.module.css";

type Values = {
  name: string;
  email: string;
  subject: string;
  message: string;
  company: string;
};

const emptyValues: Values = { name: "", email: "", subject: "", message: "", company: "" };

type FormStatus = {
  type: "idle" | "submitting" | "success" | "error";
  message: string;
};

export function ContactForm() {
  const [values, setValues] = useState<Values>(emptyValues);
  const [errors, setErrors] = useState<ContactFieldErrors>({});
  const [status, setStatus] = useState<FormStatus>({ type: "idle", message: "" });
  const startedAt = useRef(0);

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  function updateValue(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const field = event.target.name as keyof Values;
    setValues((current) => ({ ...current, [field]: event.target.value }));
    if (field !== "company") {
      setErrors((current) => ({ ...current, [field]: undefined }));
    }
  }

  function focusFirstError(fieldErrors: ContactFieldErrors) {
    const first = (["name", "email", "subject", "message"] as ContactField[]).find(
      (field) => fieldErrors[field],
    );
    if (first) document.getElementById(`contact-${first}`)?.focus();
  }

  async function submitForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus({ type: "idle", message: "" });

    const payload = { ...values, startedAt: startedAt.current };
    const clientCheck = contactSchema.safeParse(payload);
    if (!clientCheck.success) {
      const fieldErrors = getContactFieldErrors(clientCheck.error);
      setErrors(fieldErrors);
      setStatus({ type: "error", message: "Please check the highlighted fields." });
      focusFirstError(fieldErrors);
      return;
    }

    setStatus({ type: "submitting", message: "Saving your message…" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = (await response.json()) as {
        error?: string;
        message?: string;
        id?: string;
        fieldErrors?: ContactFieldErrors;
      };

      if (!response.ok) {
        const fieldErrors = result.fieldErrors || {};
        setErrors(fieldErrors);
        setStatus({
          type: "error",
          message: result.error || "Your message could not be saved. Please use the email link.",
        });
        focusFirstError(fieldErrors);
        return;
      }

      setValues(emptyValues);
      setErrors({});
      startedAt.current = Date.now();
      setStatus({
        type: "success",
        message: `${result.message || "Your message has been saved."}${result.id ? ` Reference: ${result.id}.` : ""}`,
      });
    } catch {
      setStatus({
        type: "error",
        message:
          "The contact service could not be reached. Please try again or use the email link.",
      });
    }
  }

  const submitting = status.type === "submitting";

  return (
    <form onSubmit={submitForm} className={styles.form} noValidate>
      <div className={styles.honeypot} aria-hidden="true">
        <label htmlFor="contact-company">Company</label>
        <input
          id="contact-company"
          name="company"
          value={values.company}
          onChange={updateValue}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>
      <fieldset disabled={submitting}>
        <div className={styles.row}>
          <Field
            id="contact-name"
            label="Name"
            name="name"
            value={values.name}
            onChange={updateValue}
            error={errors.name}
            maxLength={CONTACT_LIMITS.name}
            autoComplete="name"
            required
          />
          <Field
            id="contact-email"
            label="Email"
            name="email"
            type="email"
            value={values.email}
            onChange={updateValue}
            error={errors.email}
            maxLength={CONTACT_LIMITS.email}
            autoComplete="email"
            required
          />
        </div>
        <Field
          id="contact-subject"
          label="Subject"
          name="subject"
          value={values.subject}
          onChange={updateValue}
          error={errors.subject}
          maxLength={CONTACT_LIMITS.subject}
          required
        />
        <div className={styles.field}>
          <label htmlFor="contact-message">Message</label>
          <textarea
            id="contact-message"
            name="message"
            rows={7}
            value={values.message}
            onChange={updateValue}
            maxLength={CONTACT_LIMITS.message}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? "contact-message-error" : "contact-message-hint"}
            required
          />
          <div className={styles.fieldMeta}>
            <span id="contact-message-hint">
              At least 20 characters. Please avoid sensitive information.
            </span>
            <span>
              {values.message.length}/{CONTACT_LIMITS.message}
            </span>
          </div>
          {errors.message ? (
            <p id="contact-message-error" className={styles.error}>
              {errors.message}
            </p>
          ) : null}
        </div>
        <div className={styles.submitRow}>
          <button type="submit" className="button buttonPrimary">
            {submitting ? "Saving…" : "Save message"} <ArrowRightIcon />
          </button>
          <p>Persistent storage is the success condition; no email delivery is implied.</p>
        </div>
      </fieldset>
      <div className={styles.statusRegion} aria-live="polite">
        {status.message ? (
          <p
            className={`${styles.status} ${status.type === "success" ? styles.success : ""} ${status.type === "error" ? styles.failure : ""}`}
            role={status.type === "error" ? "alert" : "status"}
          >
            {status.type === "success" ? <CheckIcon /> : null}
            {status.message}
          </p>
        ) : null}
      </div>
    </form>
  );
}

function Field({
  id,
  label,
  error,
  ...props
}: {
  id: string;
  label: string;
  name: "name" | "email" | "subject";
  type?: "text" | "email";
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  maxLength: number;
  autoComplete?: string;
  required?: boolean;
}) {
  return (
    <div className={styles.field}>
      <label htmlFor={id}>{label}</label>
      <input
        {...props}
        id={id}
        type={props.type || "text"}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
      />
      {error ? (
        <p id={`${id}-error`} className={styles.error}>
          {error}
        </p>
      ) : null}
    </div>
  );
}
