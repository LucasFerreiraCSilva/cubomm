/** @type {import('@playwright/test').PlaywrightTestConfig} */
module.exports = {
  use: {
    headless: true,
    viewport: { width: 1280, height: 800 }
  },
  projects: [
    { name: 'chromium', use: { browserName: 'chromium' } }
  ]
};
