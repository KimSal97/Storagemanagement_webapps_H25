import { db } from "@/db";
import { users } from "@/db/schema/user-schema";
import { eq } from "drizzle-orm";
import type { Result } from "@/types/result"; 
import { createId } from "@/lib/id"; 
export interface AuthRepository {
  findByEmail(email: string): Promise<Result<typeof users.$inferSelect>>;
  createUser(data: { name: string; email: string; password: string }): Promise<Result<typeof users.$inferSelect>>;
}

export function createAuthRepository(): AuthRepository {
  return {
    async findByEmail(email: string) {
      try {
        const user = await db.select().from(users).where(eq(users.email, email)).get();

        if (!user) {
          return {
            success: false,
            error: { code: 404, message: "User not found" },
          };
        }

        return { success: true, data: user };
      } catch (error) {
        console.error("Error in findByEmail:", error);
        return {
          success: false,
          error: {
            code: 500,
            message: (error as Error)?.message ?? "Failed to fetch user from DB",
          },
        };
      }
    },

    async createUser(data) {
      try {
        const [newUser] = await db
          .insert(users)
          .values({
            id: createId(),
            name: data.name,
            email: data.email,
            password: data.password, 
          })
          .returning();

        return { success: true, data: newUser };
      } catch (error) {
        console.error("Error creating user:", error);
        return {
          success: false,
          error: {
            code: 500,
            message: (error as Error)?.message ?? "Failed to create user in DB",
          },
        };
      }
    },
  };
}

export const authRepository = createAuthRepository();
