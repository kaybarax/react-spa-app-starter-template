import { test, expect } from '@playwright/test';

test('notification center renders and auto-dismisses', async ({ page }) => {
  await page.goto('/notification-test');
  // Trigger notification
  await page.locator('#notify-btn').click();
  const notification = page.locator('.notification');
  await expect(notification).toBeVisible();
  await expect(notification).toHaveText('Test notification');
  // Wait for auto-dismiss (duration 3500ms + buffer)
  await page.waitForTimeout(4000);
  await expect(notification).not.toBeVisible();
});

test('notification center dismisses on close button click', async ({ page }) => {
  await page.goto('/notification-test');
  await page.locator('#notify-btn').click();
  const notification = page.locator('.notification');
  await expect(notification).toBeVisible();
  await page.locator('.delete').click();
  await expect(notification).not.toBeVisible();
});
