// src/db/schema/password-reset-schema.ts
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const passwordResets = sqliteTable("password_resets", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull(),
  token: text("token").notNull(),
  expiresAt: integer("expires_at").notNull(), 
});
