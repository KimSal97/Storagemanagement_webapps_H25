import { route } from "rwsdk/router";


export const authRoutes = [
  // POST /api/auth/register
  route("/register", async (ctx) => {
    if (ctx.request.method.toLowerCase() !== "post") {
      return new Response("Method Not Allowed", { status: 405 });
    }
    return authController.register(ctx);
  }),

  // POST /api/auth/login
  route("/login", async (ctx) => {
    if (ctx.request.method.toLowerCase() !== "post") {
      return new Response("Method Not Allowed", { status: 405 });
    }
    return authController.login(ctx);
  }),
  ];