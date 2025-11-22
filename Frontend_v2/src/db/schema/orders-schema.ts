import { sqliteTable, text, integer, real } from "drizzle-orm/sqlite-core";

export const orders = sqliteTable("orders", {
  id: text("id").primaryKey(),
  createdAt: text("created_at").notNull(),
  status: text("status").notNull().default("pending"),
  totalCost: real("total_cost").notNull(),
});

export const orderItems = sqliteTable("order_items", {
  id: text("id").primaryKey(),
  orderId: text("order_id").notNull(),
  productId: text("product_id").notNull(),
  orderedQty: integer("ordered_qty").notNull(),
  unitCost: real("unit_cost").notNull(),
});


export type Order = typeof orders.$inferSelect;
export type NewOrder = typeof orders.$inferInsert;

export type OrderItem = typeof orderItems.$inferSelect;
export type NewOrderItem = typeof orderItems.$inferInsert;

export type OrderWithItems = Order & { items: OrderItem[] };
