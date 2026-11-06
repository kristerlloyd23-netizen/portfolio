import type { Metadata } from "next";
import Link from "next/link";
import { education, experience, profile } from "@/content/profile";
import { portfolioWebSkills } from "@/content/skills";
import { pageMetadata } from "@/lib/site";
import { ArrowRightIcon } from "@/components/Icons";
import { SectionHeading } from "@/components/ui";
import styles from "../content.module.css";

export const metadata: Metadata = pageMetadata({
  title: "About",
  description:
    "Computer Science education, Android development focus, IT support experience, and the engineering approach behind this portfolio.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <header className={`container ${styles.pageHero}`}>
        <SectionHeading
          level={1}
          eyebrow="ABOUT / BACKGROUND AND APPROACH"
          title="Learning by building. Explaining by showing the work."
          description="I’m Krister Lloyd Magalso, a Computer Science graduate in Caloocan City working across Android project development and practical technical support."
        />
      </header>

      <section className="section">
        <div className={`container ${styles.split}`}>
          <div>
            <p className={styles.kicker}>01 / CURRENT DIRECTION</p>
          </div>
          <div className={styles.prose}>
            <p>
              My current development work centers on <strong>SariSariPOS</strong>, an Android
              project built with Kotlin, Jetpack Compose, Room, and SQLite. It explores a practical
              store workflow where core sales and inventory functions should not depend on a
              constant network connection.
            </p>
            <p>
              Alongside that project, I have professional experience installing and troubleshooting
              audiovisual equipment and assisting users with workstation, software, and connectivity
              issues. That support background reinforces a practical habit: understand the failure
              in context before choosing a solution.
            </p>
            <p>
              I’m seeking junior Android and software development opportunities, entry-level
              full-stack work aligned with what I can demonstrate, IT support roles, and suitable
              freelance conversations.
            </p>
          </div>
        </div>
      </section>

      <section className="section sectionBorder">
        <div className="container">
          <p className={styles.kicker}>02 / EDUCATION AND EXPERIENCE</p>
          <div className={`${styles.cardGrid} ${styles.skillSection}`}>
            <article className={styles.infoCard}>
              <h2>{education.degree}</h2>
              <p>
                {education.school}
                <br />
                Graduated {education.graduation}
              </p>
              <Link href="/resume" className={styles.inlineLink}>
                View education on resume <ArrowRightIcon />
              </Link>
            </article>
            <article className={styles.infoCard}>
              <h2>Professional IT support</h2>
              <p>
                {experience[0].organization}
                <br />
                {experience[1].organization}
              </p>
              <Link href="/experience" className={styles.inlineLink}>
                View roles and accurate dates <ArrowRightIcon />
              </Link>
            </article>
          </div>
        </div>
      </section>

      <section className="section sectionBorder">
        <div className={`container ${styles.split}`}>
          <div>
            <p className={styles.kicker}>03 / APPROACH REFLECTED IN CURRENT WORK</p>
          </div>
          <div className={styles.prose}>
            <ul>
              <li>
                <strong>Start with the workflow.</strong> Model sales, stock, customer credit, and
                backups before adding optional services.
              </li>
              <li>
                <strong>Keep failure modes visible.</strong> Separate local behavior from external
                lookups and remote generation.
              </li>
              <li>
                <strong>Prefer inspectable decisions.</strong> Document migrations, data storage,
                source links, and security tradeoffs.
              </li>
              <li>
                <strong>Do not confuse presence with proof.</strong> Source code, runtime
                verification, and future plans belong in separate categories.
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section id="portfolio-build" className="section sectionBorder">
        <div className="container">
          <p className={styles.kicker}>04 / THIS PORTFOLIO IS ALSO A BUILD</p>
          <h2 className={styles.skillSection}>A web application, not just a visual shell.</h2>
          <div className={styles.buildGrid}>
            <div>
              <h3>Frontend</h3>
              <p>
                Next.js App Router, React Server Components, strict TypeScript, selective Client
                Components, CSS design tokens, responsive CSS Modules, dark/light themes, and
                reduced-motion support.
              </p>
            </div>
            <div>
              <h3>Backend</h3>
              <p>
                A Route Handler validates and normalizes contact submissions, applies anti-abuse
                checks, and persists messages through PostgreSQL in production or an explicitly
                local store during development.
              </p>
            </div>
            <div>
              <h3>Verification</h3>
              <p>
                Vitest covers validation, content invariants, rate limiting, and persistence logic.
                Playwright covers real browser interactions, responsive widths, keyboard paths, and
                automated axe checks.
              </p>
            </div>
            <div>
              <h3>Scope discipline</h3>
              <p>
                Typed Git-managed content replaces an unnecessary CMS. No decorative login, public
                registration, invented dashboard, or email-success claim is included.
              </p>
            </div>
          </div>
          <ul className={styles.tagList} aria-label="Technologies used in this portfolio">
            {portfolioWebSkills.map((skill) => (
              <li key={skill}>{skill}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className={`container ${styles.pageHero}`}>
        <p className={styles.kicker}>NEXT / PROJECT EVIDENCE</p>
        <h2 className={styles.skillSection}>See how the pieces fit together.</h2>
        <div className={styles.actionRow}>
          <Link href="/projects/sarisaripos" className="button buttonPrimary">
            Explore SariSariPOS <ArrowRightIcon />
          </Link>
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            className="button buttonSecondary"
          >
            View GitHub
          </a>
        </div>
      </section>
    </>
  );
}
