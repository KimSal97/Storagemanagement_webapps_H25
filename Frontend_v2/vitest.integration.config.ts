import { defineConfig } from "vitest/config";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

export default defineConfig({
  resolve: {
    alias: {
      //Resolve alias for å bruke "@" som src-mappe, gjør ikke som den skal desverre.
      "@": resolve(__dirname, "src"), 

      //Stub for Cloudflare Workers miljø i tester
      "cloudflare:workers": resolve(
        __dirname,
        "test_utils/cloudflare-workers-stub.ts"
      ),
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