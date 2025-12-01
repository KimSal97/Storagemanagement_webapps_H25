import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: "node",
    include: ["src/**/*.(int|integration).test.ts"],
    testTimeout: 20000,
  },
});