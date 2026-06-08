import { test, expect } from '../utils/helpers';
import { USER_CREDENTIALS, ERROR_MESSAGES } from '../fixtures/test-data';

/**
 * Test Case 1: User Login with Valid Credentials
 * 
 * Why this is essential:
 * - Login is the gateway to all authenticated functionality
 * - Validating successful authentication ensures users can access the application
 * - Tests the core authentication flow which is critical for security
 */
test.describe.serial('Login Tests', () => {
  test.beforeEach(async ({ page, loginPage }) => {
    await loginPage.navigate();
  });

  test('User Login with Valid Credentials', async ({ loginPage, inventoryPage, page }) => {
    await test.step('Act - Login with valid credentials', async () => {
      await loginPage.login(USER_CREDENTIALS.VALID.username, USER_CREDENTIALS.VALID.password);
    });

    await test.step('Assert - Redirected to inventory page', async () => {
      await expect(page).toHaveURL(/inventory\.html/);
      await expect(inventoryPage.pageTitle).toBeVisible();
    });

    await test.step('Assert - Items are visible', async () => {
      const itemCount = await inventoryPage.getInventoryItemCount();
      expect(itemCount).toBeGreaterThan(0);
    });
  });

  /**
   * Test Case 2: User Login with Invalid Credentials
   * 
   * Why this is essential:
   * - Validates error handling for authentication failures
   * - Ensures the system properly rejects invalid access attempts
   * - Tests security measures and user feedback for login errors
   */
  test('User Login with Invalid Credentials', async ({ loginPage, page }) => {
    await test.step('Act - Login with invalid credentials', async () => {
      await loginPage.login(USER_CREDENTIALS.INVALID.username, USER_CREDENTIALS.INVALID.password);
    });

    await test.step('Assert - Error message is displayed', async () => {
      await expect(loginPage.errorMessage).toBeVisible();
      const errorText = await loginPage.getErrorMessage();
      expect(errorText).toContain('Username and password do not match');
    });

    await test.step('Assert - Remain on login page', async () => {
      await expect(page).toHaveURL('/');
      await expect(loginPage.usernameInput).toBeVisible();
    });
  });

  /**
   * Additional Test: Locked Out User
   * 
   * Why this is essential:
   * - Tests account lockout functionality
   * - Validates security measures against brute force attacks
   */
  test('Locked Out User cannot login', async ({ loginPage, page }) => {
    await test.step('Act - Login with locked out credentials', async () => {
      await loginPage.login(USER_CREDENTIALS.LOCKED_OUT.username, USER_CREDENTIALS.LOCKED_OUT.password);
    });

    await test.step('Assert - Locked out error message is displayed', async () => {
      await expect(loginPage.errorMessage).toBeVisible();
      const errorText = await loginPage.getErrorMessage();
      expect(errorText).toContain('locked out');
    });
  });
});
