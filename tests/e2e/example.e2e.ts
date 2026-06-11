import { test, expect } from '@playwright/test';

test('shows page 1 with the app title', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Page 1/);
  await expect(page.getByText("Page 1 Example : Let's start here!")).toBeVisible();
});

test('navigates between public pages via the header menu', async ({ page }) => {
  await page.goto('/');

  await page.locator('#nav-\\/page-2-example a').click();
  await expect(page).toHaveURL(/page-2-example/);
  await expect(page.getByText('Page 2 Example : The design philosophy!')).toBeVisible();

  await page.locator('#nav-\\/page-3-example a').click();
  await expect(page).toHaveURL(/page-3-example/);

  // The TanStack Query demo page renders regardless of network availability
  await page.locator('#nav-\\/page-5-server-data-example a').click();
  await expect(page).toHaveURL(/page-5-server-data-example/);
  await expect(page.getByText('Page 5 Example : Server data, the TanStack Query way!')).toBeVisible();
});

test('redirects unauthenticated visits to secured pages to the login view', async ({ page }) => {
  await page.goto('/secured-app-home');
  await expect(page).toHaveURL(/login-and-registration/);
});

test('signs up, logs in, uses the secured app, and logs out', async ({ page }) => {
  await page.goto('/login-and-registration');

  // Sign up a new user (stored in the browser's IndexedDB)
  await page.locator('.login-action span', { hasText: 'Sign Up' }).click();
  await page.locator('#name').fill('Kevin');
  await page.locator('#username-or-email').fill('kevin@example.com');
  await page.locator('#password').fill('secret123');
  await page.locator('#confirm-password').fill('secret123');
  await page.getByRole('button', { name: 'Sign Up' }).click();

  await expect(page.getByText('Sign up success')).toBeVisible();

  // The view switches back to the login form after sign up
  await expect(page.getByRole('button', { name: 'Login' })).toBeVisible({ timeout: 5000 });

  // Log in with the new credentials
  await page.locator('#username-or-email').fill('kevin@example.com');
  await page.locator('#password').fill('secret123');
  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page.getByText('Login success')).toBeVisible();
  await expect(page).toHaveURL(/secured-app-home/, { timeout: 10000 });
  await expect(page.getByText('You have accessed a page such as this')).toBeVisible();

  // The store-managed click counter works
  await page.getByRole('button', { name: 'Click me' }).click();
  await page.getByRole('button', { name: 'Click me' }).click();
  await expect(page.getByText('You have clicked 2')).toBeVisible();

  // Secured page 2 is reachable while logged in
  await page.locator(`#nav-\\/secured-page-2-example a`).click();
  await expect(page).toHaveURL(/secured-page-2-example/);
  await expect(page.getByText('You have accessed another such page')).toBeVisible();

  // Log out returns to the login view, and secured pages are guarded again
  await page.getByText('Log out').click();
  await expect(page).toHaveURL(/login-and-registration/);

  await page.goto('/secured-app-home');
  await expect(page).toHaveURL(/login-and-registration/);
});
