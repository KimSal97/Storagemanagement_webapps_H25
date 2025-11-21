import { ordersRepository } from "./ordersRepository";
import { createId } from "@/lib/id";

type CreateOrderItemInput = {
  productId: string;
  orderedQty: number;
  unitCost: number;
};

type CreateOrderInput = {
  supplierId: string;
  userId: string;
  expected?: string | null;
  items: CreateOrderItemInput[];
};

export const ordersService = {
  async create(data: CreateOrderInput) {
    const id = createId();
    const created = new Date().toISOString();

    const totalCost = data.items.reduce(
      (sum, item) => sum + item.orderedQty * item.unitCost,
      0
    );

    // lag selve ordren
    await ordersRepository.createOrder({
      id,
      supplierId: data.supplierId,
      userId: data.userId,
      expected: data.expected ?? null,
      created,
      status: "pending",
      totalCost,
    });

    // lag order_items
    const itemsToInsert = data.items.map((item) => ({
      id: createId(),
      orderId: id,
      productId: item.productId,
      orderedQty: item.orderedQty,
      unitCost: item.unitCost,
    }));

    await ordersRepository.addOrderItems(itemsToInsert);

    // returner ordren med items
    const order = await ordersRepository.getOrder(id);
    if (!order) throw new Error("Order not found after creation");
    return order;
  },

  async list() {
    return ordersRepository.listOrders();
  },

  async get(id: string) {
    const order = await ordersRepository.getOrder(id);
    if (!order) throw new Error("Order not found");
    return order;
  },

  async update(id: string, data: { status?: string; expected?: string | null }) {
    const order = await ordersRepository.updateOrder(id, data);
    if (!order) throw new Error("Order not found");
    return order;
  },

  async remove(id: string) {
    return ordersRepository.deleteOrder(id);
  },
};
