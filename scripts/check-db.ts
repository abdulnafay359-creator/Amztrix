import { sql } from "drizzle-orm";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

async function checkConnections() {
  let failed = false;

  for (const name of ["DATABASE_URL", "DATABASE_URL_POOLED"] as const) {
    const url = process.env[name];

    if (!url) {
      console.error(`${name}: missing`);
      failed = true;
      continue;
    }

    try {
      await drizzle(neon(url)).execute(sql`select 1`);
      console.log(`${name}: connected`);
    } catch (error) {
      const code = (error as { cause?: { code?: string; sourceError?: { cause?: { code?: string } } } }).cause;
      console.error(`${name}: connection failed`, code?.code ?? code?.sourceError?.cause?.code ?? "");
      failed = true;
    }
  }

  if (failed) process.exitCode = 1;
}

void checkConnections();
