import { db } from "@/db";
import { orders, orderItems } from "@/db/schema/orders-schema";

export const ordersRepository = {
  async createOrder(order, items) {
    await db.insert(orders).values(order);
    await db.insert(orderItems).values(items);
  },
};
