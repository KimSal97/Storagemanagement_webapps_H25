import { db } from "@/db";
import { orders, orderItems } from "@/db/schema/orders-schema";
import { products } from "@/db/schema/products-schema";
import { eq, inArray } from "drizzle-orm";

export type CreateOrderRow = {
  id: string;
  createdAt: string;
  status: string;
  totalCost: number;
};

export type CreateOrderItemRow = {
  id: string;
  orderId: string;
  productId: string;
  productName: string; 
  orderedQty: number;
  unitCost: number;
};

export const ordersRepository = {
  async create(orderRow: CreateOrderRow) {
    await db.insert(orders).values(orderRow);
  },

  async addItem(itemRow: CreateOrderItemRow) {
    await db.insert(orderItems).values(itemRow);
  },

  async getProductsByIds(ids: string[]) {
    if (ids.length === 0) return [];
    return db
      .select({
        id: products.id,
        name: products.name,
        price: products.price,
      })
      .from(products)
      .where(inArray(products.id, ids));
  },

  async findAll() {
    const allOrders = await db.select().from(orders);

    const allItems = await db
      .select({
        id: orderItems.id,
        orderId: orderItems.orderId,
        productId: orderItems.productId,
        productName: orderItems.productName,
        orderedQty: orderItems.orderedQty,
        unitCost: orderItems.unitCost,
      })
      .from(orderItems);

    const itemsByOrderId = new Map<string, typeof allItems>();

    for (const item of allItems) {
      const arr = itemsByOrderId.get(item.orderId) ?? [];
      arr.push(item);
      itemsByOrderId.set(item.orderId, arr);
    }

    return allOrders.map((o) => ({
      ...o,
      items: itemsByOrderId.get(o.id) ?? [],
    }));
  },

  async findById(id: string) {
    const [order] = await db.select().from(orders).where(eq(orders.id, id));
    if (!order) return null;

    const items = await db
      .select({
        id: orderItems.id,
        orderId: orderItems.orderId,
        productId: orderItems.productId,
        productName: orderItems.productName,
        orderedQty: orderItems.orderedQty,
        unitCost: orderItems.unitCost,
      })
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
