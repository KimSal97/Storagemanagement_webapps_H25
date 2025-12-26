import { createId } from "@/lib/id";
import { ordersRepository } from "./ordersRepository";

type CreateOrderInputItem = {
  productId: string;
  orderedQty: number;
  unitCost: number;
};

export const ordersService = {
  async create(items: CreateOrderInputItem[]) {
    if (!Array.isArray(items) || items.length === 0) {
      throw new Error("Order must contain items");
    }

    // Validate qty + ids
    for (const it of items) {
      if (!it.productId) throw new Error("productId is required");
      if (!Number.isFinite(it.orderedQty) || it.orderedQty <= 0) {
        throw new Error("orderedQty must be > 0");
      }
      if (!Number.isFinite(it.unitCost) || it.unitCost < 0) {
        throw new Error("unitCost must be >= 0");
      }
    }

    const orderId = createId();

    const uniqueProductIds = [...new Set(items.map((i) => i.productId))];
    const dbProducts = await ordersRepository.getProductsByIds(uniqueProductIds);

    const nameById = new Map(dbProducts.map((p) => [p.id, p.name]));

    for (const pid of uniqueProductIds) {
      if (!nameById.has(pid)) {
        throw new Error(`Product not found: ${pid}`);
      }
    }

    const totalCost = items.reduce(
      (sum, item) => sum + item.unitCost * item.orderedQty,
      0
    );

    await ordersRepository.create({
      id: orderId,
      createdAt: new Date().toISOString(),
      status: "pending",
      totalCost,
    });

    for (const item of items) {
      await ordersRepository.addItem({
        id: createId(),
        orderId,
        productId: item.productId,
        productName: nameById.get(item.productId)!, 
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
