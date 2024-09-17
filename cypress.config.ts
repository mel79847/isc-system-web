import { defineConfig } from "cypress";

export default defineConfig({
  env: {
    ADMIN_EMAIL:"admin@gmail.com",
    ADMIN_PASSWORD:"123456",
    INTERN_EMAIL:"intern@gmail.com",
    INTERN_PASSWORD:"123456",
    CAREER_MANAGER_EMAIL:"director@gmail.com",
    CAREER_MANAGER_PASSWORD:"123456",
    SUPERVISOR_EMAIL:"supervisor@gmail.com",
    SUPERVISOR_PASSWORD:"123456",
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
