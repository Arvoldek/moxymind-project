import { Locator, Page } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;
  readonly pageTitle: Locator;
  readonly inventoryItems: Locator;
  readonly addToCartButtons: Locator;
  readonly removeFromCartButtons: Locator;
  readonly shoppingCartLink: Locator;
  readonly sortDropdown: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pageTitle = page.locator('[data-test="title"]');
    this.inventoryItems = page.locator('.inventory_item');
    this.addToCartButtons = page.locator('[data-test^="add-to-cart"]');
    this.removeFromCartButtons = page.locator('[data-test^="remove"]');
    this.shoppingCartLink = page.locator('[data-test="shopping-cart-link"]');
    this.sortDropdown = page.locator('[data-test="product-sort-container"]');
  }

  async getPageTitle() {
    return await this.pageTitle.textContent();
  }

  async getInventoryItemCount() {
    return await this.inventoryItems.count();
  }

  async getInventoryItemNames() {
    const items = this.inventoryItems;
    const names: string[] = [];
    for (let i = 0; i < await items.count(); i++) {
      const name = await items.nth(i).locator('.inventory_item_name').textContent();
      names.push(name || '');
    }
    return names;
  }

  async addToCartByIndex(index: number) {
    const items = this.addToCartButtons;
    await items.nth(index).click();
  }

  async addToCartByName(itemName: string) {
    await this.page.locator(`[data-test="add-to-cart-${itemName.toLowerCase().replace(/ /g, '-')}"]`).click();
  }

  async getCartItemCount() {
    const badge = this.shoppingCartLink.locator('.shopping_cart_badge');
    if (await badge.isVisible()) {
      return parseInt(await badge.textContent() || '0');
    }
    return 0;
  }

  async goToCart() {
    await this.shoppingCartLink.click();
  }
}
