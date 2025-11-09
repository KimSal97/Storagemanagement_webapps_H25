import { db } from "@/db";
import { suppliers } from "@/db/schema/suppliers-schema";
import { eq } from "drizzle-orm";
import { createId } from "@/lib/id";

export const suppliersRepository = {
  async create(data: {
    name: string;
    contact_person: string;
    email: string;
    phone: string;
    address?: string;
  }) {
    await db.insert(suppliers).values({
      id: createId(),
      name: data.name,
      contact_person: data.contact_person,
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

  // 🔹 Hent én leverandør
  async findById(id: string) {
    return await db.select().from(suppliers).where(eq(suppliers.id, id)).get();
  },

  // 🔹 Oppdater leverandør
  async updateById(id: string, data: Partial<typeof suppliers.$inferInsert>) {
    await db.update(suppliers).set(data).where(eq(suppliers.id, id));
  },

  // 🔹 Slett leverandør
  async deleteById(id: string) {
    await db.delete(suppliers).where(eq(suppliers.id, id));
  },
};
