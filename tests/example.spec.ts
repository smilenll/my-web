import { test, expect } from '@playwright/test';

test('homepage loads correctly', async ({ page }) => {
  await page.goto('/');

  // Check that the page title is correct
  await expect(page).toHaveTitle(/MyWeb/);

  // Check that the main navigation is visible (use more specific selector)
  await expect(page.getByRole('banner')).toBeVisible();
  await expect(page.locator('header').getByText('MyWeb')).toBeVisible();

  // Check that hero section is visible
  await expect(page.getByText('Welcome to MyWeb')).toBeVisible();

  // Check that navigation items are present (use navigation role)
  await expect(page.getByRole('link', { name: 'Home' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Contact Us' })).toBeVisible();

  // Check theme toggle is present
  await expect(page.getByRole('button', { name: /toggle theme/i })).toBeVisible();

  // Check user menu is present (first one - desktop version)
  await expect(page.getByRole('button', { name: 'Sign in' }).first()).toBeVisible();
});