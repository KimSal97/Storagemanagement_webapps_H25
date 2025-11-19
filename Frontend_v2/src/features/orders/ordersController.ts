import { ordersService } from "./ordersService";

export const ordersController = {
  async create({ request }) {
    const data = await request.json();
    return Response.json(await ordersService.createOrder(data));
  },
};
