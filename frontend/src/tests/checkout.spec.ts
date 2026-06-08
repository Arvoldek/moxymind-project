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
    // Arrange - Add item to cart
    await inventoryPage.addToCartByIndex(0);
    await inventoryPage.goToCart();

    // Act - Proceed to checkout
    await cartPage.proceedToCheckout();
    await expect(page).toHaveURL(/checkout-step-one\.html/);

    // Step 1: Fill checkout information
    await checkoutPage.fillCheckoutInformation(
      CHECKOUT_INFO.firstName,
      CHECKOUT_INFO.lastName,
      CHECKOUT_INFO.postalCode
    );
    await checkoutPage.continueToOverview();

    // Step 2: Verify overview and finish
    await expect(page).toHaveURL(/checkout-step-two\.html/);
    await expect(checkoutPage.finishButton).toBeVisible();
    
    await checkoutPage.finishCheckout();

    // Step 3: Assert completion
    await expect(page).toHaveURL(/checkout-complete\.html/);
    await expect(checkoutPage.completeHeader).toBeVisible();
    
    const completeMessage = await checkoutPage.getCompleteMessage();
    expect(completeMessage).toContain('Your order has been dispatched');
  });

  test('Checkout with Multiple Items', async ({ inventoryPage, cartPage, checkoutPage, page }) => {
    // Arrange - Add multiple items to cart
    await inventoryPage.addToCartByIndex(0);
    await inventoryPage.addToCartByIndex(1);
    await inventoryPage.addToCartByIndex(2);
    await inventoryPage.goToCart();

    // Act - Proceed to checkout
    await cartPage.proceedToCheckout();
    await checkoutPage.fillCheckoutInformation(
      CHECKOUT_INFO.firstName,
      CHECKOUT_INFO.lastName,
      CHECKOUT_INFO.postalCode
    );
    await checkoutPage.continueToOverview();
    await checkoutPage.finishCheckout();

    // Assert - Checkout complete
    await expect(page).toHaveURL(/checkout-complete\.html/);
    await expect(checkoutPage.completeHeader).toBeVisible();
  });

  test('Cancel Checkout and Return to Cart', async ({ inventoryPage, cartPage, checkoutPage, page }) => {
    // Arrange - Add item to cart
    await inventoryPage.addToCartByIndex(0);
    await inventoryPage.goToCart();
    await cartPage.proceedToCheckout();

    // Act - Fill info and cancel
    await checkoutPage.fillCheckoutInformation(
      CHECKOUT_INFO.firstName,
      CHECKOUT_INFO.lastName,
      CHECKOUT_INFO.postalCode
    );
    await checkoutPage.cancelButton.click();

    // Assert - Returned to cart
    await expect(page).toHaveURL(/cart\.html/);
    await expect(cartPage.cartItems).toHaveCount(1);
  });
});
