import type { Metadata } from "next";
import { contactDetails } from "@/content/contact";
import { certifications, education, experience, profile } from "@/content/profile";
import { pageMetadata } from "@/lib/site";
import { DownloadIcon, GithubIcon } from "@/components/Icons";
import { PrintButton } from "@/components/PrintButton";
import styles from "./resume.module.css";

export const metadata: Metadata = pageMetadata({
  title: "Resume — Android and Software Development",
  description:
    "Web and PDF resume for Krister Lloyd Magalso, Computer Science graduate and Android project developer with professional IT support experience.",
  path: "/resume",
});

const pdfPath = "/resume/krister-lloyd-magalso-android-developer.pdf";

export default function ResumePage() {
  return (
    <div className={`container ${styles.page}`}>
      <div className={`noPrint ${styles.toolbar}`}>
        <p>RESUME / ANDROID + SOFTWARE DEVELOPMENT</p>
        <div>
          <a href={pdfPath} download className="button buttonPrimary">
            <DownloadIcon /> Download PDF
          </a>
          <PrintButton />
        </div>
      </div>

      <article className={styles.resume} aria-labelledby="resume-name">
        <header className={styles.resumeHeader}>
          <div>
            <p className={styles.resumeLabel}>CURRICULUM VITAE / 2026</p>
            <h1 id="resume-name">{profile.name}</h1>
            <p className={styles.resumeRole}>Junior Software Developer | Android Developer</p>
          </div>
          <address className={styles.contact}>
            {profile.location}
            <br />
            <a href={`tel:${contactDetails.phoneHref}`}>{contactDetails.phoneDisplay}</a>
            <br />
            <a href={`mailto:${contactDetails.email}`}>{contactDetails.email}</a>
            <br />
            <a href={profile.github} target="_blank" rel="noreferrer">
              <GithubIcon /> GitHub profile
            </a>
          </address>
        </header>

        <ResumeSection title="Professional Summary">
          <p>
            Computer Science graduate with hands-on project experience developing an offline-first
            Android Point-of-Sale and inventory management application using Kotlin, Jetpack
            Compose, Room, and SQLite. Familiar with local persistence, database migrations, barcode
            scanning, device integrations, and Android development tools. Also brings professional
            IT support experience in troubleshooting, equipment configuration, and user assistance.
          </p>
        </ResumeSection>

        <ResumeSection title="Technical Skills">
          <div className={styles.skillRows}>
            <p>
              <strong>Android and UI</strong>
              <span>Kotlin, Jetpack Compose, Material 3, AndroidX Lifecycle, ViewModel</span>
            </p>
            <p>
              <strong>Data and background work</strong>
              <span>Room, SQLite, Room migrations, app-private storage, Room FTS, WorkManager</span>
            </p>
            <p>
              <strong>Device and integrations</strong>
              <span>
                CameraX, ML Kit Barcode Scanning, Photo Picker, ExifInterface, Open Food Facts,
                Gemini API client
              </span>
            </p>
            <p>
              <strong>Build and testing</strong>
              <span>JDK 17, Gradle, KSP, Android SDK 34, JUnit, Android Lint</span>
            </p>
          </div>
        </ResumeSection>

        <ResumeSection title="Flagship Technical Project">
          <div className={styles.roleHeader}>
            <div>
              <h3>SariSariPOS — Offline-First Point-of-Sale and Inventory Management</h3>
              <p>Android application | Kotlin, Jetpack Compose, Room, SQLite</p>
            </div>
            <a
              href="https://github.com/kristerlloyd23-netizen/SariSariPOS"
              target="_blank"
              rel="noreferrer"
            >
              Source
            </a>
          </div>
          <ul>
            <li>
              Implemented POS, inventory, customer-credit, reporting, local backup, and
              assistant-related components in a source-reviewed Android project.
            </li>
            <li>
              Configured Room/SQLite persistence through schema version 3, explicit migrations,
              app-private product images, and attribution records.
            </li>
            <li>
              Integrated CameraX and ML Kit barcode workflows, Open Food Facts lookup, Room FTS
              retrieval, and optional Gemini/private HTTPS generation in source.
            </li>
            <li>
              Included five JUnit tests for break-bulk logic; broader runtime and integration
              verification remains a documented next step.
            </li>
          </ul>
        </ResumeSection>

        <ResumeSection title="Professional Experience">
          <div className={styles.roles}>
            {experience.map((role) => (
              <div key={role.organization}>
                <div className={styles.roleHeader}>
                  <div>
                    <h3>{role.title}</h3>
                    <p>{role.organization}</p>
                  </div>
                  <span>
                    {role.start} – {role.end}
                  </span>
                </div>
                <ul>
                  {role.responsibilities.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </ResumeSection>

        <div className={styles.bottomGrid}>
          <ResumeSection title="Education">
            <h3>{education.degree}</h3>
            <p>
              {education.school}
              <br />
              Graduated {education.graduation}
            </p>
          </ResumeSection>
          <ResumeSection title="Certifications and Training">
            {certifications.map((certification) => (
              <p key={certification.title} className={styles.certification}>
                <strong>{certification.title}</strong>
                <br />
                {certification.provider}
                <br />
                {certification.date}
              </p>
            ))}
          </ResumeSection>
        </div>
      </article>
    </div>
  );
}

function ResumeSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className={styles.resumeSection}>
      <h2>{title}</h2>
      <div>{children}</div>
    </section>
  );
}
