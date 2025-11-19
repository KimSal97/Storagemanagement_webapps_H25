import { route } from "rwsdk/router";
import { ordersController } from "./ordersController";

export const ordersRoutes = [
  route("/api/orders", async ({ request }) => {
    if (request.method === "POST") return ordersController.create({ request });
    return new Response("Method not allowed", { status: 405 });
  })
];
