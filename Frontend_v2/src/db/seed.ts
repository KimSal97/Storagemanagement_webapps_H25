//src/db/seed.ts
import { createId } from "@/lib/id";
import { db } from "./index";
import { users } from "./schema/user-schema";

export async function seedData() {
  const existingUsers = await db.select().from(users);
  if (existingUsers.length > 0) {
    console.log(" Database already seeded.");
    return;
  }

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

  console.log("Database seeded successfully!");
}