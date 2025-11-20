import { ordersService } from "./ordersService";

export const ordersController = {
  async create(request: Request) {
    const body = (await request.json()) as { items: any[] };

    try {
      const order = await ordersService.create(body.items);
      return Response.json(order);
    } catch (err: any) {
      return new Response(err.message, { status: 400 });
    }
  },

  async list(request: Request) {
    const orders = await ordersService.list();
    return Response.json(orders);
  },

  async get(request: Request, params: { id: string }) {
    try {
      const order = await ordersService.get(params.id);
      return Response.json(order);
    } catch (err: any) {
      return new Response(err.message, { status: 404 });
    }
  },

  async update(request: Request, params: { id: string }) {
    const body = (await request.json()) as { status?: string };

    try {
      const order = await ordersService.update(params.id, body);
      return Response.json(order);
    } catch (err: any) {
      return new Response(err.message, { status: 400 });
    }
  },

  async delete(request: Request, params: { id: string }) {
    try {
      const result = await ordersService.remove(params.id);
      return Response.json(result);
    } catch (err: any) {
      return new Response(err.message, { status: 400 });
    }
  },
};
