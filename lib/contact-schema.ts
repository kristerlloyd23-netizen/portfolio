import { z } from "zod";

const normalizeText = (value: string) => value.replace(/\r\n?/g, "\n").trim();

export const CONTACT_LIMITS = {
  name: 80,
  email: 254,
  subject: 120,
  message: 4000,
  requestBytes: 16_000,
} as const;

export const contactSchema = z.object({
  name: z
    .string()
    .transform(normalizeText)
    .pipe(z.string().min(2, "Please enter your name.").max(CONTACT_LIMITS.name)),
  email: z
    .string()
    .trim()
    .max(CONTACT_LIMITS.email)
    .email("Please enter a valid email address.")
    .toLowerCase(),
  subject: z
    .string()
    .transform(normalizeText)
    .pipe(z.string().min(2, "Please add a subject.").max(CONTACT_LIMITS.subject)),
  message: z
    .string()
    .transform(normalizeText)
    .pipe(
      z
        .string()
        .min(20, "Please include at least 20 characters.")
        .max(CONTACT_LIMITS.message)
        .refine((value) => !value.includes("\0"), "The message contains an invalid character."),
    ),
  company: z.string().max(200).optional().default(""),
  startedAt: z.number().int().positive(),
});

export type ContactInput = z.input<typeof contactSchema>;
export type ContactPayload = z.output<typeof contactSchema>;
export type ContactDetails = Omit<ContactPayload, "company" | "startedAt">;

export type ContactField = "name" | "email" | "subject" | "message";
export type ContactFieldErrors = Partial<Record<ContactField, string>>;

export function getContactFieldErrors(error: z.ZodError): ContactFieldErrors {
  const errors: ContactFieldErrors = {};
  for (const issue of error.issues) {
    const field = issue.path[0];
    if (
      (field === "name" || field === "email" || field === "subject" || field === "message") &&
      !errors[field]
    ) {
      errors[field] = issue.message;
    }
  }
  return errors;
}
