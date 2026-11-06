import { existsSync } from "node:fs";
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import postgres from "postgres";

if (typeof process.loadEnvFile === "function" && existsSync(".env.local")) {
  process.loadEnvFile(".env.local");
}

if (!process.env.DATABASE_URL) {
  console.error("DATABASE_URL is required. Copy .env.example to .env.local and configure it.");
  process.exit(1);
}

const sql = postgres(process.env.DATABASE_URL, {
  max: 1,
  prepare: false,
  onnotice: () => undefined,
});

try {
  await sql`
    CREATE TABLE IF NOT EXISTS schema_migrations (
      filename TEXT PRIMARY KEY,
      applied_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;

  const directory = path.resolve("db/migrations");
  const files = (await readdir(directory)).filter((file) => file.endsWith(".sql")).sort();

  for (const filename of files) {
    const applied = await sql`SELECT filename FROM schema_migrations WHERE filename = ${filename}`;
    if (applied.length > 0) {
      console.log(`Already applied: ${filename}`);
      continue;
    }

    const migration = await readFile(path.join(directory, filename), "utf8");
    await sql.begin(async (transaction) => {
      // Migration files are trusted, reviewed source files—not user input.
      await transaction.unsafe(migration);
      await transaction`INSERT INTO schema_migrations (filename) VALUES (${filename})`;
    });
    console.log(`Applied: ${filename}`);
  }
} finally {
  await sql.end();
}
