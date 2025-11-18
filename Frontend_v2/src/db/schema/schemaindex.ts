import {
  sqliteTable,
  integer,
  text,
  numeric,
  real,
} from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

// ========== USERS ==========
export const users = sqliteTable("users", {
  id: integer("id").primaryKey(),
  fullName: text("full_name").notNull(),
  email: text("email").notNull().unique(),
  phone: text("phone"),
  passwordHash: text("password_hash").notNull(),
  role: text("role").notNull(),
});

// ========== SUPPLIERS ==========
export const suppliers = sqliteTable("suppliers", {
  id: integer("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email"),
  phone: text("phone"),
  apiKey: text("api_key"),
});

// ========== CATEGORIES ==========
export const categories = sqliteTable("categories", {
  id: integer("id").primaryKey(),
  name: text("name").notNull().unique(),
});

// ========== WAREHOUSES ==========
export const warehouses = sqliteTable("warehouses", {
  id: integer("id").primaryKey(),
  name: text("name").notNull(),
  address: text("address"),
});

// ========== LOCATIONS ==========
export const locations = sqliteTable("locations", {
  id: integer("id").primaryKey(),
  warehouseId: integer("warehouse_id")
    .notNull()
    .references(() => warehouses.id),
  locationCode: text("location_code").notNull(),
  description: text("description"),
});

// ========== PRODUCTS ==========
export const products = sqliteTable("products", {
  id: integer("id").primaryKey(),
  amount: numeric("amount").notNull(),
  categoryId: integer("category_id")
    .notNull()
    .references(() => categories.id),
  sku: text("sku").notNull().unique(),
});

// ========== PRODUCT_SUPPLIERS ==========
export const productSuppliers = sqliteTable("product_suppliers", {
  productId: integer("product_id")
    .notNull()
    .references(() => products.id),
  supplierId: integer("supplier_id")
    .notNull()
    .references(() => suppliers.id),
  productCost: numeric("product_cost").notNull(),
});

// ========== ORDERS ==========
export const orders = sqliteTable("orders", {
  id: integer("id").primaryKey(),
  supplierId: integer("supplier_id")
    .notNull()
    .references(() => suppliers.id),
  productId: integer("product_id")
    .notNull()
    .references(() => products.id),
  orderedQty: numeric("ordered_qty").notNull(),
  unitCost: numeric("unit_cost").notNull(),
  created: text("created").default(sql`CURRENT_TIMESTAMP`),
  expected: text("expected"),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id),
});

// ========== RESTOCK_RULES ==========
export const restockRules = sqliteTable("restock_rules", {
  id: integer("id").primaryKey(),
  productId: integer("product_id")
    .notNull()
    .references(() => products.id),
  locationId: integer("location_id")
    .notNull()
    .references(() => locations.id),
  currentQty: numeric("current_qty").notNull(),
  reservedQty: numeric("reserved_qty").notNull(),
  reorderPoint: numeric("reorder_point").notNull(),
  reorderQty: numeric("reorder_qty").notNull(),
  safetyMargin: numeric("safety_margin").notNull(),
});

// ========== ALERTS ==========
export const alerts = sqliteTable("alerts", {
  id: integer("id").primaryKey(),
  type: text("type").notNull(),
  productId: integer("product_id")
    .notNull()
    .references(() => products.id),
  locationId: integer("location_id")
    .notNull()
    .references(() => locations.id),
  threshold: numeric("threshold").notNull(),
  currentVal: numeric("current_val").notNull(),
  status: text("status").notNull(),
});

// ========== STATS ==========
export const stats = sqliteTable("stats", {
  id: integer("id").primaryKey(),
  productId: integer("product_id")
    .notNull()
    .references(() => products.id),
  locationId: integer("location_id")
    .notNull()
    .references(() => locations.id),
  quantityDelta: numeric("quantity_delta").notNull(),
  description: text("description"),
});
