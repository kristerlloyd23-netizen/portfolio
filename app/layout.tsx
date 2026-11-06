import type { Metadata } from "next";
import { IBM_Plex_Mono, Inter, Newsreader } from "next/font/google";
import { education, profile } from "@/content/profile";
import { getSiteUrl } from "@/lib/site";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
  display: "swap",
});
const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-ibm-plex-mono",
  display: "swap",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: "Krister Lloyd Magalso — Android & Software Developer",
    template: "%s | Krister Lloyd Magalso",
  },
  description: profile.introduction,
  applicationName: "Krister Lloyd Magalso — Engineering Portfolio",
  authors: [{ name: profile.name, url: getSiteUrl() }],
  creator: profile.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    title: "Krister Lloyd Magalso — Android & Software Developer",
    description: profile.introduction,
    url: "/",
    siteName: profile.name,
    images: [{ url: "/og.png", width: 1200, height: 630, alt: profile.headline }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Krister Lloyd Magalso — Android & Software Developer",
    description: profile.introduction,
    images: ["/og.png"],
  },
};

const themeScript = `
  document.documentElement.classList.add('js');
  try {
    const theme = localStorage.getItem('klm-theme');
    if (theme === 'light' || theme === 'dark') {
      document.documentElement.dataset.theme = theme;
      document.documentElement.style.colorScheme = theme;
    }
  } catch {}
`;

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  url: getSiteUrl(),
  address: { "@type": "PostalAddress", addressLocality: "Caloocan City", addressCountry: "PH" },
  alumniOf: { "@type": "CollegeOrUniversity", name: education.school },
  sameAs: [profile.github],
  knowsAbout: ["Kotlin", "Android development", "Offline-first applications", "IT support"],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-theme="dark" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c"),
          }}
        />
      </head>
      <body className={`${inter.variable} ${newsreader.variable} ${plexMono.variable}`}>
        <a href="#main-content" className="skipLink">
          Skip to main content
        </a>
        <SiteHeader />
        <main id="main-content">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
