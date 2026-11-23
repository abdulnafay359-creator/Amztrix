import "server-only";

import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

export function createDb(connectionString = process.env.DATABASE_URL_POOLED || process.env.DATABASE_URL) {
  if (!connectionString) {
    throw new Error("Set DATABASE_URL_POOLED or DATABASE_URL to connect to Neon.");
  }

  return drizzle(neon(connectionString), { schema });
}
