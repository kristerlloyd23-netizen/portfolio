type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();

function positiveInteger(value: string | undefined, fallback: number) {
  const parsed = Number(value);
  return Number.isSafeInteger(parsed) && parsed > 0 ? parsed : fallback;
}

export function rateLimitConfiguration() {
  return {
    limit: positiveInteger(process.env.CONTACT_RATE_LIMIT_MAX, 5),
    windowMs: positiveInteger(process.env.CONTACT_RATE_LIMIT_WINDOW_MS, 600_000),
  };
}

export function checkRateLimit(
  key: string,
  now = Date.now(),
  configuration = rateLimitConfiguration(),
): { allowed: boolean; retryAfterSeconds: number } {
  if (buckets.size > 5000) {
    for (const [bucketKey, bucket] of buckets) {
      if (bucket.resetAt <= now) buckets.delete(bucketKey);
    }
  }

  const existing = buckets.get(key);
  if (!existing || existing.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + configuration.windowMs });
    return { allowed: true, retryAfterSeconds: 0 };
  }

  if (existing.count >= configuration.limit) {
    return {
      allowed: false,
      retryAfterSeconds: Math.max(1, Math.ceil((existing.resetAt - now) / 1000)),
    };
  }

  existing.count += 1;
  return { allowed: true, retryAfterSeconds: 0 };
}

export function resetRateLimiter() {
  buckets.clear();
}

export function requestRateLimitKey(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return forwarded || request.headers.get("x-real-ip")?.trim() || "local-request";
}
