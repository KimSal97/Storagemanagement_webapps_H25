// src/worker.tsx
import { defineApp, type RequestInfo } from "rwsdk/worker";
import { render, route } from "rwsdk/router";
import { Document } from "@/app/Document";
import { db } from "@/db";
import { eq } from "drizzle-orm";
import { seedData } from "@/db/seed";
import { setCommonHeaders } from "@/app/headers";

import { users } from "@/db/schema/user-schema";
import { suppliers } from "@/db/schema/suppliers-schema";

import { authRoutes } from "@/features/auth/authRoutes";
import { suppliersRoutes } from "@/features/suppliers/suppliersRoutes";
import { productsRoutes } from "@/features/products/productsRoutes";

import RegisterPage from "@/pages/Registerpage";
import OrderPage from "@/pages/OrderPage";
import LoginPage from "@/pages/LoginPage";
import Dashboard from "@/components/Dashboard/Dashboard";
import OrderHistory from "@/components/OrderHistory/OrderHistory";
import SuppliersPage from "@/components/Suppliers/SuppliersPage";
import ForgotPasswordPage from "@/pages/ForgotPasswordPage";
import ResetPasswordPage from "@/pages/ResetPasswordPage";
import ProductsPage from "./pages/ProductsPage";

// App context 
export interface Env {
  DB: D1Database;
}

export type AppContext = {
  user?: { id: string; name: string; email: string };
};

// Midlertidig fake-auth (for utvikling)
const fakeSetUserContext = async (context: RequestInfo) => {
  const { ctx } = context;
  ctx.user = {
    id: "1",
    name: "Test User",
    email: "test@example.com",
  };
};

// Appdefinisjon
export default defineApp([
  setCommonHeaders(),
  fakeSetUserContext,

  ...authRoutes,
  ...suppliersRoutes,
  ...productsRoutes,

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

  // Home 
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

    // Frontend-ruter
    route("/login", LoginPage),
    route("/register", RegisterPage),
    route("/forgot-password", ForgotPasswordPage),
    route("/reset-password", ResetPasswordPage),
    route("/dashboard", Dashboard),
    route("/order", OrderPage),
    route("/order-history", OrderHistory),
    route("/suppliers", SuppliersPage),
    route("/products", ProductsPage)
  ]),
]);
