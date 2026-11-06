import Image from "next/image";
import Link from "next/link";
import { experience, profile } from "@/content/profile";
import { flagshipProject } from "@/content/projects";
import { ArrowRightIcon, ArrowUpRightIcon, DownloadIcon, GithubIcon } from "@/components/Icons";
import { AppScreenshot, EvidenceBadge, ProjectCard, SectionHeading } from "@/components/ui";
import { Reveal } from "@/components/Reveal";
import styles from "./page.module.css";

const resumePath = "/resume/krister-lloyd-magalso-android-developer.pdf";

export default function Home() {
  return (
    <>
      <section className={`container ${styles.hero}`}>
        <div className={styles.heroCopy}>
          <p className={styles.overline}>
            {profile.name} <span>/</span> {profile.location}
          </p>
          <h1>{profile.headline}</h1>
          <p className={styles.heroIntroduction}>{profile.introduction}</p>
          <div className={styles.heroActions}>
            <Link href="/projects" className="button buttonPrimary">
              Explore my work <ArrowRightIcon />
            </Link>
            <Link href="/contact" className="button buttonSecondary">
              Contact me
            </Link>
          </div>
          <nav className={styles.quickLinks} aria-label="Additional portfolio links">
            <a href={profile.github} target="_blank" rel="noreferrer">
              <GithubIcon /> View GitHub <ArrowUpRightIcon />
            </a>
            <a href={resumePath} download>
              <DownloadIcon /> Download resume
            </a>
            <Link href="/projects/sarisaripos">
              Explore SariSariPOS <ArrowRightIcon />
            </Link>
          </nav>
        </div>
        <div className={styles.heroEvidence}>
          <div className={styles.heroProduct}>
            <Image
              src="/projects/sarisaripos-icon.png"
              alt="SariSariPOS launcher icon"
              width={112}
              height={112}
              priority
            />
            <div>
              <p>FLAGSHIP / ANDROID</p>
              <h2>SariSariPOS</h2>
              <span>Offline-first POS + inventory</span>
            </div>
          </div>
          <AppScreenshot
            compact
            src="/projects/sarisaripos/01-pos.webp"
            title="POS catalog · owner capture"
            alt="SariSariPOS Point of Sale catalog with product search, category filters, prices, stock, and an empty cart summary."
            description="A real application catalog with searchable products, prices, stock, and cart summary. Checkout remains unverified."
            meta="Documented app v1.2 · 25 Oct 2026"
          />
          <div className={styles.heroEvidenceFooter}>
            <EvidenceBadge tone="amber">Source reviewed</EvidenceBadge>
            <span>8 owner captures · runtime limits noted</span>
          </div>
        </div>
      </section>

      <div className={`container ${styles.scrollCue}`}>
        <a href="#featured">
          Scroll to project evidence <span aria-hidden="true">↓</span>
        </a>
      </div>

      <section className="section sectionBorder">
        <div className="container">
          <Reveal>
            <SectionHeading
              eyebrow="01 / Engineering posture"
              title="Proof over promises."
              description="A junior portfolio should make scope visible: what exists in source, what has been tested, and what still needs verification."
            />
          </Reveal>
          <div className={styles.principles}>
            <Reveal className={styles.principle}>
              <span>01</span>
              <h3>Local-first product thinking</h3>
              <p>
                Core POS and inventory workflows are designed around on-device Room/SQLite
                persistence rather than constant connectivity.
              </p>
            </Reveal>
            <Reveal className={styles.principle}>
              <span>02</span>
              <h3>Implementation you can inspect</h3>
              <p>
                The flagship case study links to real source, a real debug release, a reviewed
                commit, and explicit evidence limitations.
              </p>
            </Reveal>
            <Reveal className={styles.principle}>
              <span>03</span>
              <h3>Support-grounded troubleshooting</h3>
              <p>
                Professional IT support experience adds equipment configuration, workstation
                assistance, and on-site user support.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section id="featured" className="section sectionBorder">
        <div className="container">
          <Reveal>
            <SectionHeading
              eyebrow="02 / Flagship case study"
              title="Software for the neighborhood store."
              description="SariSariPOS explores offline sales, inventory, customer credit, local backups, barcode workflows, and source-grounded assistance for a sari-sari store use case."
            />
          </Reveal>
          <ProjectCard project={flagshipProject} />
        </div>
      </section>

      <section className="section sectionBorder">
        <div className={`container ${styles.evidenceLayout}`}>
          <div>
            <p className={styles.overline}>03 / READ THE EVIDENCE</p>
            <h2>Clear about what’s built—and what isn’t proven yet.</h2>
          </div>
          <div className={styles.evidenceLedger}>
            <div>
              <span>Source-supported</span>
              <p>
                Room schema v3, migrations, POS/inventory structures, FTS retrieval, local exports,
                and optional integrations.
              </p>
            </div>
            <div>
              <span>Test evidence</span>
              <p>
                Five break-bulk JUnit tests are present. Android test execution is blocked in this
                portfolio environment and is not claimed as passing.
              </p>
            </div>
            <div>
              <span>Runtime status</span>
              <p>
                Eight owner-supplied screens document interface state. End-to-end checkout,
                migrations, assistant quality, and external API behavior still require verification.
              </p>
            </div>
            <Link href="/projects/sarisaripos#verification">
              Review verification details <ArrowRightIcon />
            </Link>
          </div>
        </div>
      </section>

      <section className="section sectionBorder">
        <div className="container">
          <SectionHeading
            eyebrow="04 / Professional foundation"
            title="Technical work beyond the code editor."
          />
          <div className={styles.experiencePreview}>
            {experience.map((role) => (
              <article key={role.organization}>
                <p>
                  {role.start} — {role.end}
                </p>
                <h3>{role.title}</h3>
                <span>{role.organization}</span>
                <p>{role.summary}</p>
              </article>
            ))}
          </div>
          <Link href="/experience" className={styles.inlineLink}>
            View complete experience <ArrowRightIcon />
          </Link>
        </div>
      </section>

      <section className={`container ${styles.closing}`}>
        <p className={styles.overline}>05 / NEXT CONVERSATION</p>
        <h2>Have a practical problem worth solving?</h2>
        <p>
          I’m open to junior development opportunities, entry-level full-stack work aligned with
          demonstrated skills, IT support roles, and suitable freelance conversations.
        </p>
        <div className={styles.heroActions}>
          <Link href="/contact" className="button buttonPrimary">
            Start a conversation <ArrowRightIcon />
          </Link>
          <Link href="/resume" className="button buttonSecondary">
            View resume
          </Link>
        </div>
      </section>
    </>
  );
}
