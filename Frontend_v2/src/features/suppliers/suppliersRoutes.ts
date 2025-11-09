// src/features/suppliers/supplier.route.ts
import { route } from "rwsdk/router";
import { suppliersController } from "./suppliersController";

export const suppliersRoutes = [
  // Hent alle leverandører
  route("/api/suppliers", async ({ request }) => {
    if (request.method === "GET") {
      return suppliersController.list();
    }
    if (request.method === "POST") {
      return suppliersController.create(request);
    }
    return new Response("Method not allowed", { status: 405 });
  }),
];
