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
    const firstItemName = INVENTORY_ITEMS.SAUCE_LABS_BACKPACK;
    const initialCartCount = await inventoryPage.getCartItemCount();

    await test.step('Act - Add first item to cart by index', async () => {
      await inventoryPage.addToCartByIndex(0);
    });

    await test.step('Assert - Cart badge shows count', async () => {
      const updatedCartCount = await inventoryPage.getCartItemCount();
      expect(updatedCartCount).toBe(initialCartCount + 1);
    });

    await test.step('Navigate to cart', async () => {
      await inventoryPage.goToCart();
      await expect(page).toHaveURL(/cart\.html/);
    });

    await test.step('Assert - Item is in cart', async () => {
      await expect(cartPage.cartItems).toHaveCount(1);
      const cartItems = await cartPage.getCartItemNames();
      expect(cartItems).toContain(firstItemName);
      expect(await cartPage.isItemInCart(firstItemName)).toBe(true);
    });
  });

  test('Add Multiple Items to Cart', async ({ inventoryPage, cartPage, page }) => {
    await test.step('Act - Add multiple items', async () => {
      await inventoryPage.addToCartByIndex(0);
      await inventoryPage.addToCartByIndex(1);
      await inventoryPage.addToCartByIndex(2);
    });

    await test.step('Assert - Cart badge shows correct count', async () => {
      const cartCount = await inventoryPage.getCartItemCount();
      expect(cartCount).toBe(3);
    });

    await test.step('Navigate to cart', async () => {
      await inventoryPage.goToCart();
    });

    await test.step('Assert - All items are in cart', async () => {
      await expect(cartPage.cartItems).toHaveCount(3);
    });
  });

  test('Remove Item from Cart', async ({ inventoryPage, cartPage, page }) => {
    await test.step('Arrange - Add item to cart', async () => {
      await inventoryPage.addToCartByIndex(0);
      await inventoryPage.goToCart();
      const initialCount = await cartPage.getCartItemCount();
      expect(initialCount).toBe(1);
    });

    await test.step('Act - Remove item', async () => {
      await cartPage.removeItemByIndex(0);
    });

    await test.step('Assert - Cart is empty', async () => {
      await expect(cartPage.cartItems).toHaveCount(0);
    });
  });
});
