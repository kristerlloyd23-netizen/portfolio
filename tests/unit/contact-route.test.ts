import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { POST } from "@/app/api/contact/route";
import { CONTACT_LIMITS } from "@/lib/contact-schema";
import { resetContactStoreForTests } from "@/lib/contact-store";
import { resetRateLimiter } from "@/lib/rate-limit";

let directory: string;
const originalEnvironment = { ...process.env };

const valid = {
  name: "QA Reviewer",
  email: "qa@example.test",
  subject: "Route integration",
  message: "This is a route integration message with no personal data.",
  company: "",
  startedAt: Date.now() - 5000,
};

function request(
  body: unknown,
  options: { contentType?: string; origin?: string; ip?: string } = {},
) {
  const headers = new Headers({
    "content-type": options.contentType || "application/json",
    host: "localhost:3000",
    "x-forwarded-for": options.ip || "203.0.113.10",
  });
  if (options.origin) headers.set("origin", options.origin);
  return new Request("http://localhost:3000/api/contact", {
    method: "POST",
    headers,
    body: typeof body === "string" ? body : JSON.stringify(body),
  });
}

beforeEach(async () => {
  directory = await mkdtemp(path.join(tmpdir(), "portfolio-route-"));
  process.env.CONTACT_STORAGE = "file";
  process.env.CONTACT_DATA_DIR = directory;
  delete process.env.DATABASE_URL;
  resetContactStoreForTests();
  resetRateLimiter();
});

afterEach(async () => {
  process.env = { ...originalEnvironment };
  resetContactStoreForTests();
  resetRateLimiter();
  await rm(directory, { recursive: true, force: true });
});

describe("POST /api/contact", () => {
  it("persists a valid message before returning 201", async () => {
    const response = await POST(request(valid));
    expect(response.status).toBe(201);
    const result = await response.json();
    expect(result.ok).toBe(true);
    expect(result.id).toBeTruthy();
    const persisted = await readFile(path.join(directory, "contact-messages.jsonl"), "utf8");
    expect(persisted).toContain("Route integration");
  });

  it("returns field errors for invalid input", async () => {
    const response = await POST(request({ ...valid, email: "invalid" }));
    expect(response.status).toBe(400);
    const result = await response.json();
    expect(result.fieldErrors.email).toBeTruthy();
  });

  it("rejects malformed JSON and unsupported content types", async () => {
    expect((await POST(request("{broken"))).status).toBe(400);
    expect((await POST(request(valid, { contentType: "text/plain" }))).status).toBe(415);
  });

  it("rejects oversized request bodies before parsing", async () => {
    const response = await POST(request(`"${"x".repeat(CONTACT_LIMITS.requestBytes)}"`));
    expect(response.status).toBe(413);
  });

  it("rejects cross-origin requests", async () => {
    const response = await POST(request(valid, { origin: "https://attacker.example" }));
    expect(response.status).toBe(403);
  });

  it("rejects instant and honeypot submissions", async () => {
    expect((await POST(request({ ...valid, startedAt: Date.now() }))).status).toBe(400);
    expect((await POST(request({ ...valid, company: "Spam bot" }))).status).toBe(400);
  });

  it("enforces the configured rate limit", async () => {
    process.env.CONTACT_RATE_LIMIT_MAX = "2";
    expect((await POST(request(valid))).status).toBe(201);
    expect((await POST(request(valid))).status).toBe(201);
    const response = await POST(request(valid));
    expect(response.status).toBe(429);
    expect(response.headers.get("Retry-After")).toBeTruthy();
  });

  it("returns 500 instead of success when persistence fails", async () => {
    const blockedPath = path.join(directory, "not-a-directory");
    await writeFile(blockedPath, "blocked");
    process.env.CONTACT_DATA_DIR = blockedPath;
    resetContactStoreForTests();
    const response = await POST(request(valid));
    expect(response.status).toBe(500);
    const result = await response.json();
    expect(result.ok).toBe(false);
  });

  it("returns 503 instead of success when production storage is unavailable", async () => {
    vi.stubEnv("NODE_ENV", "production");
    delete process.env.CONTACT_STORAGE;
    resetContactStoreForTests();
    const response = await POST(request(valid));
    expect(response.status).toBe(503);
    const result = await response.json();
    expect(result.ok).toBe(false);
  });
});
