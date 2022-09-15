import { defineConfig } from "cypress";

export default defineConfig({
  projectId: '4xobn4',
  e2e: {
    baseUrl: 'http://localhost:4200/',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  env: {
    username: 'Cypress',
    email: 'asdasdasdasd@easdasd.com',
    password: 'test123test123',
  },
});
