# Frontend Test Automation - SauceDemo

## Overview

This project implements test automation for the SauceDemo website (https://www.saucedemo.com/) using Playwright with TypeScript. The tests follow the Page Object Model (POM) design pattern and best practices for modern web test automation.

## Task Requirements

From instructions.md:
- Design and implement 3-4 test cases to test the main functionality
- Each test case should describe why the functionality is essential
- Ensure tests can be run from command line
- Tech stack: Playwright with TypeScript
- Use test steps inside tests
- Use reusable components where appropriate
- Use Page Object Model
- Use before and after hooks
- Test User Data: Found directly on the website
- Use playwright-cli for exploration
- Use only the HTML reporter
- Create scripts for headless and headed modes
- Follow latest Playwright best practices
- System under test: https://www.saucedemo.com/

## Test Cases

### Test Case 1: User Login with Valid Credentials
**File:** `src/tests/login.spec.ts`

**Why this is essential:**
- Login is the gateway to all authenticated functionality
- Validating successful authentication ensures users can access the application
- Tests the core authentication flow which is critical for security

**Steps:**
1. Navigate to SauceDemo
2. Enter valid username: `standard_user`
3. Enter valid password: `secret_sauce`
4. Click login button
5. Assert redirected to inventory page
6. Assert inventory items are visible

### Test Case 2: User Login with Invalid Credentials
**File:** `src/tests/login.spec.ts`

**Why this is essential:**
- Validates error handling for authentication failures
- Ensures the system properly rejects invalid access attempts
- Tests security measures and user feedback for login errors

**Steps:**
1. Navigate to SauceDemo
2. Enter invalid username: `invalid_user`
3. Enter invalid password: `invalid_password`
4. Click login button
5. Assert error message is displayed
6. Assert user remains on login page

### Additional Test: Locked Out User
**File:** `src/tests/login.spec.ts`

**Why this is essential:**
- Tests account lockout functionality
- Validates security measures against brute force attacks

**Steps:**
1. Navigate to SauceDemo
2. Enter locked out username: `locked_out_user`
3. Enter password: `secret_sauce`
4. Click login button
5. Assert error message indicates account is locked

### Test Case 3: Add Item to Cart and Verify
**File:** `src/tests/cart.spec.ts`

**Why this is essential:**
- Tests the core e-commerce functionality of adding items to cart
- Validates the shopping cart state management
- Ensures users can successfully add products before checkout

**Steps:**
1. Login with valid credentials
2. Navigate to inventory page
3. Click "Add to Cart" on first item
4. Assert cart icon shows item count
5. Navigate to cart page
6. Assert item is present in cart

### Test Case 4: Add Multiple Items to Cart
**File:** `src/tests/cart.spec.ts`

**Steps:**
1. Login with valid credentials
2. Add multiple items to cart (first 3 items)
3. Assert cart badge shows correct count (3)
4. Navigate to cart
5. Assert all 3 items are in cart

### Test Case 5: Remove Item from Cart
**File:** `src/tests/cart.spec.ts`

**Steps:**
1. Login with valid credentials
2. Add item to cart
3. Navigate to cart
4. Remove item from cart
5. Assert cart is empty

### Test Case 6: Complete Checkout Process
**File:** `src/tests/checkout.spec.ts`

**Why this is essential:**
- Tests the complete end-to-end purchase flow
- Validates the most critical business process (revenue generation)
- Ensures all checkout steps work correctly together

**Steps:**
1. Login with valid credentials
2. Add item to cart
3. Navigate to cart
4. Click "Checkout" button
5. Enter first name: `John`
6. Enter last name: `Doe`
7. Enter postal code: `12345`
8. Click "Continue"
9. Click "Finish" button
10. Assert completion message is displayed

### Test Case 7: Checkout with Multiple Items
**File:** `src/tests/checkout.spec.ts`

**Steps:**
1. Login with valid credentials
2. Add 3 items to cart
3. Proceed to checkout
4. Enter checkout information
5. Click finish
6. Assert checkout is complete

### Test Case 8: Cancel Checkout and Return to Cart
**File:** `src/tests/checkout.spec.ts`

**Steps:**
1. Login with valid credentials
2. Add item to cart
3. Proceed to checkout
4. Enter checkout information
5. Click "Cancel" button
6. Assert user is returned to cart page
7. Assert cart still contains the item

## Project Structure

```
frontend/
├── src/
│   ├── pages/
│   │   ├── login.page.ts       # Login page POM
│   │   ├── inventory.page.ts   # Inventory page POM
│   │   ├── cart.page.ts         # Cart page POM
│   │   └── checkout.page.ts     # Checkout page POM
│   ├── tests/
│   │   ├── login.spec.ts        # Login tests
│   │   ├── cart.spec.ts         # Cart tests
│   │   └── checkout.spec.ts     # Checkout tests
│   ├── fixtures/
│   │   └── test-data.ts         # Test data constants
│   └── utils/
│       └── helpers.ts           # Test fixtures and custom test
├── playwright.config.ts         # Playwright configuration
├── package.json                # Dependencies and scripts
├── tsconfig.json               # TypeScript configuration
└── README.md                   # This file
```

## Setup

### Install Dependencies
```bash
npm install
```

### Install Playwright Browsers
```bash
npm run install-browsers
npm run install-deps
```

## Running Tests

### Headless Mode (Default)
```bash
npm test
```

### Headed Mode (Browser Visible)
```bash
npm run test:headed
```

### Playwright UI Mode
```bash
npm run test:ui
```

### View HTML Report
```bash
npm run report
```

The HTML report will be generated in `playwright-report/` directory.

## Configuration

### playwright.config.ts
- **Base URL:** `https://www.saucedemo.com/`
- **Reporter:** HTML only
- **Browsers:** Chromium, Firefox, WebKit
- **Screenshot:** On failure
- **Video:** Retain on failure
- **Trace:** On first retry

### Test Data
See `src/fixtures/test-data.ts` for:
- Valid/invalid user credentials
- Checkout information
- Inventory item names
- Error messages

## Page Object Model (POM)

Each page is implemented as a separate class with:
- Locators for page elements
- Methods for user interactions
- Methods for assertions

### Example: Login Page
```typescript
class LoginPage {
  usernameInput: Locator;
  passwordInput: Locator;
  loginButton: Locator;
  errorMessage: Locator;

  async navigate() { ... }
  async login(username: string, password: string) { ... }
  async getErrorMessage() { ... }
  async isErrorMessageVisible() { ... }
}
```

## Design Patterns Used

1. **Page Object Model (POM):** Separate classes for each page
2. **Reusable Components:** Shared test utilities and fixtures
3. **Dependency Injection:** Page objects injected into tests via fixtures
4. **Factory Pattern:** Test data creation in fixtures

## Best Practices Followed

- ✅ TypeScript with strong typing
- ✅ Page Object Model
- ✅ Reusable components and utilities
- ✅ Hooks (beforeEach, afterEach)
- ✅ Test steps clearly defined
- ✅ HTML reporter only
- ✅ Scripts for headless and headed modes
- ✅ Latest Playwright best practices
- ✅ All npm packages at project level

## Test Results

All 9 tests pass:
- Login Tests: 3 tests
- Cart Tests: 3 tests  
- Checkout Tests: 3 tests

Total: 9 passing tests

## Dependencies

All installed as devDependencies:
- `@playwright/test` ^1.60.0
- `playwright` ^1.60.0
- `typescript` ^6.0.3
- `@types/node` ^25.9.2
- `ts-node` ^10.9.2
