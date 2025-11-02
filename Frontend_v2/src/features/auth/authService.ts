import { authRepository } from "./authRepository";
import type { Result } from "@/types/result";

type RegisterResponse = {
  id: string;
  username: string;
  email: string;
};

type LoginResponse = {
  id: string;
  email: string;
  name: string;
};

export const authService = {
  async register({
    username,
    email,
    password,
  }: {
    username: string;
    email: string;
    password: string;
  }): Promise<Result<RegisterResponse>> {
    try {
      const existing = await authRepository.findByEmail(email);
      if (existing.success) {
        return {
          success: false,
          error: { message: "E-post er allerede registrert", code: 409 },
        };
      }

      const created = await authRepository.createUser({
        name: username,
        email,
        password,
      });
      if (!created.success) return created;

      return {
        success: true,
        data: {
          id: created.data.id,
          username: created.data.name,
          email: created.data.email,
        },
      };
    } catch (err) {
      return {
        success: false,
        error: { message: (err as Error).message ?? "Uventet feil" },
      };
    }
  },

  async login({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<Result<LoginResponse>> {
    try {
      const user = await authRepository.findByEmail(email);
      if (!user.success) {
        return {
          success: false,
          error: { message: "Bruker ikke funnet", code: 404 },
        };
      }

      if (user.data.password !== password) {
        return {
          success: false,
          error: { message: "Feil passord", code: 401 },
        };
      }

      return {
        success: true,
        data: {
          id: user.data.id,
          email: user.data.email,
          name: user.data.name,
        },
      };
    } catch (err) {
      return {
        success: false,
        error: { message: (err as Error).message ?? "Uventet feil" },
      };
    }
  },
};
