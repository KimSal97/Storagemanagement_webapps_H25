import { route } from "rwsdk/router";
import { suppliersController } from "./suppliersController";

export const suppliersRoutes = [
  route("/api/suppliers", async ({ request }) => {
    if (request.method === "GET") {
      return suppliersController.list();
    }
    if (request.method === "POST") {
      return suppliersController.create(request);
    }
    return new Response("Method not allowed", { status: 405 });
  }),

  route("/api/suppliers/:id", async ({ params, request }) => {
    const id = params.id;

    if (request.method === "GET") {
      return suppliersController.getById(id);
    }

    if (request.method === "PUT") {
      return suppliersController.update(id, request);
    }

    if (request.method === "DELETE") {
      return suppliersController.remove(id);
    }

    return new Response("Method not allowed", { status: 405 });
  }),
];
