export type SkillGroup = {
  title: string;
  description: string;
  items: readonly string[];
};

export const androidSkillGroups: readonly SkillGroup[] = [
  {
    title: "Language, UI, and architecture",
    description: "Confirmed in the supplied Android project source and configuration.",
    items: [
      "Kotlin 1.9.22",
      "Jetpack Compose",
      "Material 3",
      "AndroidX Lifecycle",
      "ViewModel",
      "Navigation Compose",
    ],
  },
  {
    title: "Database and local storage",
    description: "Local-first persistence and migration evidence.",
    items: [
      "Room 2.6.1",
      "Local SQLite",
      "Room migrations through schema version 3",
      "Room FTS4 assistant retrieval",
      "App-private product-image storage",
      "Image paths and attribution records",
    ],
  },
  {
    title: "Device and API integrations",
    description: "Implementation evidence; live end-to-end behavior remains separately verified.",
    items: [
      "CameraX 1.3.1",
      "Google ML Kit Barcode Scanning 17.2.0",
      "Android Photo Picker",
      "ExifInterface",
      "Open Food Facts lookup",
      "Gemini Developer API client",
      "Private HTTPS assistant endpoint support",
    ],
  },
  {
    title: "Background work and testing environment",
    description:
      "Versions belong to the supplied project configuration, not a latest-version claim.",
    items: [
      "WorkManager 2.9.0",
      "JDK 17",
      "Android SDK Platform 34 / Build Tools 34.0.0",
      "Gradle 8.5 / Android Gradle Plugin 8.2.2",
      "KSP 1.9.22-1.0.17",
      "JUnit 4.13.2",
      "Android Lint",
      "Minimum SDK 24 / Target SDK 34",
    ],
  },
] as const;

export const portfolioWebSkills: readonly string[] = [
  "Next.js App Router",
  "React Server and Client Components",
  "Strict TypeScript",
  "CSS design tokens and CSS Modules",
  "Zod server-side validation",
  "PostgreSQL contact-message persistence",
  "Postgres.js parameterized queries",
  "Vitest and Playwright",
  "Automated axe accessibility checks",
] as const;

export const professionalSupportSkills: readonly string[] = [
  "Basic hardware and software troubleshooting",
  "Workstation and user support",
  "Network connectivity checks",
  "Audiovisual equipment installation and testing",
  "On-site technical assistance",
  "Routine IT maintenance",
] as const;
