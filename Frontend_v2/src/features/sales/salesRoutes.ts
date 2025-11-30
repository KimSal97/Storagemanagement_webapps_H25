import { route } from "rwsdk/router";
import { salesController } from "./salesController";

export const salesRoutes = [
  route("/api/sales", async ({ request, ctx }) => {
    if (request.method === "GET") return salesController.list();
    if (request.method === "POST") return salesController.create(request, ctx);

    return new Response("Method not allowed", { status: 405 });
  }),

  route("/api/sales/:id", async ({ request, params }) => {
    if (request.method === "GET") return salesController.get(request, params);
    if (request.method === "DELETE") return salesController.delete(request, params);

    return new Response("Method not allowed", { status: 405 });
  }),
];
