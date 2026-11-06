export function hasAllowedOrigin(request: Request): boolean {
  const origin = request.headers.get("origin");
  if (!origin) return true;

  try {
    const originHost = new URL(origin).host;
    const allowedHosts = new Set(
      [
        request.headers.get("host"),
        request.headers.get("x-forwarded-host"),
        process.env.NEXT_PUBLIC_SITE_URL ? new URL(process.env.NEXT_PUBLIC_SITE_URL).host : null,
      ].filter((value): value is string => Boolean(value)),
    );
    return allowedHosts.has(originHost);
  } catch {
    return false;
  }
}
