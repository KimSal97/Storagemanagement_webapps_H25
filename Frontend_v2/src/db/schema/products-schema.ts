// src/features/products/products-schema.ts
import { sqliteTable, text, integer, real } from "drizzle-orm/sqlite-core";

export const products = sqliteTable("products", {
  id: text("id").primaryKey().notNull(),
  name: text("name").notNull(),
  category: text("category").notNull(),
  stock: integer("stock").notNull(),
  minStock: integer("min_stock").notNull(),
  price: real("price").notNull(),
  supplier: text("supplier").notNull(),
  location: text("location").notNull(),
});

export type Product = typeof products.$inferSelect;
export type NewProduct = typeof products.$inferInsert;
