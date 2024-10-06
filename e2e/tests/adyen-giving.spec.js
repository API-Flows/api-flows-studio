// @ts-check
const { test, expect } = require('@playwright/test');



test('load Giving', async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveTitle(/API Flows/);

  await page.getByRole('button', { name: 'Try out the Adyen Giving workflow' }).click();
  await page.getByRole('button', { name: 'GO' }).click();

  // click on workflow
  await page.getByRole('button', { name: 'giving' }).click();

  await page.getByRole('tab', { name: 'Info' }).click();
  await page.getByRole('button', { name: 'Errors (0)' }).click();
});

