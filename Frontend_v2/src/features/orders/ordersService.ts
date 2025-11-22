import { createId } from "@/lib/id";
import { ordersRepository } from "./ordersRepository";

export const ordersService = {
  async create(items: { productId: string; orderedQty: number; unitCost: number }[]) {
    if (!Array.isArray(items) || items.length === 0) {
      throw new Error("Order must contain items");
    }

    const orderId = createId();

    const totalCost = items.reduce(
      (sum, item) => sum + item.unitCost * item.orderedQty,
      0
    );

    await ordersRepository.create(orderId, totalCost);

    for (const item of items) {
      await ordersRepository.addItem({
        id: createId(),
        orderId,
        productId: item.productId,
        orderedQty: item.orderedQty,
        unitCost: item.unitCost,
      });
    }
    return await ordersRepository.findById(orderId);
  },

  async list() {
    return ordersRepository.findAll();
  },

  async get(id: string) {
    const order = await ordersRepository.findById(id);
    if (!order) throw new Error("Order not found");
    return order;
  },

  async update(id: string, data: { status?: string }) {
    return ordersRepository.update(id, data);
  },

  async remove(id: string) {
    await ordersRepository.delete(id);
    return { success: true };
  },
};
