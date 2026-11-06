export const projectCategories = [
  "All",
  "Android Development",
  "Software Engineering",
  "Tools and Experiments",
] as const;

export type ProjectCategory = Exclude<(typeof projectCategories)[number], "All">;

export type Project = {
  slug: string;
  title: string;
  summary: string;
  categories: readonly ProjectCategory[];
  technologies: readonly string[];
  status: string;
  featured: boolean;
  icon?: string;
  iconAlt?: string;
  caseStudyHref?: string;
  repositoryUrl?: string;
  releaseUrl?: string;
};

export const projects: readonly Project[] = [
  {
    slug: "sarisaripos",
    title: "SariSariPOS",
    summary:
      "An offline-first Android point-of-sale and inventory project designed around neighborhood sari-sari store workflows.",
    categories: ["Android Development", "Software Engineering"],
    technologies: ["Kotlin", "Jetpack Compose", "Room", "SQLite", "WorkManager"],
    status: "Source reviewed · 8 owner captures · Runtime limits noted",
    featured: true,
    icon: "/projects/sarisaripos-icon.png",
    iconAlt: "SariSariPOS launcher icon showing a small neighborhood store",
    caseStudyHref: "/projects/sarisaripos",
    repositoryUrl: "https://github.com/kristerlloyd23-netizen/SariSariPOS",
    releaseUrl: "https://github.com/kristerlloyd23-netizen/SariSariPOS/releases/tag/v1.0.0",
  },
  {
    slug: "developer-portfolio",
    title: "Editorial Developer Portfolio",
    summary:
      "This website: a responsive, evidence-led portfolio with a server-validated contact workflow and PostgreSQL production storage option.",
    categories: ["Software Engineering"],
    technologies: ["Next.js", "React", "TypeScript", "Zod", "PostgreSQL"],
    status: "Implemented for this portfolio · This website",
    featured: false,
    caseStudyHref: "/about#portfolio-build",
  },
] as const;

export const flagshipProject = projects[0]!;
