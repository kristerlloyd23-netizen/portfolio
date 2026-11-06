import { CONTACT_LIMITS, contactSchema, getContactFieldErrors } from "@/lib/contact-schema";
import { ContactStoreUnavailableError, getContactStore } from "@/lib/contact-store";
import { checkRateLimit, requestRateLimitKey } from "@/lib/rate-limit";
import { hasAllowedOrigin } from "@/lib/request-security";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function json(status: number, body: Record<string, unknown>, headers?: HeadersInit) {
  return Response.json(body, { status, headers });
}

export async function POST(request: Request) {
  if (!hasAllowedOrigin(request)) {
    return json(403, { ok: false, error: "This request could not be verified." });
  }

  const contentType = request.headers.get("content-type")?.toLowerCase() || "";
  if (!contentType.startsWith("application/json")) {
    return json(415, { ok: false, error: "Please submit the form using JSON." });
  }

  const declaredLength = Number(request.headers.get("content-length") || 0);
  if (declaredLength > CONTACT_LIMITS.requestBytes) {
    return json(413, { ok: false, error: "The submitted message is too large." });
  }

  let rawBody: string;
  try {
    rawBody = await request.text();
  } catch {
    return json(400, { ok: false, error: "The request could not be read." });
  }

  if (new TextEncoder().encode(rawBody).length > CONTACT_LIMITS.requestBytes) {
    return json(413, { ok: false, error: "The submitted message is too large." });
  }

  let body: unknown;
  try {
    body = JSON.parse(rawBody);
  } catch {
    return json(400, { ok: false, error: "The request contained invalid JSON." });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return json(400, {
      ok: false,
      error: "Please check the highlighted fields and try again.",
      fieldErrors: getContactFieldErrors(parsed.error),
    });
  }

  const { company, startedAt, ...details } = parsed.data;
  const elapsed = Date.now() - startedAt;
  if (company || elapsed < 1500 || elapsed > 2 * 60 * 60 * 1000) {
    return json(400, {
      ok: false,
      error: "The form could not be processed. Please refresh and try again.",
    });
  }

  const rateLimit = checkRateLimit(requestRateLimitKey(request));
  if (!rateLimit.allowed) {
    return json(
      429,
      { ok: false, error: "Too many attempts. Please wait before trying again." },
      { "Retry-After": String(rateLimit.retryAfterSeconds) },
    );
  }

  try {
    const record = await getContactStore().save(details);
    return json(201, {
      ok: true,
      id: record.id,
      message: "Your message has been saved for follow-up.",
    });
  } catch (error) {
    if (error instanceof ContactStoreUnavailableError) {
      return json(503, {
        ok: false,
        error: "Message storage is not configured yet. Please use the email link instead.",
      });
    }
    return json(500, {
      ok: false,
      error: "Your message could not be saved. Please try again or use the email link.",
    });
  }
}
