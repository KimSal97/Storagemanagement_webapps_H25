import { createId } from "@/lib/id";
import { ordersRepository } from "./ordersRepository";

export const ordersService = {
  async createOrder(data) {
    const orderId = createId();
    const created = {
      id: orderId,
      createdAt: new Date().toISOString(),
      status: "pending",
    };

    const items = data.items.map((i) => ({
      id: createId(),
      orderId,
      productId: i.productId,
      quantity: i.quantity,
      calculatedQuantity: i.calculatedQuantity,
    }));

    await ordersRepository.createOrder(created, items);

    return { ok: true, orderId };
  },
};
