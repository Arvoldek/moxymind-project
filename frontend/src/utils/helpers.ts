import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { InventoryPage } from '../pages/inventory.page';
import { CartPage } from '../pages/cart.page';
import { CheckoutPage } from '../pages/checkout.page';

// Extend test with custom fixtures
interface TestFixtures {
  loginPage: LoginPage;
  inventoryPage: InventoryPage;
  cartPage: CartPage;
  checkoutPage: CheckoutPage;
}

// Define test with Page Object Model fixtures
// Using beforeEach and afterEach hooks via test.describe serialization mode
export const test = base.extend<TestFixtures>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },
  inventoryPage: async ({ page }, use) => {
    const inventoryPage = new InventoryPage(page);
    await use(inventoryPage);
  },
  cartPage: async ({ page }, use) => {
    const cartPage = new CartPage(page);
    await use(cartPage);
  },
  checkoutPage: async ({ page }, use) => {
    const checkoutPage = new CheckoutPage(page);
    await use(checkoutPage);
  },
});

export { expect } from '@playwright/test';
