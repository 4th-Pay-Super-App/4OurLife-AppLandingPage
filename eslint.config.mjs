import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Node build scripts under scripts/ are CommonJS by necessity (they are run
    // with `node scripts/x.js`, not bundled), so the app's TypeScript rules
    // would only flag every require(). Generated QR artwork is not source.
    "scripts/**",
    "images/**",
  ]),
]);

export default eslintConfig;
