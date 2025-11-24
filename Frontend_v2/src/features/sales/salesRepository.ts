import { db } from "@/db";
import { sales } from "@/db/schema/sales-schema";
import { eq } from "drizzle-orm";

export const salesRepository = {
  async create(sale: {
    id: string;
    productId: string;
    quantity: number;
    soldAt: string;
    createdBy: string;
  }) {
    await db.insert(sales).values(sale);
  },

  async findAll() {
    return db.select().from(sales);
  },

  async findById(id: string) {
    const [sale] = await db.select().from(sales).where(eq(sales.id, id));
    return sale ?? null;
  },

  async delete(id: string) {
    await db.delete(sales).where(eq(sales.id, id));
  }
};
