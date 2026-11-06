import type { Metadata } from "next";
import { projects } from "@/content/projects";
import { pageMetadata } from "@/lib/site";
import { ProjectFilter } from "@/components/ProjectFilter";
import { SectionHeading } from "@/components/ui";
import styles from "../content.module.css";

export const metadata: Metadata = pageMetadata({
  title: "Verified Software Projects",
  description:
    "Android and web engineering projects with inspectable source, explicit evidence status, and honest limitations.",
  path: "/projects",
});

export default function ProjectsPage() {
  return (
    <>
      <header className={`container ${styles.pageHero}`}>
        <SectionHeading
          level={1}
          eyebrow="PROJECT INDEX / VERIFIED WORK"
          title="Build less fiction. Show more evidence."
          description="A focused project gallery led by SariSariPOS, with implementation status and source links made visible. No placeholder startups, fabricated clients, or inflated outcomes."
        />
      </header>
      <div className="container sectionCompact">
        <ProjectFilter projects={projects} />
      </div>
    </>
  );
}
