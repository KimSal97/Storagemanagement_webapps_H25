import { initDB } from "./index";
import { users, suppliers } from "@/db/schema/schemaindex";
import type { Env } from "@/worker"; 
import { sql } from "drizzle-orm";

// IMPORTANT: pass db through worker (ctx.db), not import db directly
export async function seedData(db: ReturnType<typeof initDB>) {
  // Check existing data
  const existingUsers = await db.select().from(users);
  const existingSuppliers = await db.select().from(suppliers);

  // If both tables already seeded, skip
  if (existingUsers.length > 0 && existingSuppliers.length > 0) {
    console.log("Database already seeded.");
    return;
  }

  // ---------- USERS ----------
  if (existingUsers.length === 0) {
    await db.insert(users).values([
      {
        fullName: "Admin User",
        email: "admin@example.com",
        passwordHash: "1234", // you should hash this later
        role: "admin",
      },
      {
        fullName: "John Doe",
        email: "john@example.com",
        passwordHash: "abcd",
        role: "user",
      },
    ]);

    console.log("✅ Users seeded");
  }

  // ---------- SUPPLIERS ----------
  if (existingSuppliers.length === 0) {
    await db.insert(suppliers).values([
      {
        name: "Bama Gruppen",
        email: "post@bama.no",
        phone: "22 11 33 44",
        apiKey: null,
      },
      {
        name: "Tine SA",
        email: "post@tine.no",
        phone: "22 22 55 66",
        apiKey: null,
      },
      {
        name: "NorgesGruppen Logistikk",
        email: "post@ng.no",
        phone: "23 45 67 89",
        apiKey: null,
      },
    ]);

    console.log("✅ Suppliers seeded");
  }

  console.log("🎉 Database seeded successfully!");
}
