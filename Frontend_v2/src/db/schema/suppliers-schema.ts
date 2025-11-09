import { sqliteTable, text } from "drizzle-orm/sqlite-core";

export const suppliers = sqliteTable("suppliers", {
  id: text("id").primaryKey().notNull(),
  name: text("name").notNull(),
  contactPerson: text("contact_person").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  address: text("address"),
});

export type Supplier = typeof suppliers.$inferSelect;
export type NewSupplier = typeof suppliers.$inferInsert;
