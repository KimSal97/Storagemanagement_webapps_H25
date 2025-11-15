// src/db/seed.ts
import { createId } from "@/lib/id";
import { db } from "./index";

import { users } from "./schema/user-schema";
import { suppliers } from "./schema/suppliers-schema";

import { products } from "./schema/products-schema";

export async function seedData() {
  const existingUsers = await db.select().from(users);
  const existingSuppliers = await db.select().from(suppliers);
  const existingProducts = await db.select().from(products);

  if (
    existingUsers.length > 0 &&
    existingSuppliers.length > 0 &&
    existingProducts.length > 0
  ) {
    console.log("Database already seeded.");
    return;
  }

  // Seed USERS
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

    console.log("Users seeded");
  }

  // Seed SUPPLIERS
  if (existingSuppliers.length === 0) {
    await db.insert(suppliers).values([
      {
        id: createId(),
        name: "Bama Gruppen",
        contact_person: "Per Frukt",
        email: "post@bama.no",
        phone: "22 11 33 44",
        address: "Veien 80, Oslo",
      },
      {
        id: createId(),
        name: "Tine SA",
        contact_person: "Anne Melk",
        email: "post@tine.no",
        phone: "22 22 55 66",
        address: "Veien 23, Oslo",
      },
      {
        id: createId(),
        name: "NorgesGruppen Logistikk",
        contact_person: "Kari Logistikk",
        email: "post@ng.no",
        phone: "23 45 67 89",
        address: "Veien 12, Oslo",
      },
    ]);

    console.log("Suppliers seeded");
  }

  // Seed PRODUCTS
  if (existingProducts.length === 0) {
    await db.insert(products).values([
      {
        id: createId(),
        name: "Testvare",
        category: "Diverse",
        stock: 50,
        minStock: 10,
        price: 199,
        supplier: "Bama Gruppen",
        location: "Hylle C1",
        image: "https://example.com/test.png",
      },
      {
        id: createId(),
        name: "Hammer",
        category: "Verktøy",
        stock: 15,
        minStock: 5,
        price: 149,
        supplier: "Tine SA",
        location: "Hylle B2",
        image: "https://example.com/hammer.png",
      },
    ]);

    console.log("Products seeded");
  }

  console.log("Database seeded successfully!");
}
