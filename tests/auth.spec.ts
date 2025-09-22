import { test, expect } from '@playwright/test';

test.describe('Authentication', () => {
  test('auth dialog opens when clicking sign in', async ({ page }) => {
    await page.goto('/');

    // Click the user menu (sign in button) - use first one for desktop
    await page.getByRole('button', { name: 'Sign in' }).first().click();

    // Check that auth dialog opens
    await expect(page.getByRole('dialog')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Sign In' })).toBeVisible();

    // Check that Amplify authenticator form is present
    await expect(page.locator('form')).toBeVisible();
  });

  test('auth dialog can be closed', async ({ page }) => {
    await page.goto('/');

    // Open auth dialog
    await page.getByRole('button', { name: 'Sign in' }).first().click();
    await expect(page.getByRole('dialog')).toBeVisible();

    // Close dialog by clicking outside or escape key
    await page.keyboard.press('Escape');

    // Dialog should be closed
    await expect(page.getByRole('dialog')).not.toBeVisible();
  });

  test('navigation shows correct items for unauthenticated user', async ({ page }) => {
    await page.goto('/');

    // Should see basic navigation items
    await expect(page.getByText('Home')).toBeVisible();
    await expect(page.getByText('Contact Us')).toBeVisible();

    // Should NOT see admin link for unauthenticated users
    await expect(page.getByText('Admin')).not.toBeVisible();

    // Should see sign in button
    await expect(page.getByRole('button', { name: 'Sign in' }).first()).toBeVisible();
  });

  // Note: For actual sign-in testing with AWS Amplify, you'd need to:
  // 1. Set up test credentials in environment variables
  // 2. Use Amplify's test utilities or mock authentication
  // 3. Handle the OAuth flow properly

  test.skip('user can sign in with valid credentials', async ({ page }) => {
    // This test is skipped because it requires real AWS Cognito credentials
    // To implement:
    // 1. Set up test user in Cognito
    // 2. Add credentials to environment variables
    // 3. Fill in the authentication form
    // 4. Verify successful login state

    await page.goto('/');
    await page.getByRole('button', { name: /sign in/i }).click();

    // Fill in credentials (would need actual test credentials)
    // await page.getByLabel('Email').fill(process.env.TEST_EMAIL);
    // await page.getByLabel('Password').fill(process.env.TEST_PASSWORD);
    // await page.getByRole('button', { name: /sign in/i }).click();

    // Verify signed in state
    // await expect(page.getByRole('button', { name: /user profile/i })).toBeVisible();
  });
});