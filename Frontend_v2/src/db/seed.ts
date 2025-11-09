// src/db/seed.ts
import { createId } from "@/lib/id";
import { db } from "./index";
import { users } from "./schema/user-schema";
import { suppliers } from "./schema/suppliers-schema";

export async function seedData() {
  const existingUsers = await db.select().from(users);
  const existingSuppliers = await db.select().from(suppliers);

  if (existingUsers.length > 0 && existingSuppliers.length > 0) {
    console.log("Database already seeded.");
    return;
  }

  // Seed users
  if (existingUsers.length === 0) {
    await db.insert(users).values([
      {
        id: createId(),
        name: "Admin User",
        email: "admin@example.com",
        password: "1234",
      },
      {
        id: createId(),
        name: "John Doe",
        email: "john@example.com",
        password: "abcd",
      },
    ]);
    console.log("✅ Users seeded");
  }

  //Seed suppliers
  if (existingSuppliers.length === 0) {
    await db.insert(suppliers).values([
      {
        id: createId(),
        name: "Bama Gruppen",
        contactPerson: "Per Frukt",
        email: "post@bama.no",
        phone: "22 11 33 44",
        address: "veien 80, Oslo",
      },
      {
        id: createId(),
        name: "Tine SA",
        contactPerson: "Anne Melk",
        email: "post@tine.no",
        phone: "22 22 55 66",
        address: "Veien 23, Oslo",
      },
      {
        id: createId(),
        name: "NorgesGruppen Logistikk",
        contactPerson: "Kari Logistikk",
        email: "post@ng.no",
        phone: "23 45 67 89",
        address: "Veien 12, Oslo",
      },
    ]);
    console.log("Suppliers seeded");
  }

  console.log("Database seeded successfully!");
}
