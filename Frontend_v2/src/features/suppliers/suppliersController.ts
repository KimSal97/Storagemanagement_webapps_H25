import { suppliersService } from "./suppliersService";

export const supplierController = {
  async create(request: Request) {
    try {
      const data = await request.json();
      await suppliersService.createSupplier(data);
      return Response.json({ success: true });
    } catch (err: any) {
      return new Response(err.message || "Feil ved oppretting av leverandør", { status: 400 });
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
};
