// src/worker.tsx
import { defineApp, type RequestInfo } from "rwsdk/worker";
import { render, route } from "rwsdk/router";
import { Document } from "@/app/Document";
import { User, users } from "./db/schema/user-schema";
import { db } from "./db";
import { eq } from "drizzle-orm";
import { seedData } from "./db/seed";
import { setCommonHeaders } from "./app/headers";
import { authController } from "./features/auth/authController";
import RegisterPage from "./pages/Registerpage";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./components/Dashboard/Dashboard";
import OrderHistory from "@/components/OrderHistory/OrderHistory";
import SuppliersPage from "./components/Suppliers/SuppliersPage";
import { createId } from "./lib/id";
import { suppliers } from "./db/schema/suppliers-schema";
import { suppliersRoutes } from "./features/suppliers/suppliersRoutes";

// Cloudflare miljøvariabler
export interface Env {
  DB: D1Database;
}

// Context for brukeren
export type AppContext = {
  user?: User;
};

// Midlertidig fake-autentisering (for testing)
const fakeSetUserContext = async (context: RequestInfo) => {
  const { ctx } = context;
  ctx.user = {
    id: 1,
    name: "Test User",
    email: "test@example.com",
    password: "secret",
  };
};

// Appdefinisjon
export default defineApp([
  setCommonHeaders(),
  fakeSetUserContext,
  ...suppliersRoutes,

  // Seeder for testdata
  route("/api/seed", async () => {
    await seedData();
    return Response.json({ success: true });
  }),

  // Healthcheck
  route("/api/health", async () => {
  const allUsers = await db.select().from(users);
  const allSuppliers = await db.select().from(suppliers);

  return Response.json({
    ok: true,
    userCount: allUsers.length,
    supplierCount: allSuppliers.length,
    users: allUsers,
    suppliers: allSuppliers,
  });
}),

  // Auth controller routes
  route("/api/auth/register", authController.register),
  route("/api/auth/login", authController.login),

  // Frontend-routes
  render(Document, [
    route("/", async () => {
      const allUsers = await db.select().from(users);
      return (
        <div style={{ padding: "2rem", maxWidth: "600px", margin: "0 auto" }}>
          <h1>Velkommen!</h1>
          <p>Dette er din Cloudflare-app med D1 og Drizzle.</p>
          <p>Det finnes {allUsers.length} brukere i databasen.</p>
          <a href="/api/seed">Klikk her for å fylle databasen</a>
        </div>
      );
    }),
    route("/login", LoginPage),
    route("/register", RegisterPage),
    route("/dashboard", Dashboard),
    route("/order-history", OrderHistory),
    route("/suppliers", SuppliersPage),
  ]),
]);
