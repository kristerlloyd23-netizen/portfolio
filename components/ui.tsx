import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import type { Project } from "@/content/projects";
import { ArrowRightIcon, ArrowUpRightIcon } from "@/components/Icons";
import styles from "./ui.module.css";

export function SectionHeading({
  eyebrow,
  title,
  description,
  id,
  level = 2,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  id?: string;
  level?: 1 | 2;
}) {
  const Heading = level === 1 ? "h1" : "h2";
  return (
    <div className={styles.sectionHeading}>
      <p className={styles.eyebrow}>{eyebrow}</p>
      <Heading id={id}>{title}</Heading>
      {description ? <p className={styles.sectionDescription}>{description}</p> : null}
    </div>
  );
}

export function EvidenceBadge({
  children,
  tone = "sage",
}: {
  children: ReactNode;
  tone?: "sage" | "amber" | "neutral";
}) {
  return <span className={`${styles.badge} ${styles[`badge_${tone}`]}`}>{children}</span>;
}

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article
      className={`${styles.projectCard} ${project.featured ? styles.projectCardFeatured : ""}`}
    >
      <div className={styles.projectVisual}>
        {project.icon ? (
          <div className={styles.projectIconWrap}>
            <Image
              src={project.icon}
              alt={project.iconAlt || ""}
              width={192}
              height={192}
              className={styles.projectIcon}
              priority={project.featured}
            />
          </div>
        ) : (
          <div className={styles.portfolioMark} aria-hidden="true">
            <span>KLM</span>
            <small>WEB / 2026</small>
          </div>
        )}
        <span className={styles.projectIndex}>{project.featured ? "01" : "02"}</span>
      </div>
      <div className={styles.projectBody}>
        <div className={styles.projectCategories}>
          {project.categories.map((category) => (
            <span key={category}>{category}</span>
          ))}
        </div>
        <h3>{project.title}</h3>
        <p>{project.summary}</p>
        <ul className={styles.technologyList} aria-label={`${project.title} technologies`}>
          {project.technologies.map((technology) => (
            <li key={technology}>{technology}</li>
          ))}
        </ul>
        <p className={styles.projectStatus}>{project.status}</p>
        <div className={styles.projectLinks}>
          {project.caseStudyHref ? (
            <Link href={project.caseStudyHref} className={styles.textLink}>
              {project.slug === "developer-portfolio" ? "About this build" : "Read case study"}
              <ArrowRightIcon />
            </Link>
          ) : null}
          {project.repositoryUrl ? (
            <a
              href={project.repositoryUrl}
              target="_blank"
              rel="noreferrer"
              className={styles.textLink}
            >
              Source <ArrowUpRightIcon />
            </a>
          ) : null}
          {project.releaseUrl ? (
            <a
              href={project.releaseUrl}
              target="_blank"
              rel="noreferrer"
              className={styles.textLink}
            >
              Debug release <ArrowUpRightIcon />
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}

export function AppScreenshot({
  src,
  title,
  description,
  alt,
  meta,
  compact = false,
}: {
  src: string;
  title: string;
  description: string;
  alt: string;
  meta: string;
  compact?: boolean;
}) {
  return (
    <figure className={`${styles.appScreenshot} ${compact ? styles.mediaCompact : ""}`}>
      <a
        href={src}
        target="_blank"
        rel="noreferrer"
        className={styles.screenshotFrame}
        aria-label={`Open full-size capture: ${title}`}
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority={compact}
          sizes={compact ? "(max-width: 960px) 100vw, 480px" : "(max-width: 760px) 100vw, 480px"}
          className={styles.screenshotImage}
        />
        <span className={styles.screenshotOpen} aria-hidden="true">
          FULL CAPTURE ↗
        </span>
      </a>
      <figcaption>
        <strong>{title}</strong>
        <span>{description}</span>
        <code>{meta}</code>
      </figcaption>
    </figure>
  );
}

export function ArchitectureDiagram() {
  return (
    <figure className={styles.architecture} aria-labelledby="architecture-caption">
      <div className={styles.architectureFlow}>
        <section className={styles.architectureNode}>
          <p>01 / Application</p>
          <h3>Android UI and state</h3>
          <ul>
            <li>Jetpack Compose + Material 3</li>
            <li>ViewModel + AndroidX Lifecycle</li>
            <li>POS, inventory, reports, settings, assistant</li>
          </ul>
        </section>
        <span className={styles.architectureArrow} aria-hidden="true">
          →
        </span>
        <section className={styles.architectureNode}>
          <p>02 / On-device</p>
          <h3>Local data and device services</h3>
          <ul>
            <li>Room / SQLite schema v3 + FTS4</li>
            <li>App-private images + local ZIP exports</li>
            <li>CameraX + ML Kit + WorkManager</li>
          </ul>
        </section>
        <span
          className={`${styles.architectureArrow} ${styles.architectureOptionalArrow}`}
          aria-hidden="true"
        >
          ⇢
        </span>
        <section className={`${styles.architectureNode} ${styles.architectureOptional}`}>
          <p>03 / Optional external</p>
          <h3>Outside the core sales path</h3>
          <ul>
            <li>Open Food Facts product lookup</li>
            <li>Gemini Developer API client</li>
            <li>Private HTTPS assistant endpoint</li>
          </ul>
        </section>
      </div>
      <figcaption id="architecture-caption">
        High-level component map based on source inspection. Solid arrows represent local
        application relationships; the dashed arrow marks optional external integrations. It does
        not assert runtime verification or a complete production architecture.
      </figcaption>
    </figure>
  );
}
