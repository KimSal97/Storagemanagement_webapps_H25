// src/features/products/productsRepository.ts
import { db } from "@/db";
import { products } from "./products-schema";
import { eq } from "drizzle-orm";
import { createId } from "@/lib/id";
import type { NewProduct } from "./products-schema";

export const productsRepository = {
  async findAll() {
    return await db.select().from(products);
  },

  async findById(id: string) {
    return await db.select().from(products).where(eq(products.id, id)).get();
  },

  async create(data: NewProduct) {
    const newProduct = { id: createId(), ...data };
    await db.insert(products).values(newProduct);
    return newProduct;
  },

  async update(id: string, data: Partial<NewProduct>) {
    await db.update(products).set(data).where(eq(products.id, id));
  },

  async remove(id: string) {
    await db.delete(products).where(eq(products.id, id));
  },
};
