import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import {
  engineeringDecisions,
  limitations,
  roadmap,
  sariSariPosEvidence,
  screenshotCaptures,
  sourceSupportedFeatures,
  verificationRows,
} from "@/content/sarisaripos";
import { pageMetadata } from "@/lib/site";
import { ArrowRightIcon, ArrowUpRightIcon, DownloadIcon } from "@/components/Icons";
import { AppScreenshot, ArchitectureDiagram, EvidenceBadge } from "@/components/ui";
import styles from "./case-study.module.css";

export const metadata: Metadata = pageMetadata({
  title: "SariSariPOS — Android Case Study",
  description:
    "Source-reviewed offline-first Android POS and inventory case study: architecture, Room migrations, local backups, barcode workflows, assistant evidence, and verification limits.",
  path: "/projects/sarisaripos",
});

const chapters = [
  ["overview", "Overview"],
  ["problem", "Problem + concept"],
  ["architecture", "Architecture"],
  ["implementation", "Implementation"],
  ["offline", "Offline decisions"],
  ["integrations", "Integrations"],
  ["media", "Product media"],
  ["verification", "Verification"],
  ["limitations", "Limitations"],
  ["roadmap", "Roadmap"],
  ["source", "Source + demo"],
] as const;

export default function SariSariPosCaseStudy() {
  return (
    <article>
      <header className={`container ${styles.hero}`}>
        <nav className={styles.breadcrumb} aria-label="Breadcrumb">
          <Link href="/projects">Projects</Link>
          <span>/</span>
          <span>SariSariPOS</span>
        </nav>
        <div className={styles.heroGrid}>
          <div>
            <div className={styles.badges}>
              <EvidenceBadge>Source reviewed</EvidenceBadge>
              <EvidenceBadge tone="amber">Owner captures · verification limited</EvidenceBadge>
            </div>
            <h1>SariSariPOS</h1>
            <p className={styles.fullTitle}>
              Offline-First Point-of-Sale and Inventory Management System
            </p>
            <p className={styles.heroSummary}>
              An Android project designed around neighborhood sari-sari store workflows, with local
              persistence, inventory and customer-credit structures, local backup exports, barcode
              integrations, and an assistant-related component.
            </p>
            <div className={styles.actions}>
              <a
                href={sariSariPosEvidence.sourceUrl}
                target="_blank"
                rel="noreferrer"
                className="button buttonPrimary"
              >
                Inspect source <ArrowUpRightIcon />
              </a>
              <a
                href={sariSariPosEvidence.releaseUrl}
                target="_blank"
                rel="noreferrer"
                className="button buttonSecondary"
              >
                View debug release
              </a>
            </div>
          </div>
          <div className={styles.heroAside}>
            <div className={styles.productIdentity}>
              <Image
                src="/projects/sarisaripos-icon.png"
                alt="SariSariPOS launcher icon showing a small store"
                width={144}
                height={144}
                priority
              />
              <div>
                <span>ANDROID / KOTLIN</span>
                <p>Real project launcher asset</p>
              </div>
            </div>
            <AppScreenshot
              compact
              src="/projects/sarisaripos/01-pos.webp"
              title="POS catalog · owner capture"
              alt="SariSariPOS Point of Sale catalog with product search, category filters, prices, stock, and an empty cart summary."
              description="The real catalog interface is shown; no checkout completion is implied."
              meta="Documented app v1.2 · 25 Oct 2026"
            />
          </div>
        </div>
        <dl className={styles.factStrip}>
          <div>
            <dt>Platform</dt>
            <dd>Android · SDK 24–34</dd>
          </div>
          <div>
            <dt>Local data</dt>
            <dd>Room / SQLite · schema v3</dd>
          </div>
          <div>
            <dt>Reviewed commit</dt>
            <dd>
              <code>{sariSariPosEvidence.inspectedCommit.slice(0, 12)}</code>
            </dd>
          </div>
          <div>
            <dt>Release</dt>
            <dd>v1.0.0 · debug-signed APK</dd>
          </div>
        </dl>
      </header>

      <nav className={`container ${styles.toc}`} aria-label="Case study chapters">
        {chapters.map(([id, label], index) => (
          <a key={id} href={`#${id}`}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            {label}
          </a>
        ))}
      </nav>

      <div className="container">
        <Chapter id="overview" number="01" title="Overview">
          <p>
            SariSariPOS is a Kotlin/Jetpack Compose application that brings point-of-sale,
            inventory, customer-credit, reporting, backup, and assistant-related structures into one
            Android project. Its central engineering choice is to keep the core sales workflow
            local.
          </p>
          <p>
            This case study is based on a static source review at commit{" "}
            <code>{sariSariPosEvidence.inspectedCommit}</code> on {sariSariPosEvidence.inspectedOn}.
            It does not treat compiled classes or README statements as proof that every feature
            works end to end.
          </p>
          <div className={styles.statusNotice}>
            <strong>Evidence status</strong>
            <p>
              Implementation components are source-supported, and eight owner-supplied v1.2
              interface captures document sample/test appearance. Independent end-to-end
              verification is still pending; no adoption, revenue, benchmark, or testimonial claims
              are made.
            </p>
          </div>
        </Chapter>

        <Chapter id="problem" number="02" title="Problem and product concept">
          <p>
            The project concept targets a neighborhood sari-sari store that needs to record sales,
            monitor stock, handle customer credit, and preserve useful records without making every
            operation depend on internet access.
          </p>
          <p>
            The product concept combines a searchable POS, stock and break-bulk rules, suki/customer
            records, local reports, backup exports, barcode-assisted product handling, and an
            assistant that can draw on local notes and selected store facts.
          </p>
          <p>
            No user-research study is claimed here. These are the supplied design goals and target
            use case, not measured customer findings.
          </p>
        </Chapter>

        <Chapter id="architecture" number="03" title="Architecture">
          <ArchitectureDiagram />
          <div className={styles.architectureNotes}>
            <div>
              <h3>Application structure</h3>
              <p>
                The repository separates local entities and DAOs, repositories, a background worker,
                domain rules, and Compose UI areas. `AppContainer` connects application
                dependencies.
              </p>
            </div>
            <div>
              <h3>Data ownership</h3>
              <p>
                Room is the local system of record. Optional catalog and model services are outside
                the core transaction path.
              </p>
            </div>
            <div>
              <h3>Assistant boundaries</h3>
              <p>
                Source implements local note retrieval and allowlisted read-only store queries; it
                does not provide arbitrary SQL or transaction execution to the model.
              </p>
            </div>
          </div>
        </Chapter>

        <Chapter id="implementation" number="04" title="Technical implementation">
          <p>
            The following capabilities have source or configuration evidence. “Source-supported”
            means the implementation is present—not that every path has been exercised successfully
            on a device.
          </p>
          <div className={styles.featureGrid}>
            {sourceSupportedFeatures.map((feature, index) => (
              <section key={feature.title} className={styles.feature}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </section>
            ))}
          </div>
          <div className={styles.databaseDesign}>
            <h3>Database and local storage design</h3>
            <ul>
              <li>
                <strong>Commerce records:</strong> products, customers, transactions, transaction
                items, and utang payments.
              </li>
              <li>
                <strong>Assistant records:</strong> documents and FTS4 chunks for local retrieval.
              </li>
              <li>
                <strong>Schema v3:</strong> migration 1→2 adds product-image and assistant
                structures; migration 2→3 adds image-source attribution.
              </li>
              <li>
                <strong>Media:</strong> product images remain in app-private storage while database
                records retain paths and attribution information.
              </li>
            </ul>
          </div>
        </Chapter>

        <Chapter id="offline" number="05" title="Offline-first decisions and tradeoffs">
          <div className={styles.decisionGrid}>
            {engineeringDecisions.map((item) => (
              <section key={item.title} className={styles.decision}>
                <h3>{item.title}</h3>
                <p>{item.decision}</p>
                <p>
                  <strong>Tradeoff:</strong> {item.tradeoff}
                </p>
              </section>
            ))}
          </div>
        </Chapter>

        <Chapter id="integrations" number="06" title="Barcode, lookup, and assistant integrations">
          <div className={styles.integrationBlock}>
            <p className={styles.kicker}>A / BARCODE AND EXTERNAL PRODUCT LOOKUP</p>
            <ol className={styles.flowList}>
              <li>
                <span>01</span>
                <p>
                  CameraX and on-device ML Kit provide barcode-scanning components for POS or
                  product-entry workflows.
                </p>
              </li>
              <li>
                <span>02</span>
                <p>
                  The barcode can be used with local product records without requiring an external
                  catalog response.
                </p>
              </li>
              <li>
                <span>03</span>
                <p>
                  An optional Open Food Facts lookup can supply a catalog candidate and package
                  image for user review.
                </p>
              </li>
              <li>
                <span>04</span>
                <p>
                  Applied images are cached in app-private storage with attribution information.
                  Crowdsourced catalog matches still require review.
                </p>
              </li>
            </ol>
          </div>
          <div className={styles.integrationBlock}>
            <p className={styles.kicker}>B / ASSISTANT RETRIEVAL AND GENERATION</p>
            <div className={styles.assistantGrid}>
              <div>
                <h3>Local ingestion and retrieval</h3>
                <p>
                  Seeded and user-added notes are split into chunks and indexed with Room FTS4. The
                  assistant repository retrieves matching excerpts and assembles cited source
                  models.
                </p>
              </div>
              <div>
                <h3>Read-only store facts</h3>
                <p>
                  Allowlisted queries provide selected inventory, sales, and customer-credit
                  aggregates. Source comments and query paths explicitly avoid arbitrary SQL or
                  write actions.
                </p>
              </div>
              <div>
                <h3>Local response path</h3>
                <p>
                  A deterministic answer returns selected facts or a retrieved excerpt with source
                  information when no external model is used.
                </p>
              </div>
              <div>
                <h3>Optional remote generation</h3>
                <p>
                  If explicitly enabled, Gemini or a private HTTPS endpoint receives the question
                  and selected grounding context. Source includes a local fallback when generation
                  is unavailable.
                </p>
              </div>
            </div>
            <div className={styles.statusNotice}>
              <strong>Verification boundary</strong>
              <p>
                These components support a local retrieval-and-grounding implementation in source,
                and one owner capture shows a local answer with source cards. End-to-end ingestion,
                retrieval relevance, cited-source correctness, generated-answer grounding, and API
                failure behavior have not been independently evaluated. This case study does not
                claim a proven production RAG system.
              </p>
            </div>
          </div>
        </Chapter>

        <Chapter id="media" number="07" title="Real product media">
          <p>
            {sariSariPosEvidence.screenshotStatus} Captures show interface appearance and
            sample/test app state only. Checkout/payment and barcode-scanner dialogs were not
            included. Select any capture to inspect its full-size image.
          </p>
          <div className={styles.mediaGrid}>
            {screenshotCaptures.map(({ key, ...capture }) => (
              <AppScreenshot key={key} {...capture} />
            ))}
          </div>
        </Chapter>

        <Chapter id="verification" number="08" title="Testing and verification">
          <div className={styles.statusNotice}>
            <strong>Successfully tested Android features</strong>
            <p>
              No Android runtime test results were independently produced during this portfolio
              build. The repository contains five break-bulk JUnit test methods, but they were not
              executed here because the environment lacks the required JDK 17 and Android SDK setup.
            </p>
          </div>
          <div className={styles.verificationList}>
            {verificationRows.map((row) => (
              <section key={row.area}>
                <h3>{row.area}</h3>
                <p className={styles.verificationStatus}>{row.status}</p>
                <p>{row.detail}</p>
              </section>
            ))}
          </div>
        </Chapter>

        <Chapter id="limitations" number="09" title="Known limitations">
          <ul className={styles.limitationList}>
            {limitations.map((limitation) => (
              <li key={limitation}>{limitation}</li>
            ))}
          </ul>
        </Chapter>

        <Chapter id="roadmap" number="10" title="Future roadmap">
          <ol className={styles.roadmapList}>
            {roadmap.map((item, index) => (
              <li key={item}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <p>{item}</p>
              </li>
            ))}
          </ol>
        </Chapter>

        <Chapter id="source" number="11" title="Repository and demonstration">
          <div className={styles.sourcePanel}>
            <div>
              <p className={styles.kicker}>PUBLIC SOURCE</p>
              <h3>Inspect the implementation directly.</h3>
              <p>
                Reviewed commit: <code>{sariSariPosEvidence.inspectedCommit}</code>
              </p>
              <a
                href={sariSariPosEvidence.sourceUrl}
                target="_blank"
                rel="noreferrer"
                className="button buttonPrimary"
              >
                Open GitHub repository <ArrowUpRightIcon />
              </a>
            </div>
            <div>
              <p className={styles.kicker}>DEBUG APK / V1.0.0</p>
              <h3>Install for local evaluation.</h3>
              <p>
                The APK is debug-signed and intended for local testing. It is not presented as a
                production-signed or Play Store release. Review the repository’s build and privacy
                notes before installation.
              </p>
              <div className={styles.actions}>
                <a href={sariSariPosEvidence.apkUrl} className="button buttonSecondary">
                  <DownloadIcon /> Download debug APK
                </a>
                <a
                  href={sariSariPosEvidence.releaseUrl}
                  target="_blank"
                  rel="noreferrer"
                  className={styles.releaseLink}
                >
                  Release details <ArrowUpRightIcon />
                </a>
              </div>
            </div>
          </div>
          <Link href="/projects" className={styles.backLink}>
            <ArrowRightIcon /> Back to all projects
          </Link>
        </Chapter>
      </div>
    </article>
  );
}

function Chapter({
  id,
  number,
  title,
  children,
}: {
  id: string;
  number: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className={styles.chapter} aria-labelledby={`${id}-title`}>
      <div className={styles.chapterIndex}>
        <span>{number}</span>
        <p>CASE STUDY</p>
      </div>
      <div className={styles.chapterBody}>
        <h2 id={`${id}-title`}>{title}</h2>
        <div className={styles.chapterContent}>{children}</div>
      </div>
    </section>
  );
}
