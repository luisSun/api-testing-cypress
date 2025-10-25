const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "jy6b7p",
  e2e: {
    baseUrl: 'https://api.restful-api.dev',
    reporter: 'cypress-mochawesome-reporter',
    reporterOptions: {
      charts: true,
      reportPageTitle: 'Projeto de Cypress',
      embeddedScreenshots: true,
      inlineAssets: true,
      saveAllAttempts: false,
    },
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
      // implement node event listeners here
    },
  },
});
