import type { Metadata } from "next";

const developmentUrl = "http://localhost:3000";

export function getSiteUrl() {
  const candidate = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || developmentUrl;
  try {
    return new URL(candidate).origin;
  } catch {
    return developmentUrl;
  }
}

export function absoluteUrl(path: string) {
  return new URL(path, `${getSiteUrl()}/`).toString();
}

export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      title,
      description,
      url: path,
      siteName: "Krister Lloyd Magalso",
      images: [{ url: "/og.png", width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og.png"],
    },
  };
}
