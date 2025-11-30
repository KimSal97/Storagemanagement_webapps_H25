import { salesService } from "./salesService";

export const salesController = {
    async create(request: Request, ctx: any) {
        const body = (await request.json()) as {
            productId: string;
            quantity: number;
        };

        const createdBy = ctx.user.id;

        try {
            const sale = await salesService.create({
                productId: body.productId,
                quantity: body.quantity,
                createdBy,
            });

            return Response.json(sale, { status: 201 });
        } catch (err: any) {
            return new Response(err.message ?? "Could not register sale", {
                status: 400,
            });
        }
    },

    async list() {
        const data = await salesService.list();
        return Response.json(data);
    },

    async get(_request: Request, params: { id: string }) {
        try {
            const sale = await salesService.get(params.id);
            return Response.json(sale);
        } catch (err: any) {
            return new Response(err.message ?? "Sale not found", { status: 404 });
        }
    },

    async delete(_request: Request, params: { id: string }) {
        try {
            const result = await salesService.remove(params.id);
            return Response.json(result);
        } catch (err: any) {
            return new Response(err.message ?? "Could not delete sale", { status: 400 });
        }
    },
};
