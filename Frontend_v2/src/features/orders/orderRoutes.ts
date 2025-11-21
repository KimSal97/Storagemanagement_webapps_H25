import { route } from "rwsdk/router";
import { ordersController } from "./ordersController";

export const orderRoutes = [
  route("/api/orders", async ({ request }) => {
    if (request.method === "GET") return ordersController.list(request);
    if (request.method === "POST") return ordersController.create(request);

    return new Response("Method not allowed", { status: 405 });
  }),

  route("/api/orders/:id", async ({ request, params }) => {
    if (request.method === "GET") return ordersController.get(request, params);
    if (request.method === "PUT") return ordersController.update(request, params);
    if (request.method === "DELETE") return ordersController.delete(request, params);

    return new Response("Method not allowed", { status: 405 });
  }),
];
