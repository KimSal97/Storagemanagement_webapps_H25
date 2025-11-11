import { db } from "@/db";
import { users } from "@/db/schema/user-schema";
import { passwordResets } from "@/db/schema/password-reset-schema";
import { eq } from "drizzle-orm";
import { createId } from "@/lib/id";

export const passwordController = {
  async forgotPassword({ request }: { request: Request }) {
    const { email } = await request.json<{ email: string }>();
    const user = await db.select().from(users).where(eq(users.email, email)).get();

    if (!user) {
      return new Response("Bruker ikke funnet", { status: 404 });
    }

    const token = createId();
    const expires = Date.now() + 1000 * 60 * 15; 

    await db.insert(passwordResets).values({
      id: createId(),
      userId: user.id,
      token,
      expiresAt: expires,
    });

    // TODO: Bytt ut dette med Cloudflare Email (send via Worker)
    console.log(`🔗 Reset-lenke: http://localhost:5173/reset-password?token=${token}`);

    return Response.json({ success: true });
  },

  async resetPassword({ request }: { request: Request }) {
    const { token, newPassword } = await request.json<{ token: string; newPassword: string }>();

    const reset = await db.select().from(passwordResets).where(eq(passwordResets.token, token)).get();

    if (!reset || reset.expiresAt < Date.now()) {
      return new Response("Ugyldig eller utløpt token", { status: 400 });
    }

    await db.update(users)
      .set({ password: newPassword })
      .where(eq(users.id, reset.userId));

    await db.delete(passwordResets).where(eq(passwordResets.token, token));

    return Response.json({ success: true });
  },
};
