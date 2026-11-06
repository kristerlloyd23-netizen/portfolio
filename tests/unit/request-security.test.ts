import { describe, expect, it } from "vitest";
import { hasAllowedOrigin } from "@/lib/request-security";

function request(origin?: string, forwardedHost?: string) {
  const headers = new Headers({ host: "localhost:3000" });
  if (origin) headers.set("origin", origin);
  if (forwardedHost) headers.set("x-forwarded-host", forwardedHost);
  return new Request("http://localhost:3000/api/contact", { headers });
}

describe("request origin validation", () => {
  it("allows same-origin and non-browser requests", () => {
    expect(hasAllowedOrigin(request("http://localhost:3000"))).toBe(true);
    expect(hasAllowedOrigin(request())).toBe(true);
  });

  it("allows the forwarded preview host", () => {
    expect(hasAllowedOrigin(request("https://preview.example", "preview.example"))).toBe(true);
  });

  it("rejects cross-origin and malformed origins", () => {
    expect(hasAllowedOrigin(request("https://attacker.example"))).toBe(false);
    expect(hasAllowedOrigin(request("not a URL"))).toBe(false);
  });
});
