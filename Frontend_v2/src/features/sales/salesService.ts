import { createId } from "@/lib/id";
import { salesRepository } from "./salesRepository";
import { products } from "@/db/schema/products-schema";
import { db } from "@/db";
import { eq } from "drizzle-orm";

export const salesService = {
  async create(data: {
    productId: string;
    quantity: number;
    createdBy: string;
  }) {
    if (!data.productId) throw new Error("Missing productId");
    if (data.quantity <= 0) throw new Error("Quantity must be > 0");

    const saleId = createId();
    const soldAt = new Date().toISOString();

    const [product] = await db
      .select()
      .from(products)
      .where(eq(products.id, data.productId));

    if (!product) {
      throw new Error("Product does not exist");
    }

    const newStock = Math.max(0, (product.stock ?? 0) - data.quantity);

    await db
      .update(products)
      .set({ stock: newStock })
      .where(eq(products.id, data.productId));

    await salesRepository.create({
      id: saleId,
      productId: data.productId,
      quantity: data.quantity,
      soldAt,
      createdBy: data.createdBy,
    });

    return { id: saleId, ...data, soldAt, newStock };
  },

  async list() {
    return salesRepository.findAll();
  },

  async get(id: string) {
    const sale = await salesRepository.findById(id);
    if (!sale) throw new Error("Sale not found");
    return sale;
  },

  async remove(id: string) {
    await salesRepository.delete(id);
    return { success: true };
  },
};
