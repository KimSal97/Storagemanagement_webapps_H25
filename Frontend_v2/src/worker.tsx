// src/worker.tsx
import { defineApp, type RequestInfo } from "rwsdk/worker";
import { render, route } from "rwsdk/router";

import { Document } from "@/app/Document";
import { setCommonHeaders } from "@/app/headers";

import { initDB } from "@/db"; // NEW — uses ctx.db
import { seedData } from "@/db/seed";

import { users, suppliers } from "@/db/schema/schemaindex";

import { authRoutes } from "@/features/auth/authRoutes";
import { suppliersRoutes } from "@/features/suppliers/suppliersRoutes";

// Frontend pages
import RegisterPage from "@/pages/Registerpage";
import LoginPage from "@/pages/LoginPage";
import Dashboard from "@/components/Dashboard/Dashboard";
import OrderHistory from "@/components/OrderHistory/OrderHistory";
import SuppliersPage from "@/components/Suppliers/SuppliersPage";
import ForgotPasswordPage from "@/pages/ForgotPasswordPage";
import ResetPasswordPage from "@/pages/ResetPasswordPage";

// ------------------------------------
// Cloudflare Env Type
// ------------------------------------
export interface Env {
  DB: D1Database; // From wrangler.json → binding: "DB"
}

// ------------------------------------
// App Context Type
// ------------------------------------
export type AppContext = {
  user?: { id: string; name: string; email: string };
  db: ReturnType<typeof initDB>; // DB instance available everywhere
};

// Fake Auth for Development
const fakeSetUserContext = async (
  context: RequestInfo<AppContext>,
  next: () => Promise<void>
) => {
  context.ctx.user = {
    id: "1",
    name: "Test User",
    email: "test@example.com",
  };
  await next();
};

// Database Injection Middleware
const attachDB = async (
  context: RequestInfo<AppContext> & { env: Env },
  next: () => Promise<void>
) => {
  const { env, ctx } = context;
  ctx.db = initDB(env); 
  await next();
};



// ------------------------------------
// Worker App Definition
// ------------------------------------
export default defineApp<Env, AppContext>([
  setCommonHeaders(),
  attachDB,            // <-- injects ctx.db
  fakeSetUserContext,  // <-- for dev only

  ...authRoutes,
  ...suppliersRoutes,

  // Seeder endpoint
  route("/api/seed", async ({ ctx }) => {
    await seedData(ctx.db);
    return Response.json({ success: true });
  }),

  // Health check
  route("/api/health", async ({ ctx }) => {
    const allUsers = await ctx.db.select().from(users);
    const allSuppliers = await ctx.db.select().from(suppliers);

    return Response.json({
      ok: true,
      userCount: allUsers.length,
      supplierCount: allSuppliers.length,
      users: allUsers,
      suppliers: allSuppliers,
    });
  }),

  // Frontend routes
  render(Document, [
    route("/", async ({ ctx }) => {
      const allUsers = await ctx.db.select().from(users);

      return (
        <div style={{ padding: "2rem", maxWidth: "600px", margin: "0 auto" }}>
          <h1>Velkommen!</h1>
          <p>Dette er din Cloudflare-app med D1 og Drizzle.</p>
          <p>Det finnes {allUsers.length} brukere i databasen.</p>
          <a href="/api/seed">Klikk her for å fylle databasen</a>
        </div>
      );
    }),

    // Auth pages
    route("/login", LoginPage),
    route("/register", RegisterPage),
    route("/forgot-password", ForgotPasswordPage),
    route("/reset-password", ResetPasswordPage),

    // App dashboard pages
    route("/dashboard", Dashboard),
    route("/order-history", OrderHistory),
    route("/suppliers", SuppliersPage),
  ]),
]);
