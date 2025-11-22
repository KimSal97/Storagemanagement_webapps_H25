import { ordersRepository } from "./ordersRepository";
import { createId } from "@/lib/id";

type CreateOrderItemInput = {
  productId: string;
  orderedQty: number;
  unitCost: number;
};

export const ordersService = {
  async create(items: CreateOrderItemInput[]) {
    if (!items || !Array.isArray(items) || items.length === 0) {
      throw new Error("Order must contain at least one item");
    }

    const orderId = createId();
    const order = await ordersRepository.createOrder(orderId, "pending");

    for (const item of items) {
      if (!item.productId || item.orderedQty <= 0) continue;

      await ordersRepository.addOrderItem({
        id: createId(),
        orderId,
        productId: item.productId,
        quantity: item.orderedQty,
        calculatedQuantity: item.unitCost,
      });
    }

    const rawItems = await ordersRepository.getOrderItems(orderId);

    return {
      id: order.id,
      status: order.status,
      createdAt: order.createdAt,
      date: order.createdAt,
      items: rawItems.map((it) => ({
        id: it.id,
        productId: it.productId,
        orderedQty: it.quantity,
        unitCost: it.calculatedQuantity,
      })),
    };
  },

  async list() {
    const orders = await ordersRepository.listOrders();

    return orders.map((o) => ({
      id: o.id,
      status: o.status,
      createdAt: o.createdAt,
      date: o.createdAt,
    }));
  },

  async get(id: string) {
    const order = await ordersRepository.getOrder(id);
    if (!order) {
      throw new Error("Order not found");
    }

    const rawItems = await ordersRepository.getOrderItems(id);

    return {
      id: order.id,
      status: order.status,
      createdAt: order.createdAt,
      date: order.createdAt,
      items: rawItems.map((it) => ({
        id: it.id,
        productId: it.productId,
        orderedQty: it.quantity,
        unitCost: it.calculatedQuantity,
      })),
    };
  },

  async update(id: string, data: { status?: string }) {
    const updated = await ordersRepository.updateOrder(id, data);
    if (!updated) {
      throw new Error("Order not found");
    }

    return {
      id: updated.id,
      status: updated.status,
      createdAt: updated.createdAt,
      date: updated.createdAt,
    };
  },

  async remove(id: string) {
    await ordersRepository.deleteOrder(id);
    return { success: true };
  },
};
