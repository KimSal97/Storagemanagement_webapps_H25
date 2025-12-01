import { drizzle } from "drizzle-orm/better-sqlite3";
import * as schema from "@/db/";
import Database from "better-sqlite3";

export function createTestDb() {
  const sqlite = new Database(":memory:");
  const db = drizzle(sqlite, { schema });

  return db;
}