import { test, expect } from '../utils/helpers';
import { USER_CREDENTIALS, INVENTORY_ITEMS } from '../fixtures/test-data';

/**
 * Test Case 3: Add Item to Cart and Verify
 * 
 * Why this is essential:
 * - Tests the core e-commerce functionality of adding items to cart
 * - Validates the shopping cart state management
 * - Ensures users can successfully add products before checkout
 */
test.describe.serial('Cart Tests', () => {
  test.beforeEach(async ({ page, loginPage }) => {
    await loginPage.navigate();
    await loginPage.login(USER_CREDENTIALS.VALID.username, USER_CREDENTIALS.VALID.password);
  });

  test('Add Item to Cart and Verify', async ({ inventoryPage, cartPage, page }) => {
    // Arrange
    const firstItemName = INVENTORY_ITEMS.SAUCE_LABS_BACKPACK;
    const initialCartCount = await inventoryPage.getCartItemCount();

    // Act - Add first item to cart by index
    await inventoryPage.addToCartByIndex(0);

    // Assert - Cart badge shows count
    const updatedCartCount = await inventoryPage.getCartItemCount();
    expect(updatedCartCount).toBe(initialCartCount + 1);

    // Navigate to cart
    await inventoryPage.goToCart();
    await expect(page).toHaveURL(/cart\.html/);

    // Assert - Item is in cart
    await expect(cartPage.cartItems).toHaveCount(1);
    const cartItems = await cartPage.getCartItemNames();
    expect(cartItems).toContain(firstItemName);
    expect(await cartPage.isItemInCart(firstItemName)).toBe(true);
  });

  test('Add Multiple Items to Cart', async ({ inventoryPage, cartPage, page }) => {
    // Act - Add multiple items
    await inventoryPage.addToCartByIndex(0);
    await inventoryPage.addToCartByIndex(1);
    await inventoryPage.addToCartByIndex(2);

    // Assert - Cart badge shows correct count
    const cartCount = await inventoryPage.getCartItemCount();
    expect(cartCount).toBe(3);

    // Navigate to cart
    await inventoryPage.goToCart();

    // Assert - All items are in cart
    await expect(cartPage.cartItems).toHaveCount(3);
  });

  test('Remove Item from Cart', async ({ inventoryPage, cartPage, page }) => {
    // Arrange - Add item to cart
    await inventoryPage.addToCartByIndex(0);
    await inventoryPage.goToCart();
    const initialCount = await cartPage.getCartItemCount();
    expect(initialCount).toBe(1);

    // Act - Remove item
    await cartPage.removeItemByIndex(0);

    // Assert - Cart is empty
    await expect(cartPage.cartItems).toHaveCount(0);
  });
});
