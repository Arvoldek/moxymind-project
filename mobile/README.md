# Mobile Tests

## Setup

1. Install dependencies:
   ```bash
   cd mobile
   npm install
   ```

2. Start Appium:
   ```bash
   npm run appium
   ```

3. In another terminal, run tests:
   ```bash
   npm test
   ```

## Structure

- `src/config/config.ts` - Appium configuration
- `src/pages/contacts.page.ts` - Page object for Contacts app
- `src/tests/contacts.spec.ts` - Two tests: create contact, delete contact
- `src/index.ts` - Test runner

## Tests

1. Creates a contact "Test User" and verifies it exists
2. Deletes the contact and verifies it's removed
