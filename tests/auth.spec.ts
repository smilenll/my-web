import { test, expect } from '@playwright/test';

test.describe('Authentication', () => {
  test('auth dialog opens when clicking sign in', async ({ page }) => {
    await page.goto('/');

    // Wait for page to load and then click the sign in button
    await page.waitForLoadState('domcontentloaded');
    await page.locator('[data-test="sign-in-button"]').first().click();

    // Check that auth dialog opens
    await expect(page.locator('[data-test="auth-dialog"]')).toBeVisible();
    await expect(page.locator('[data-test="auth-dialog-title"]')).toBeVisible();

    // Check that Amplify authenticator form is present
    await expect(page.locator('form')).toBeVisible();
  });

  test('auth dialog can be closed', async ({ page }) => {
    await page.goto('/');

    // Wait for page to load and open auth dialog
    await page.waitForLoadState('domcontentloaded');
    await page.locator('[data-test="sign-in-button"]').first().click();
    await expect(page.locator('[data-test="auth-dialog"]')).toBeVisible();

    // Close dialog by clicking outside or escape key
    await page.keyboard.press('Escape');

    // Dialog should be closed
    await expect(page.locator('[data-test="auth-dialog"]')).not.toBeVisible();
  });

  test('navigation shows correct items for unauthenticated user', async ({ page }) => {
    await page.goto('/');

    // Check if we're on mobile or desktop
    const isMobile = await page.locator('[data-test="mobile-menu-button"]').isVisible();

    if (isMobile) {
      // Mobile: Open the hamburger menu to check navigation items
      await page.locator('[data-test="mobile-menu-button"]').click();
      await expect(page.locator('[data-test="mobile-menu"]')).toBeVisible();

      // Should see basic navigation items in mobile menu
      await expect(page.locator('[data-test="mobile-nav-home"]')).toBeVisible();
      await expect(page.locator('[data-test="mobile-nav-contact-us"]')).toBeVisible();

      // Should NOT see admin link for unauthenticated users
      await expect(page.locator('[data-test="mobile-nav-admin"]')).not.toBeVisible();

      // Close mobile menu
      await page.keyboard.press('Escape');
    } else {
      // Desktop: Check navigation items directly
      await expect(page.getByText('Home')).toBeVisible();
      await expect(page.getByText('Contact Us')).toBeVisible();

      // Should NOT see admin link for unauthenticated users
      await expect(page.getByText('Admin')).not.toBeVisible();
    }

    // Should see sign in button (available on both mobile and desktop)
    await expect(page.locator('[data-test="sign-in-button"]').first()).toBeVisible();
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