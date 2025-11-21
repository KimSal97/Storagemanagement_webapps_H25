import { db } from "@/db";
import { orders, orderItems, type NewOrder, type NewOrderItem, type OrderWithItems } from "@/db/schema/orders-schema";
import { eq } from "drizzle-orm";

export const ordersRepository = {
  async createOrder(order: NewOrder) {
    await db.insert(orders).values(order);
    return this.getOrder(order.id);
  },

  async addOrderItems(items: NewOrderItem[]) {
    if (items.length === 0) return;
    await db.insert(orderItems).values(items);
  },

  async getOrder(id: string): Promise<OrderWithItems | null> {
    const [order] = await db.select().from(orders).where(eq(orders.id, id));
    if (!order) return null;

    const items = await db
      .select()
      .from(orderItems)
      .where(eq(orderItems.orderId, id));

    return { ...order, items };
  },

  async listOrders() {
    return db.select().from(orders);
  },

  async updateOrder(
    id: string,
    data: Partial<{ status: string; expected: string | null }>
  ) {
    await db
      .update(orders)
      .set(data)
      .where(eq(orders.id, id));

    return this.getOrder(id);
  },

  async deleteOrder(id: string) {
    await db.delete(orderItems).where(eq(orderItems.orderId, id));
    await db.delete(orders).where(eq(orders.id, id));
    return { success: true };
  },
};
