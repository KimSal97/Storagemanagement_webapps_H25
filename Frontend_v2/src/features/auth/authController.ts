import type { RequestInfo } from "rwsdk/worker";

export const authController = {
  // POST /api/auth/register
  async register(ctx: RequestInfo) {
    const body = await ctx.request.json();
    return new Response(JSON.stringify({ success: true, data: body }), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  },

  // POST /api/auth/login
  async login(ctx: RequestInfo) {
    const body = await ctx.request.json();
    return new Response(JSON.stringify({ success: true, data: body }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  },
};
