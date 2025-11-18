// src/db/index.ts
import { drizzle, type DrizzleD1Database } from "drizzle-orm/d1";
import { env } from "cloudflare:workers";
import * as schema from "./schema/schemaindex";
export function initDB(env: Env) {
  return drizzle(env.DB, { schema });
}