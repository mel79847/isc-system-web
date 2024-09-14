import { defineConfig } from "cypress";

export default defineConfig({
  env: {
    ADMIN_EMAIL: "admin@gmail.com",
    ADMIN_PASSWORD: "123456",
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
