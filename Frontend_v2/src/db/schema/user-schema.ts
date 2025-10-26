// src/db/schema/user-schema.ts
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  password: text("password").notNull(),
  email: text("email").notNull().unique(),
});

export type User = typeof users.$inferSelect;
