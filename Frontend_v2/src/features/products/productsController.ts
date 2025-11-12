// src/features/products/productsController.ts
import { productsService } from "./productsService";

export const productsController = {
  async list() {
    try {
      const data = await productsService.getAll();
      return Response.json(data);
    } catch (err: any) {
      return new Response(err.message, { status: 500 });
    }
  },

  async get({ params }: any) {
    try {
      const data = await productsService.getById(params.id);
      return Response.json(data);
    } catch (err: any) {
      return new Response(err.message, { status: 404 });
    }
  },

  async create({ request }: any) {
    try {
      const body = await request.json();
      const data = await productsService.create(body);
      return Response.json(data);
    } catch (err: any) {
      return new Response(err.message, { status: 400 });
    }
  },

  async update({ params, request }: any) {
    try {
      const body = await request.json();
      const data = await productsService.update(params.id, body);
      return Response.json(data);
    } catch (err: any) {
      return new Response(err.message, { status: 400 });
    }
  },

  async remove({ params }: any) {
    try {
      const result = await productsService.delete(params.id);
      return Response.json(result);
    } catch (err: any) {
      return new Response(err.message, { status: 400 });
    }
  },
};
