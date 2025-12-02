import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";


export function createTestDb() {
  const sqlite = new Database(":memory:");

  sqlite.exec(`
    CREATE TABLE suppliers (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      contact_person TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT NOT NULL,
      address TEXT,
      status TEXT NOT NULL
    );
  `);

  const db = drizzle(sqlite);
  return db;
}
