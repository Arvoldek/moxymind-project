import { Locator, Page } from '@playwright/test';

export class CheckoutPage {
  readonly page: Page;
  readonly pageTitle: Locator;
  
  // Step 1: Your Information
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postalCodeInput: Locator;
  readonly continueButton: Locator;
  readonly cancelButton: Locator;
  
  // Step 2: Overview
  readonly itemTotal: Locator;
  readonly tax: Locator;
  readonly total: Locator;
  readonly finishButton: Locator;
  
  // Step 3: Complete
  readonly completeHeader: Locator;
  readonly completeText: Locator;
  readonly backHomeButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pageTitle = page.locator('[data-test="title"]');
    
    // Step 1
    this.firstNameInput = page.locator('[data-test="firstName"]');
    this.lastNameInput = page.locator('[data-test="lastName"]');
    this.postalCodeInput = page.locator('[data-test="postalCode"]');
    this.continueButton = page.locator('[data-test="continue"]');
    this.cancelButton = page.locator('[data-test="cancel"]');
    
    // Step 2
    this.itemTotal = page.locator('.summary_subtotal_label');
    this.tax = page.locator('.summary_tax_label');
    this.total = page.locator('.summary_total_label');
    this.finishButton = page.locator('[data-test="finish"]');
    
    // Step 3
    this.completeHeader = page.locator('[data-test="complete-header"]');
    this.completeText = page.locator('[data-test="complete-text"]');
    this.backHomeButton = page.locator('[data-test="back-to-products"]');
  }

  async fillCheckoutInformation(firstName: string, lastName: string, postalCode: string) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
  }

  async continueToOverview() {
    await this.continueButton.click();
  }

  async finishCheckout() {
    await this.finishButton.click();
  }

  async getTotalAmount() {
    return await this.total.textContent();
  }

  async isCheckoutComplete() {
    return await this.completeHeader.isVisible();
  }

  async getCompleteMessage() {
    return await this.completeText.textContent();
  }

  async returnToHome() {
    await this.backHomeButton.click();
  }
}
