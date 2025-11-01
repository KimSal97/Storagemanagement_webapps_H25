import { authRepository } from "./authRepository";

export const authService = {
  async register({ username, email, password }: { username: string; email: string; password: string }) {
    const existing = await authRepository.findByEmail(email);
    if (existing.success) {
      return { success: false, error: { message: "E-post allerede registrert", code: 409 } };
    }

    const created = await authRepository.create({ name: username, email, password });
    if (!created.success) return created;

    return {
      success: true,
      data: {
        id: created.data.id,
        username: created.data.name,
        email: created.data.email,
      },
      message: "User registered successfully",
    };
  },

  async login({ email, password }: { email: string; password: string }) {
    const user = await authRepository.findByEmail(email);
    if (!user.success) {
      return { success: false, error: { message: "User not found", code: 404 } };
    }

    if (user.data.password !== password) {
      return { success: false, error: { message: "Invalid credentials", code: 401 } };
    }

    return {
      success: true,
      data: {
        id: user.data.id,
        email: user.data.email,
        name: user.data.name,
      },
      message: "Login successful",
    };
  },
};
