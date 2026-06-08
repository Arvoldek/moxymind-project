import { test, expect } from '../utils/helpers';
import { USER_CREDENTIALS, CHECKOUT_INFO, INVENTORY_ITEMS } from '../fixtures/test-data';

/**
 * Test Case 4: Complete Checkout Process
 * 
 * Why this is essential:
 * - Tests the complete end-to-end purchase flow
 * - Validates the most critical business process (revenue generation)
 * - Ensures all checkout steps work correctly together
 */
test.describe.serial('Checkout Tests', () => {
  test.beforeEach(async ({ page, loginPage }) => {
    await loginPage.navigate();
    await loginPage.login(USER_CREDENTIALS.VALID.username, USER_CREDENTIALS.VALID.password);
  });

  test('Complete Checkout Process', async ({ inventoryPage, cartPage, checkoutPage, page }) => {
    await test.step('Arrange - Add item to cart', async () => {
      await inventoryPage.addToCartByIndex(0);
      await inventoryPage.goToCart();
    });

    await test.step('Act - Proceed to checkout', async () => {
      await cartPage.proceedToCheckout();
      await expect(page).toHaveURL(/checkout-step-one\.html/);
    });

    await test.step('Step 1: Fill checkout information', async () => {
      await checkoutPage.fillCheckoutInformation(
        CHECKOUT_INFO.firstName,
        CHECKOUT_INFO.lastName,
        CHECKOUT_INFO.postalCode
      );
      await checkoutPage.continueToOverview();
    });

    await test.step('Step 2: Verify overview and finish', async () => {
      await expect(page).toHaveURL(/checkout-step-two\.html/);
      await expect(checkoutPage.finishButton).toBeVisible();
      
      await checkoutPage.finishCheckout();
    });

    await test.step('Step 3: Assert completion', async () => {
      await expect(page).toHaveURL(/checkout-complete\.html/);
      await expect(checkoutPage.completeHeader).toBeVisible();
      
      const completeMessage = await checkoutPage.getCompleteMessage();
      expect(completeMessage).toContain('Your order has been dispatched');
    });
  });

  test('Checkout with Multiple Items', async ({ inventoryPage, cartPage, checkoutPage, page }) => {
    await test.step('Arrange - Add multiple items to cart', async () => {
      await inventoryPage.addToCartByIndex(0);
      await inventoryPage.addToCartByIndex(1);
      await inventoryPage.addToCartByIndex(2);
      await inventoryPage.goToCart();
    });

    await test.step('Act - Proceed to checkout', async () => {
      await cartPage.proceedToCheckout();
      await checkoutPage.fillCheckoutInformation(
        CHECKOUT_INFO.firstName,
        CHECKOUT_INFO.lastName,
        CHECKOUT_INFO.postalCode
      );
      await checkoutPage.continueToOverview();
      await checkoutPage.finishCheckout();
    });

    await test.step('Assert - Checkout complete', async () => {
      await expect(page).toHaveURL(/checkout-complete\.html/);
      await expect(checkoutPage.completeHeader).toBeVisible();
    });
  });

  test('Cancel Checkout and Return to Cart', async ({ inventoryPage, cartPage, checkoutPage, page }) => {
    await test.step('Arrange - Add item to cart', async () => {
      await inventoryPage.addToCartByIndex(0);
      await inventoryPage.goToCart();
      await cartPage.proceedToCheckout();
    });

    await test.step('Act - Fill info and cancel', async () => {
      await checkoutPage.fillCheckoutInformation(
        CHECKOUT_INFO.firstName,
        CHECKOUT_INFO.lastName,
        CHECKOUT_INFO.postalCode
      );
      await checkoutPage.cancelButton.click();
    });

    await test.step('Assert - Returned to cart', async () => {
      await expect(page).toHaveURL(/cart\.html/);
      await expect(cartPage.cartItems).toHaveCount(1);
    });
  });
});
