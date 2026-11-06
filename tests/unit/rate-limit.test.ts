import { beforeEach, describe, expect, it } from "vitest";
import { checkRateLimit, resetRateLimiter } from "@/lib/rate-limit";

const configuration = { limit: 2, windowMs: 1000 };

describe("contact rate limiter", () => {
  beforeEach(() => resetRateLimiter());

  it("allows requests within the configured window limit", () => {
    expect(checkRateLimit("qa", 1000, configuration).allowed).toBe(true);
    expect(checkRateLimit("qa", 1001, configuration).allowed).toBe(true);
  });

  it("rejects excess requests and supplies a retry delay", () => {
    checkRateLimit("qa", 1000, configuration);
    checkRateLimit("qa", 1001, configuration);
    const result = checkRateLimit("qa", 1100, configuration);
    expect(result.allowed).toBe(false);
    expect(result.retryAfterSeconds).toBe(1);
  });

  it("starts a new window after expiration", () => {
    checkRateLimit("qa", 1000, configuration);
    checkRateLimit("qa", 1001, configuration);
    expect(checkRateLimit("qa", 2001, configuration).allowed).toBe(true);
  });

  it("keeps request keys independent", () => {
    checkRateLimit("one", 1000, configuration);
    checkRateLimit("one", 1000, configuration);
    expect(checkRateLimit("two", 1000, configuration).allowed).toBe(true);
  });
});
