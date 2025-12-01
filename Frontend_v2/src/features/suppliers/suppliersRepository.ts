import { db } from "@/db";
import { suppliers } from "@/db/schema/suppliers-schema";
import { eq } from "drizzle-orm";
import { createId } from "@/lib/id";

//Foreløpig løsning for å kunne bytte database i tester
//(kan forbedres med dependency injection senere om ønskelig)
let currentDb = db;


// Bytter database til en annen (f.eks. test-db)
export function setSuppliersRepositoryDb(newDb: typeof db) {
  currentDb = newDb;
}

// Resetter til hoved-databasen
export function resetSuppliersRepositoryDb() {
  currentDb = db;
}

export const suppliersRepository = {
  async create(data: {
    name: string;
    contact_person: string;
    email: string;
    phone: string;
    address?: string;
    status?: "Aktiv" | "Inaktiv";
  }) {
    await currentDb.insert(suppliers).values({
      id: createId(),
      name: data.name,
      contact_person: data.contact_person,
      email: data.email,
      phone: data.phone,
      address: data.address,
      status: data.status ?? "Aktiv",
    });
  },

  async findAll() {
    return await currentDb.select().from(suppliers);
  },

  async findByEmail(email: string) {
    return await currentDb
      .select()
      .from(suppliers)
      .where(eq(suppliers.email, email))
      .get();
  },

  async findById(id: string) {
    return await currentDb
      .select()
      .from(suppliers)
      .where(eq(suppliers.id, id))
      .get();
  },

  async updateById(id: string, data: Partial<typeof suppliers.$inferInsert>) {
    await currentDb
      .update(suppliers)
      .set(data)
      .where(eq(suppliers.id, id));

    return await currentDb
      .select()
      .from(suppliers)
      .where(eq(suppliers.id, id))
      .get();
  },

  async deleteById(id: string) {
    await currentDb.delete(suppliers).where(eq(suppliers.id, id));
  },
};
