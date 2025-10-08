import { test, expect } from '@playwright/test';

test('homepage loads correctly', async ({ page }) => {
  await page.goto('/');

  // Check that the page title is correct
  await expect(page).toHaveTitle("SmiL");

  // Check that the main navigation is visible (use data-test attributes)
  await expect(page.getByRole('banner')).toBeVisible();
  await expect(page.locator('[data-test="site-logo"]')).toBeVisible();

  // Check that hero section is visible
  await expect(page.locator('[data-test="hero-section"]')).toBeVisible();

  // Check that navigation items are present
  // On mobile, navigation items are in a hamburger menu
  const isMobile = await page.locator('[data-test="mobile-menu-button"]').isVisible();

  if (isMobile) {
    // Open mobile menu first
    await page.locator('[data-test="mobile-menu-button"]').click();
    await expect(page.locator('[data-test="mobile-menu"]')).toBeVisible();

    // Check mobile navigation items
    await expect(page.locator('[data-test="mobile-nav-home"]')).toBeVisible();
    await expect(page.locator('[data-test="mobile-nav-contact-me"]')).toBeVisible();

    // Close mobile menu
    await page.keyboard.press('Escape');
  } else {
    // Desktop navigation - scope to the navigation menu to avoid conflicts with page content
    const nav = page.getByRole('banner');
    await expect(nav.getByRole('link', { name: 'Home' })).toBeVisible();
    await expect(nav.getByRole('link', { name: 'Contact Me' })).toBeVisible();
  }

  // Check theme toggle is present (different selectors for mobile/desktop)
  if (isMobile) {
    await expect(page.locator('[data-test="theme-toggle-mobile"]')).toBeVisible();
  } else {
    await expect(page.locator('[data-test="theme-toggle"]')).toBeVisible();
  }

  // Check user menu is present (there are both mobile and desktop versions)
  // At least one should be visible, but mobile versions might be conditionally hidden by CSS
  const visibleSignInButton = page.locator('[data-test="sign-in-button"]:visible').first();
  await expect(visibleSignInButton).toBeVisible();
});