import { ordersService } from "./ordersService";

export const ordersController = {
  async create(request: Request) {
    const body = (await request.json()) as {
      items: { productId: string; productName: string; orderedQty: number; unitCost: number }[];
    };

    try {
      const order = await ordersService.create(body.items);
      return Response.json(order, { status: 201 });
    } catch (err: any) {
      console.error("Create order error:", err);
      return new Response(err.message ?? "Could not create order", {
        status: 400,
      });
    }
  },

  async list(_request: Request) {
    const orders = await ordersService.list();
    return Response.json(orders);
  },

  async get(_request: Request, params: { id: string }) {
    try {
      const order = await ordersService.get(params.id);
      return Response.json(order);
    } catch (err: any) {
      return new Response(err.message ?? "Order not found", { status: 404 });
    }
  },

  async update(request: Request, params: { id: string }) {
    const body = (await request.json()) as { status?: string };

    try {
      const order = await ordersService.update(params.id, body);
      return Response.json(order);
    } catch (err: any) {
      return new Response(err.message ?? "Could not update order", {
        status: 400,
      });
    }
  },

  async delete(_request: Request, params: { id: string }) {
    try {
      const result = await ordersService.remove(params.id);
      return Response.json(result);
    } catch (err: any) {
      return new Response(err.message ?? "Could not delete order", {
        status: 400,
      });
    }
  },
};
