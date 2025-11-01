import type { RequestInfo } from "rwsdk/worker";
import { authService } from "./authService";

export const authController = {
  // POST /api/auth/register
  async register(ctx: RequestInfo) {
    try {
      const body = await ctx.request.json<{ username: string; email: string; password: string }>();
      const result = await authService.register(body);
      return Response.json(result, {
        status: result.success ? 201 : result.error?.code || 400,
        headers: { "Content-Type": "application/json" },
      });
    } catch {
      return Response.json({ success: false, message: "Invalid JSON body" }, { status: 400 });
    }
  },

  // POST /api/auth/login
  async login(ctx: RequestInfo) {
    try {
      const body = await ctx.request.json<{ username: string; email: string; password: string }>();
      const result = await authService.login(body);
      return Response.json(result, {
        status: result.success ? 200 : result.error?.code || 400,
        headers: { "Content-Type": "application/json" },
      });
    } catch {
      return Response.json({ success: false, message: "Invalid JSON body" }, { status: 400 });
    }
  },
};
