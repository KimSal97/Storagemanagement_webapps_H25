import { db } from "@/db";
import { products } from "@/db/schema/products-schema";
import { eq } from "drizzle-orm";
import { createId } from "@/lib/id";

export type NewProductInput = Omit<typeof products.$inferInsert, "id">;

export const productsRepository = {
  async findAll() {
    return await db.select().from(products);
  },

  async findById(id: string) {
    return await db.select().from(products).where(eq(products.id, id)).get();
  },

  async create(data: NewProductInput) {
    const newProduct = { ...data, id: createId() };
    await db.insert(products).values(newProduct);
    return newProduct;
  },

  async update(id: string, data: Partial<NewProductInput>) {
    await db.update(products).set(data).where(eq(products.id, id));
  },

  async remove(id: string) {
    await db.delete(products).where(eq(products.id, id));
  },
};
