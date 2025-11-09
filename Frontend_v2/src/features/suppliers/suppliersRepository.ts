import { db } from "@/db";
import { suppliers } from "@/db/schema/suppliers-schema";
import { eq } from "drizzle-orm";
import { createId } from "@/lib/id";

export const suppliersRepository = {
  async create(data: {
    name: string;
    contactPerson: string;
    email: string;
    phone: string;
    address?: string;
  }) {
    await db.insert(suppliers).values({
      id: createId(),
      name: data.name,
      contactPerson: data.contactPerson,
      email: data.email,
      phone: data.phone,
      address: data.address,
    });
  },

  async findAll() {
    return await db.select().from(suppliers);
  },

  async findByEmail(email: string) {
    return await db.select().from(suppliers).where(eq(suppliers.email, email)).get();
  },
};
