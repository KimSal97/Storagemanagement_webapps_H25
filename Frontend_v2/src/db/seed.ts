//src/db/seed.ts
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
      name: "Admin User",
      email: "admin@example.com",
      password: "1234",
    },
    {
      name: "John Doe",
      email: "john@example.com",
      password: "abcd",
    },
  ]);

  console.log("Database seeded successfully!");
}