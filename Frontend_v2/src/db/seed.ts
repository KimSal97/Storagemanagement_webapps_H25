// src/db/seed.ts
import { createId } from "@/lib/id";
import { db } from "./index";

import { users } from "./schema/user-schema";
import { suppliers } from "./schema/suppliers-schema";
import { products } from "./schema/products-schema";

export async function seedData() {

  console.log("Clearing existing data...");

  // SLETT ALT — seed blir 100% fresh hver gang
  await db.delete(products);
  await db.delete(users);
  await db.delete(suppliers);

  console.log("Database cleared. Seeding fresh data...");

  // Seed USERS
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

  // Seed SUPPLIERS
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

  // Seed PRODUCTS
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
      image: "https://picsum.photos/seed/testvare/300/300",
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
      image: "https://picsum.photos/seed/hammer/300/300",
    },
    {
      id: createId(),
      name: "Skrujern Sett",
      category: "Verktøy",
      stock: 30,
      minStock: 8,
      price: 249,
      supplier: "NorgesGruppen Logistikk",
      location: "Hylle B4",
      image: "https://picsum.photos/seed/skrujern/300/300",
    },
    {
      id: createId(),
      name: "Arbeidshansker",
      category: "Arbeidsutstyr",
      stock: 60,
      minStock: 20,
      price: 99,
      supplier: "Bama Gruppen",
      location: "Hylle D1",
      image: "https://picsum.photos/seed/hansker/300/300",
    },
    {
      id: createId(),
      name: "Boremaskin",
      category: "Verktøy",
      stock: 10,
      minStock: 2,
      price: 899,
      supplier: "Tine SA",
      location: "Hylle B9",
      image: "https://picsum.photos/seed/drill/300/300",
    },
    {
      id: createId(),
      name: "Skrutrekker",
      category: "Verktøy",
      stock: 25,
      minStock: 5,
      price: 59,
      supplier: "NorgesGruppen Logistikk",
      location: "Hylle B6",
      image: "https://picsum.photos/seed/skrutrekker/300/300",
    },
    {
      id: createId(),
      name: "Slegge",
      category: "Verktøy",
      stock: 8,
      minStock: 3,
      price: 399,
      supplier: "Bama Gruppen",
      location: "Hylle A4",
      image: "https://picsum.photos/seed/slegge/300/300",
    },
    {
      id: createId(),
      name: "Målebånd",
      category: "Måleverktøy",
      stock: 70,
      minStock: 15,
      price: 49,
      supplier: "Tine SA",
      location: "Hylle C3",
      image: "https://picsum.photos/seed/maleband/300/300",
    },
    {
      id: createId(),
      name: "Skrutvinge",
      category: "Verktøy",
      stock: 20,
      minStock: 4,
      price: 129,
      supplier: "NorgesGruppen Logistikk",
      location: "Hylle A7",
      image: "https://picsum.photos/seed/skrutvinge/300/300",
    },
    {
      id: createId(),
      name: "Arbeidslampe LED",
      category: "Elektrisk",
      stock: 12,
      minStock: 3,
      price: 349,
      supplier: "Bama Gruppen",
      location: "Hylle E2",
      image: "https://picsum.photos/seed/arbeidslampe/300/300",
    },
  ]);

  console.log("Products seeded");

  console.log("Database seeded successfully");
}
