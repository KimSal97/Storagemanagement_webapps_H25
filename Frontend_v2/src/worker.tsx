// src/worker.tsx


import { defineApp, type RequestInfo } from "rwsdk/worker";
import { render, route } from "rwsdk/router";
import { Document } from "@/app/Document";
import SeedResult from "./app/pages/SeedResult";

import { User, users } from "./db/schema/user-schema";
import { setCommonHeaders } from "./app/headers";
import { db } from "./db";
import { seedData } from "./db/seed";
import { eq } from "drizzle-orm";

// 🌍 Cloudflare miljøvariabler
export interface Env {
  DB: D1Database;
}

// 💾 Context for brukeren
export type AppContext = {
  user?: User;
};

// 🔐 Midlertidig fake-autentisering (for testing)
const fakeSetUserContext = async (context: RequestInfo) => {
  const { ctx } = context;
  ctx.user = {
    id: 1,
    name: "Test User",
    email: "test@example.com",
    password: "secret", // ✅ lagt til
  };
};

// 🚀 Appdefinisjon
export default defineApp([
  setCommonHeaders(),
  fakeSetUserContext,

  // 🌱 Seeder (for å fylle databasen manuelt)
  route("/api/seed", async () => {
    await seedData();
    return Response.json({ success: true });
  }),

  // 🔍 Sjekk at databasen er tilgjengelig
  route("/api/health", async () => {
    const usersCount = (await db.select().from(users)).length;
    return Response.json({ ok: true, users: usersCount });
  }),

  // 🔑 Enkel login-rute (test)
  route("/api/login", async ({ request }) => {
  const { email, password } = await request.json<{ email: string; password: string }>(); // 👈 typet
  const found = await db.select().from(users).where(eq(users.email, email)).get();

  if (!found || found.password !== password) {
    return new Response("Invalid credentials", { status: 401 });
  }

  return Response.json({ message: "Login successful", user: found });
}),


  // 🏠 Enkel forside
  render(Document, [
    route("/", async () => {
      const allUsers = await db.select().from(users);
      return (
        <div style={{ padding: "2rem", maxWidth: "600px", margin: "0 auto" }}>
          <h1>Velkommen!</h1>
          <p>Dette er din Cloudflare-app med D1 og Drizzle.</p>
          <p>Det finnes {allUsers.length} brukere i databasen.</p>
          <a href="/api/seed">Klikk her for å fylle databasen</a>
          <SeedResult />
        </div>
      );
    }),
  ]),
]);
