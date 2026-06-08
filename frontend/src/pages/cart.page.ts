import { Locator, Page } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly pageTitle: Locator;
  readonly cartItems: Locator;
  readonly checkoutButton: Locator;
  readonly continueShoppingButton: Locator;
  readonly removeButtons: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pageTitle = page.locator('[data-test="title"]');
    this.cartItems = page.locator('.cart_item');
    this.checkoutButton = page.locator('[data-test="checkout"]');
    this.continueShoppingButton = page.locator('[data-test="continue-shopping"]');
    this.removeButtons = page.locator('[data-test^="remove"]');
  }

  async getPageTitle() {
    return await this.pageTitle.textContent();
  }

  async getCartItemCount() {
    return await this.cartItems.count();
  }

  async getCartItemNames() {
    const items = this.cartItems;
    const names: string[] = [];
    for (let i = 0; i < await items.count(); i++) {
      const name = await items.nth(i).locator('.inventory_item_name').textContent();
      names.push(name || '');
    }
    return names;
  }

  async removeItemByIndex(index: number) {
    await this.removeButtons.nth(index).click();
  }

  async proceedToCheckout() {
    await this.checkoutButton.click();
  }

  async continueShopping() {
    await this.continueShoppingButton.click();
  }

  async isItemInCart(itemName: string) {
    const items = await this.getCartItemNames();
    return items.some(name => name.includes(itemName));
  }
}
