import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './src/tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: 1,
  reporter: [['html', { outputFolder: 'playwright-report' }], ['list']],
  timeout: 10000,
  use: {
    baseURL: 'https://reqres.in/api/',
    trace: 'on-first-retry',
  },
});
