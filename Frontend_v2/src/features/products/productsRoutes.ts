import { route } from "rwsdk/router";
import { productsController } from "./productsController";

export const productsRoutes = [
  route("/api/products", async ({ request }) => {
    if (request.method === "GET") return productsController.list();
    if (request.method === "POST") return productsController.create({ request });
    return new Response("Method not allowed", { status: 405 });
  }),

  route("/api/products/:id", async ({ request, params }) => {
    if (request.method === "GET") return productsController.get({ params });
    if (request.method === "PUT") return productsController.update({ params, request });
    if (request.method === "DELETE") return productsController.remove({ params });
    return new Response("Method not allowed", { status: 405 });
  }),
];
