import { describe, expect, it } from "vitest";
import { CONTACT_LIMITS, contactSchema, getContactFieldErrors } from "@/lib/contact-schema";

const valid = {
  name: "  QA Reviewer  ",
  email: "  QA@EXAMPLE.TEST ",
  subject: "  Portfolio feedback  ",
  message: "  This is a sufficiently detailed test message.\r\nSecond line.  ",
  company: "",
  startedAt: 1_700_000_000_000,
};

describe("contactSchema", () => {
  it("normalizes a valid submission", () => {
    const result = contactSchema.parse(valid);
    expect(result).toEqual({
      name: "QA Reviewer",
      email: "qa@example.test",
      subject: "Portfolio feedback",
      message: "This is a sufficiently detailed test message.\nSecond line.",
      company: "",
      startedAt: valid.startedAt,
    });
  });

  it("rejects an invalid email and returns a field error", () => {
    const result = contactSchema.safeParse({ ...valid, email: "not-an-email" });
    expect(result.success).toBe(false);
    if (!result.success) expect(getContactFieldErrors(result.error).email).toBeTruthy();
  });

  it("rejects short required content", () => {
    expect(contactSchema.safeParse({ ...valid, name: "A" }).success).toBe(false);
    expect(contactSchema.safeParse({ ...valid, subject: " " }).success).toBe(false);
    expect(contactSchema.safeParse({ ...valid, message: "Too short" }).success).toBe(false);
  });

  it("enforces maximum field lengths", () => {
    expect(
      contactSchema.safeParse({ ...valid, name: "x".repeat(CONTACT_LIMITS.name + 1) }).success,
    ).toBe(false);
    expect(
      contactSchema.safeParse({ ...valid, subject: "x".repeat(CONTACT_LIMITS.subject + 1) })
        .success,
    ).toBe(false);
    expect(
      contactSchema.safeParse({ ...valid, message: "x".repeat(CONTACT_LIMITS.message + 1) })
        .success,
    ).toBe(false);
  });

  it("rejects null characters in messages", () => {
    expect(
      contactSchema.safeParse({ ...valid, message: "A valid length message\0with null" }).success,
    ).toBe(false);
  });

  it("requires a positive form start timestamp", () => {
    expect(contactSchema.safeParse({ ...valid, startedAt: 0 }).success).toBe(false);
    expect(contactSchema.safeParse({ ...valid, startedAt: undefined }).success).toBe(false);
  });
});
