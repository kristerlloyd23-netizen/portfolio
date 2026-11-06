import { mkdtemp, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import { FileContactStore } from "@/lib/contact-store";

const details = {
  name: "QA Reviewer",
  email: "qa@example.test",
  subject: "Persistence test",
  message: "This message verifies local persistence without personal data.",
};

let directory: string | undefined;

afterEach(async () => {
  if (directory) await rm(directory, { recursive: true, force: true });
  directory = undefined;
});

describe("FileContactStore", () => {
  it("persists a complete contact record as JSONL", async () => {
    directory = await mkdtemp(path.join(tmpdir(), "portfolio-contact-"));
    const store = new FileContactStore(directory);
    const record = await store.save(details);
    const lines = (await readFile(path.join(directory, "contact-messages.jsonl"), "utf8"))
      .trim()
      .split("\n");
    expect(lines).toHaveLength(1);
    expect(JSON.parse(lines[0]!)).toEqual(record);
    expect(record).toMatchObject({ ...details, status: "new" });
    expect(record.id).toMatch(/^[0-9a-f-]{36}$/);
    expect(Number.isNaN(Date.parse(record.createdAt))).toBe(false);
  });

  it("serializes concurrent writes without dropping a record", async () => {
    directory = await mkdtemp(path.join(tmpdir(), "portfolio-contact-"));
    const store = new FileContactStore(directory);
    await Promise.all([
      store.save(details),
      store.save({ ...details, subject: "Second persistence test" }),
    ]);
    const content = await readFile(path.join(directory, "contact-messages.jsonl"), "utf8");
    expect(content.trim().split("\n")).toHaveLength(2);
  });
});
