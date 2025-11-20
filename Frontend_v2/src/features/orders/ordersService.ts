import { ordersRepository } from "./ordersRepository";
import { createId } from "@/lib/id";

export const ordersService = {
  async create(items: { productId: string; quantity: number; calculatedQuantity: number }[]) {
    const orderId = createId();

    await ordersRepository.createOrder(orderId);

    for (const item of items) {
      await ordersRepository.addOrderItem({
        id: createId(),
        orderId,
        productId: item.productId,
        quantity: item.quantity,
        calculatedQuantity: item.calculatedQuantity,
      });
    }

    return ordersRepository.getOrder(orderId);
  },

  async get(id: string) {
    const order = await ordersRepository.getOrder(id);
    if (!order) throw new Error("Order not found");
    return order;
  },

  async list() {
    return ordersRepository.listOrders();
  },

  async update(id: string, data: { status?: string }) {
    return ordersRepository.updateOrder(id, data);
  },

  async remove(id: string) {
    return ordersRepository.deleteOrder(id);
  },
};
