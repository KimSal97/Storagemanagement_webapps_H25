import { db } from "@/db";
import { orders, orderItems } from "@/db/schema/orders-schema";
import { eq } from "drizzle-orm";

export const ordersRepository = {
  async create(orderId: string, totalCost: number) {
    await db.insert(orders).values({
      id: orderId,
      createdAt: new Date().toISOString(),
      status: "pending",
      totalCost,
    });
  },

  async addItem(item: {
    id: string;
    orderId: string;
    productId: string;
    orderedQty: number;
    unitCost: number;
  }) {
    await db.insert(orderItems).values(item);
  },

  async findAll() {
    const allOrders = await db.select().from(orders);
    const allItems = await db.select().from(orderItems);

    return allOrders.map((o) => ({
      ...o,
      items: allItems.filter((i) => i.orderId === o.id),
    }));
  },

  async findById(id: string) {
    const [order] = await db.select().from(orders).where(eq(orders.id, id));
    if (!order) return null;

    const items = await db
      .select()
      .from(orderItems)
      .where(eq(orderItems.orderId, id));

    return { ...order, items };
  },

  async update(id: string, data: { status?: string }) {
    await db.update(orders).set(data).where(eq(orders.id, id));

    return this.findById(id);
  },

  async delete(id: string) {
    await db.delete(orderItems).where(eq(orderItems.orderId, id));
    await db.delete(orders).where(eq(orders.id, id));
  },
};
