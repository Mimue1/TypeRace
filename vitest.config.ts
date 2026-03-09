// vitest.config.ts

import {defineConfig} from 'vitest/config'

export default defineConfig({
    test: {
        globals: true,
        cache: {
        dir: "../../node_modules/.vitest",
        },
        environment: "jsdom",
        include: ["src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],

        reporters: ["default"],
        coverage: {
        reportsDirectory: "../../coverage/apps/frontend",
        provider: "v8",
        },
        setupFiles: "./src/setupTests.ts",
  },
});