import { db } from "@/db";
import { orders, orderItems } from "@/db/schema/orders-schema";
import { eq } from "drizzle-orm";

export const ordersRepository = {
  async createOrder(id: string, status: string = "pending") {
    await db.insert(orders).values({
      id,
      status,
      createdAt: new Date().toISOString(),
    });
    return this.getOrder(id);
  },

  async addOrderItem(item: {
    id: string;
    orderId: string;
    productId: string;
    quantity: number;
    calculatedQuantity: number;
  }) {
    await db.insert(orderItems).values(item);
  },

  async getOrder(id: string) {
    const [order] = await db.select().from(orders).where(eq(orders.id, id));
    if (!order) return null;

    const items = await db
      .select()
      .from(orderItems)
      .where(eq(orderItems.orderId, id));

    return { ...order, items };
  },

  async listOrders() {
    return await db.select().from(orders);
  },

  async updateOrder(id: string, data: Partial<{ status: string }>) {
    await db.update(orders).set(data).where(eq(orders.id, id));
    return this.getOrder(id);
  },

  async deleteOrder(id: string) {
    await db.delete(orderItems).where(eq(orderItems.orderId, id));
    await db.delete(orders).where(eq(orders.id, id));
    return { success: true };
  },
};
