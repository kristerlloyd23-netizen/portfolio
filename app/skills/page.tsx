import type { Metadata } from "next";
import {
  androidSkillGroups,
  portfolioWebSkills,
  professionalSupportSkills,
} from "@/content/skills";
import { pageMetadata } from "@/lib/site";
import { SectionHeading } from "@/components/ui";
import styles from "../content.module.css";

export const metadata: Metadata = pageMetadata({
  title: "Technical Skills",
  description:
    "Confirmed Android stack, web technologies implemented in this portfolio, and professional IT support capabilities—kept in separate evidence categories.",
  path: "/skills",
});

export default function SkillsPage() {
  return (
    <>
      <header className={`container ${styles.pageHero}`}>
        <SectionHeading
          level={1}
          eyebrow="SKILLS / EVIDENCE BEFORE BREADTH"
          title="Technologies in context, not percentage bars."
          description="Versioned Android skills come from the supplied project source and configuration. Web skills are listed only as technologies used in this portfolio—not as earlier professional experience."
        />
      </header>

      <section className="sectionCompact">
        <div className="container">
          <p className={styles.kicker}>01 / CONFIRMED ANDROID DEVELOPMENT STACK</p>
          <div className={`${styles.skillGrid} ${styles.skillSection}`}>
            {androidSkillGroups.map((group) => (
              <article key={group.title} className={styles.skillCard}>
                <h2>{group.title}</h2>
                <p>{group.description}</p>
                <ul>
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section sectionBorder">
        <div className="container">
          <p className={styles.kicker}>02 / USED TO BUILD THIS WEBSITE</p>
          <h2 className={styles.skillSection}>Web technologies demonstrated by this project.</h2>
          <p className={styles.notice}>
            These technologies describe the implementation of this portfolio itself. They are not
            presented as previous employment skills or years of experience.
          </p>
          <ul className={styles.tagList}>
            {portfolioWebSkills.map((skill) => (
              <li key={skill}>{skill}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section sectionBorder">
        <div className="container">
          <p className={styles.kicker}>03 / PROFESSIONAL EXPERIENCE</p>
          <h2 className={styles.skillSection}>Technical support capabilities.</h2>
          <ul className={styles.tagList}>
            {professionalSupportSkills.map((skill) => (
              <li key={skill}>{skill}</li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
