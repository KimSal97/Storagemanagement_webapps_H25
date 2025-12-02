import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    exclude: ["./src/**/*.test.ts"],
    include: ["./test_utils/**/*.int.test.ts", "./src/**/*.int.test.ts"],
    reporters: ["html", "verbose"],
    outputFile: "./.vitest/html",
    alias: {
      "@/": new URL("./src/", import.meta.url).pathname,
        "cloudflare-workers-stub": new URL("./test_utils/cloudflare-workers-stub.ts", import.meta.url)
        .pathname,
    },
    testTimeout: 60_000,
    teardownTimeout: 60_000,
  },
});