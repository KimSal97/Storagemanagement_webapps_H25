import { sqliteTable, text, integer, real } from "drizzle-orm/sqlite-core";

export const sales = sqliteTable("sales", {
  id: text("id").primaryKey(),
  productId: text("product_id").notNull(),
  quantity: integer("quantity").notNull(),
  soldAt: text("sold_at").notNull(),
  createdBy: text("created_by").notNull(),
});

export type Sale = typeof sales.$inferSelect;
export type NewSale = typeof sales.$inferInsert;
