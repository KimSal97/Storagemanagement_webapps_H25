import { suppliersService } from "./suppliersService";
import type { suppliersTypes } from "./suppliersTypes";

export const suppliersController = {
  async create(request: Request) {
    try {
      const data = (await request.json()) as suppliersTypes;
      await suppliersService.createSupplier(data);
      return Response.json({ success: true });
    } catch (err: any) {
      return new Response(err.message || "Feil ved oppretting av leverandør", {
        status: 400,
      });
    }
  },

  async list() {
    try {
      const suppliers = await suppliersService.getAllSuppliers();
      return Response.json(suppliers);
    } catch {
      return new Response("Kunne ikke hente leverandører", { status: 500 });
    }
  },

  async getById(id: string) {
    try {
      const supplier = await suppliersService.getSupplierById(id);
      return Response.json(supplier);
    } catch (err: any) {
      return new Response(err.message || "Kunne ikke hente leverandør", {
        status: 404,
      });
    }
  },

  async update(id: string, request: Request) {
    try {
      const data = (await request.json()) as Partial<suppliersTypes>;
      const updated = await suppliersService.updateSupplier(id, data);
      return Response.json(updated);
    } catch (err: any) {
      return new Response(err.message || "Kunne ikke oppdatere leverandør", {
        status: 400,
      });
    }
  },

  async remove(id: string) {
    try {
      await suppliersService.deleteSupplier(id);
      return Response.json({ success: true });
    } catch (err: any) {
      return new Response(err.message || "Kunne ikke slette leverandør", {
        status: 400,
      });
    }
  },
};
