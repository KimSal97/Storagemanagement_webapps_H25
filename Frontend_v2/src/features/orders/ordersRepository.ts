import { db } from "@/db";
import {
  orders,
  orderItems,
  type Order,
  type OrderItem,
  type NewOrderItem,
} from "@/db/schema/orders-schema";
import { eq } from "drizzle-orm";

export const ordersRepository = {
  async createOrder(id: string, status: string = "pending"): Promise<Order> {
    await db.insert(orders).values({
      id,
      status,
      createdAt: new Date().toISOString(),
    });

    return this.getOrder(id) as Promise<Order>;
  },

  async addOrderItem(item: NewOrderItem): Promise<void> {
    await db.insert(orderItems).values(item);
  },

  async getOrder(id: string): Promise<Order | null> {
    const rows = await db.select().from(orders).where(eq(orders.id, id));
    return rows[0] ?? null;
  },

  async getOrderItems(orderId: string): Promise<OrderItem[]> {
    return db.select().from(orderItems).where(eq(orderItems.orderId, orderId));
  },

  async listOrders(): Promise<Order[]> {
    return db.select().from(orders);
  },

  async updateOrder(
    id: string,
    data: Partial<{ status: string }>
  ): Promise<Order | null> {
    await db.update(orders).set(data).where(eq(orders.id, id));
    return this.getOrder(id);
  },

  async deleteOrder(id: string): Promise<void> {
    await db.delete(orderItems).where(eq(orderItems.orderId, id));
    await db.delete(orders).where(eq(orders.id, id));
  },
};
