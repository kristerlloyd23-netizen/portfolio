import { existsSync, readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { experience } from "@/content/profile";
import { projects } from "@/content/projects";
import { sariSariPosEvidence, screenshotCaptures } from "@/content/sarisaripos";

describe("portfolio evidence and assets", () => {
  it("preserves the supplied overlapping employment dates", () => {
    expect(experience[0]?.start).toBe("February 2025");
    expect(experience[0]?.end).toBe("March 2026");
    expect(experience[1]?.start).toBe("January 2025");
    expect(experience[1]?.end).toBe("April 2025");
  });

  it("publishes only the flagship and this implemented website", () => {
    expect(projects.map((project) => project.slug)).toEqual(["sarisaripos", "developer-portfolio"]);
    expect(projects[0]?.repositoryUrl).toBe(sariSariPosEvidence.sourceUrl);
  });

  it("uses a full inspected commit hash and real release URLs", () => {
    expect(sariSariPosEvidence.inspectedCommit).toMatch(/^[0-9a-f]{40}$/);
    expect(sariSariPosEvidence.releaseUrl).toContain("/releases/tag/v1.0.0");
    expect(sariSariPosEvidence.apkUrl).toContain("/releases/download/v1.0.0/");
  });

  it("has real downloadable and social assets", () => {
    for (const file of [
      "public/projects/sarisaripos-icon.png",
      "public/resume/krister-lloyd-magalso-android-developer.pdf",
      "public/og.png",
    ]) {
      expect(existsSync(file), file).toBe(true);
    }
  });

  it("publishes eight real optimized captures with evidence-qualified captions", () => {
    expect(screenshotCaptures).toHaveLength(8);
    for (const capture of screenshotCaptures) {
      expect(capture.src).toMatch(/^\/projects\/sarisaripos\/.+\.webp$/);
      expect(existsSync(`public${capture.src}`), capture.src).toBe(true);
      expect(capture.alt.length).toBeGreaterThan(40);
      expect(capture.meta).toContain("documented app v1.2");
    }
    expect(
      screenshotCaptures.find((capture) => capture.key === "suki-ledger")?.description,
    ).toContain("masked");
  });

  it("keeps direct contact details out of the shared profile module", () => {
    const source = readFileSync("content/profile.ts", "utf8");
    expect(source).not.toMatch(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i);
    expect(source).not.toMatch(/\+?\d[\d\s()-]{8,}/);
  });
});
