"use client";

import { useState } from "react";
import { projectCategories, type Project } from "@/content/projects";
import { ProjectCard } from "@/components/ui";
import styles from "./ProjectFilter.module.css";

type Filter = (typeof projectCategories)[number];

export function ProjectFilter({ projects }: { projects: readonly Project[] }) {
  const [filter, setFilter] = useState<Filter>("All");
  const visible =
    filter === "All" ? projects : projects.filter((project) => project.categories.includes(filter));

  return (
    <section aria-labelledby="project-gallery-title" className={styles.gallery}>
      <div className={styles.toolbar}>
        <div className={styles.filters} role="group" aria-label="Filter projects by category">
          {projectCategories.map((category) => (
            <button
              key={category}
              type="button"
              aria-pressed={filter === category}
              className={filter === category ? styles.active : undefined}
              onClick={() => setFilter(category)}
            >
              {category}
            </button>
          ))}
        </div>
        <p role="status" aria-live="polite" className={styles.count}>
          {visible.length} {visible.length === 1 ? "project" : "projects"} · {filter}
        </p>
      </div>
      <h2 id="project-gallery-title" className="srOnly">
        Verified project gallery
      </h2>
      {visible.length > 0 ? (
        <div className={styles.grid}>
          {visible.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      ) : (
        <div className={styles.empty}>
          <p className={styles.emptyCode}>EMPTY / VERIFIED WORK ONLY</p>
          <h3>No published projects in this category yet.</h3>
          <p>
            Future tools and experiments will appear here only after their implementation and status
            can be described accurately.
          </p>
          <button type="button" onClick={() => setFilter("All")}>
            View all verified projects
          </button>
        </div>
      )}
    </section>
  );
}
