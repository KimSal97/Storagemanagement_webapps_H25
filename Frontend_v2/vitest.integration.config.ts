import { defineConfig } from "vitest/config";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

export default defineConfig({
  resolve: {
    alias: {
      "@": resolve(fileURLToPath(new URL("./src", import.meta.url))),
    },
  },
  test: {
    exclude: ["./src/**/*.test.ts"],
    include: ["./test_utils/**/*.int.test.ts", "./src/**/*.int.test.ts"],
    reporters: ["html", "verbose"],
    outputFile: "./.vitest/html",
    testTimeout: 60_000,
    teardownTimeout: 60_000,
  },
});