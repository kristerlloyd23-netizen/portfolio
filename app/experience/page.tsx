import type { Metadata } from "next";
import Link from "next/link";
import { certifications, education, experience } from "@/content/profile";
import { pageMetadata } from "@/lib/site";
import { ArrowRightIcon } from "@/components/Icons";
import { SectionHeading } from "@/components/ui";
import styles from "../content.module.css";

export const metadata: Metadata = pageMetadata({
  title: "Experience and Education",
  description:
    "Professional IT support roles with accurate supplied dates, Computer Science education, certifications, and training.",
  path: "/experience",
});

export default function ExperiencePage() {
  return (
    <>
      <header className={`container ${styles.pageHero}`}>
        <SectionHeading
          level={1}
          eyebrow="EXPERIENCE / FIELD + SERVICE DESK"
          title="Technical support where people and equipment meet."
          description="Two supplied roles are presented with their original dates and responsibilities. The overlapping employment dates remain intact and unexplained until verified."
        />
      </header>

      <section className="sectionCompact">
        <div className="container">
          <p className={styles.notice}>
            Date note: February 2025 – March 2026 and January 2025 – April 2025 are shown exactly as
            provided. No concurrent-work explanation has been invented.
          </p>
          <div className={`${styles.timeline} ${styles.skillSection}`}>
            {experience.map((role) => (
              <article key={role.organization} className={styles.timelineItem}>
                <p className={styles.timelineDate}>
                  {role.start}
                  <br />— {role.end}
                </p>
                <div className={styles.timelineContent}>
                  <h2>{role.title}</h2>
                  <p className={styles.organization}>{role.organization}</p>
                  <p className={styles.summary}>{role.summary}</p>
                  <ul>
                    {role.responsibilities.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section sectionBorder">
        <div className={`container ${styles.cardGrid}`}>
          <article className={styles.infoCard}>
            <p className={styles.kicker}>EDUCATION</p>
            <h2 className={styles.skillSection}>{education.degree}</h2>
            <p>
              {education.school}
              <br />
              Graduated {education.graduation}
            </p>
          </article>
          <article className={styles.infoCard}>
            <p className={styles.kicker}>CERTIFICATIONS AND TRAINING</p>
            <div className={`${styles.credentialList} ${styles.skillSection}`}>
              {certifications.map((certification) => (
                <div key={certification.title} className={styles.credential}>
                  <div>
                    <h3>{certification.title}</h3>
                    <p>{certification.provider}</p>
                  </div>
                  <span>{certification.date}</span>
                </div>
              ))}
            </div>
          </article>
        </div>
      </section>

      <section className={`container ${styles.pageHero}`}>
        <Link href="/resume" className="button buttonPrimary">
          View resume <ArrowRightIcon />
        </Link>
      </section>
    </>
  );
}
