import { route } from "rwsdk/router";
import { authController } from "./authController";
import { passwordController } from "./passwordController";

export const authRoutes = [
  route("/api/auth/register", async (ctx) => {
    if (ctx.request.method.toLowerCase() !== "post") {
      return new Response("Method Not Allowed", { status: 405 });
    }
    return authController.register(ctx);
  }),

  route("/api/auth/login", async (ctx) => {
    if (ctx.request.method.toLowerCase() !== "post") {
      return new Response("Method Not Allowed", { status: 405 });
    }
    return authController.login(ctx);
  }),

  route("/api/auth/forgot-password", async (ctx) => {
    if (ctx.request.method.toLowerCase() !== "post") {
      return new Response("Method Not Allowed", { status: 405 });
    }
    return passwordController.forgotPassword(ctx);
  }),

  route("/api/auth/reset-password", async (ctx) => {
    if (ctx.request.method.toLowerCase() !== "post") {
      return new Response("Method Not Allowed", { status: 405 });
    }
    return passwordController.resetPassword(ctx);
  }),
];
