import { randomUUID } from "node:crypto";
import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";
import postgres from "postgres";
import type { ContactDetails } from "@/lib/contact-schema";

export type ContactRecord = ContactDetails & {
  id: string;
  status: "new";
  createdAt: string;
};

export interface ContactStore {
  save(details: ContactDetails): Promise<ContactRecord>;
}

export class ContactStoreUnavailableError extends Error {
  constructor() {
    super("Contact storage is not configured.");
    this.name = "ContactStoreUnavailableError";
  }
}

function createRecord(details: ContactDetails): ContactRecord {
  return {
    id: randomUUID(),
    ...details,
    status: "new",
    createdAt: new Date().toISOString(),
  };
}

export class FileContactStore implements ContactStore {
  private readonly directory: string;
  private queue: Promise<void> = Promise.resolve();

  constructor(directory = process.env.CONTACT_DATA_DIR || ".data") {
    this.directory = path.resolve(/* turbopackIgnore: true */ directory);
  }

  async save(details: ContactDetails): Promise<ContactRecord> {
    const record = createRecord(details);
    const write = this.queue.then(async () => {
      await mkdir(this.directory, { recursive: true, mode: 0o700 });
      await appendFile(
        path.join(this.directory, "contact-messages.jsonl"),
        `${JSON.stringify(record)}\n`,
        {
          encoding: "utf8",
          mode: 0o600,
        },
      );
    });
    this.queue = write.catch(() => undefined);
    await write;
    return record;
  }
}

export class PostgresContactStore implements ContactStore {
  private readonly sql: ReturnType<typeof postgres>;

  constructor(databaseUrl: string) {
    this.sql = postgres(databaseUrl, {
      max: 2,
      idle_timeout: 20,
      connect_timeout: 10,
      prepare: false,
      onnotice: () => undefined,
    });
  }

  async save(details: ContactDetails): Promise<ContactRecord> {
    const record = createRecord(details);
    await this.sql`
      INSERT INTO contact_messages (id, name, email, subject, message, status, created_at)
      VALUES (
        ${record.id},
        ${record.name},
        ${record.email},
        ${record.subject},
        ${record.message},
        ${record.status},
        ${record.createdAt}
      )
    `;
    return record;
  }
}

let cachedStore: ContactStore | null = null;

export function getContactStore(): ContactStore {
  if (cachedStore) return cachedStore;

  const configuredDriver = process.env.CONTACT_STORAGE;
  const driver =
    configuredDriver ||
    (process.env.DATABASE_URL
      ? "postgres"
      : process.env.NODE_ENV === "production"
        ? "unavailable"
        : "file");

  if (driver === "postgres") {
    if (!process.env.DATABASE_URL) throw new ContactStoreUnavailableError();
    cachedStore = new PostgresContactStore(process.env.DATABASE_URL);
    return cachedStore;
  }

  if (driver === "file" && process.env.NODE_ENV !== "production") {
    cachedStore = new FileContactStore();
    return cachedStore;
  }

  throw new ContactStoreUnavailableError();
}

export function resetContactStoreForTests() {
  cachedStore = null;
}
