// src/features/auth/authRoutes.ts
import { route } from "rwsdk/router";
import { authController } from "./authController";
import { passwordController } from "./passwordController";

export const authRoutes = [
  // POST /api/auth/register
  route("/api/auth/register", async (ctx) => {
    if (ctx.request.method.toLowerCase() !== "post") {
      return new Response("Method Not Allowed", { status: 405 });
    }
    return authController.register(ctx);
  }),

  // POST /api/auth/login
  route("/api/auth/login", async (ctx) => {
    if (ctx.request.method.toLowerCase() !== "post") {
      return new Response("Method Not Allowed", { status: 405 });
    }
    return authController.login(ctx);
  }),

  // POST /api/auth/forgot-password
  route("/api/auth/forgot-password", async (ctx) => {
    if (ctx.request.method.toLowerCase() !== "post") {
      return new Response("Method Not Allowed", { status: 405 });
    }
    return passwordController.forgotPassword(ctx);
  }),

  // POST /api/auth/reset-password
  route("/api/auth/reset-password", async (ctx) => {
    if (ctx.request.method.toLowerCase() !== "post") {
      return new Response("Method Not Allowed", { status: 405 });
    }
    return passwordController.resetPassword(ctx);
  }),
];
