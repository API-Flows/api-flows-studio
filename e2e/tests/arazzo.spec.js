// @ts-check
const { test, expect } = require('@playwright/test');


test('load Arazzo example', async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveTitle(/API Flows/);

  await page.getByRole('button', { name: 'Try out the Arazzo example \'Petstore - Apply Coupons\'' }).click();
  await page.getByRole('button', { name: 'GO' }).click();

  // click on workflow
  await page.getByRole('button', { name: 'apply-coupon' }).click();

  await page.getByRole('tab', { name: 'Info' }).click();
  await page.getByRole('button', { name: 'Errors (0)' }).click();
});

