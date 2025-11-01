export const authService = {
  async register({ username, email, password }: { username: string; email: string; password: string }) {
    console.log("Registering user:", { username, email });

    return {
      success: true,
      data: {
        id: Date.now(), 
        username,
        email,
      },
      message: "User registered ",
    };
  },

  async login({ email, password }: { email: string; password: string }) {
    console.log("Login attempt:", { email });

    if (email === "test@example.com" && password === "secret") {
      return {
        success: true,
        data: {
          id: 1,
          email,
          name: "Test User",
        },
        message: "Login successful (fake service)",
      };
    }

    return {
      success: false,
      error: { message: "Invalid credentials", code: 401 },
    };
  },
};
