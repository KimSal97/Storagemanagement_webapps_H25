import { ordersService } from "./ordersService";

type CreateOrderBody = {
  supplierId: string;
  userId: string;
  expected?: string | null;
  items: {
    productId: string;
    orderedQty: number;
    unitCost: number;
  }[];
};

export const ordersController = {
  async create(request: Request) {
    const body = (await request.json()) as CreateOrderBody;

    try {
      const order = await ordersService.create(body);
      return Response.json(order);
    } catch (err: any) {
      console.error("Failed to create order", err);
      return new Response(err.message ?? "Failed to create order", {
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
    const body = (await request.json()) as {
      status?: string;
      expected?: string | null;
    };

    try {
      const order = await ordersService.update(params.id, body);
      return Response.json(order);
    } catch (err: any) {
      return new Response(err.message ?? "Failed to update order", {
        status: 400,
      });
    }
  },

  async delete(_request: Request, params: { id: string }) {
    try {
      const result = await ordersService.remove(params.id);
      return Response.json(result);
    } catch (err: any) {
      return new Response(err.message ?? "Failed to delete order", {
        status: 400,
      });
    }
  },
};
