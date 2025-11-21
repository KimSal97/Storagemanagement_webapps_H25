import { sqliteTable, text, real, integer } from "drizzle-orm/sqlite-core";

export const orders = sqliteTable("orders", {
  id: text("id").primaryKey(),                   
  supplierId: text("supplier_id").notNull(),     
  created: text("created").notNull(),         
  expected: text("expected"),                  
  userId: text("user_id").notNull(),             
  status: text("status").default("pending"),     
  totalCost: real("total_cost").default(0),      
});

export const orderItems = sqliteTable("order_items", {
  id: text("id").primaryKey(),                
  orderId: text("order_id").notNull(),           
  productId: text("product_id").notNull(),     
  orderedQty: real("ordered_qty").notNull(),      
  unitCost: real("unit_cost").notNull(),          
});

export type Order = typeof orders.$inferSelect;
export type NewOrder = typeof orders.$inferInsert;

export type OrderItem = typeof orderItems.$inferSelect;
export type NewOrderItem = typeof orderItems.$inferInsert;

export type OrderWithItems = Order & { items: OrderItem[] };
