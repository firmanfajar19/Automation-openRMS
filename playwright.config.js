// @ts-check
import { defineConfig, devices } from '@playwright/test';
import { defineBddConfig } from 'playwright-bdd';
import os from 'os';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '.env') });

export default defineConfig({
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    [
      "allure-playwright",
      {
        resultsDir: "reports/allure-results",
        environmentInfo: {
          "Platform": os.platform(),
          "Release": os.release(),
          "Version": os.version(),
          "Node Version": process.version,
        },
      },
    ],
    ['list'],
  ],
  use: {
    baseURL: process.env.BASE_URL,
    navigationTimeout: 60000,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    {
      name: 'Desktop Chrome',
      use: {
        ...devices['Desktop Chrome'],
        viewport: {
          width: 1440, height: 764
        }
      },
      testDir: defineBddConfig({
        outputDir: ".features-gen/web_chrome",
        features: 'tests/web/features/*.feature',
        steps: 'tests/web/step_definitions/*.js',
      })
    },
  ]
});

