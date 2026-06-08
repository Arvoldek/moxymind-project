# Mobile Test Automation - iOS Calculator

## Overview

This project implements mobile test automation for iOS using Appium with WebDriverIO and TypeScript. The tests are written for the built-in iOS Calculator app and demonstrate mobile automation best practices.

## Task Requirements

From instructions.md:
- Design and implement a simple test automation framework for mobile automation using Appium with TypeScript and Playwright if possible, if not then consult with what is possible
- Use the latest best practices for the solution
- Do it for iOS application
- Come up with 2 different test scenarios for testing SUT of your choice
- Implement automated tests for those test scenarios
- Use appropriate design patterns
- Ensure that the solution works fine with an emulator/simulator
- Ensure that tests can be run from a command line
- Use HTML reporter
- System under test: iOS Calculator app (built-in app)

## Solution Decision

**Playwright does not support mobile app automation.** Therefore, we use:
- **Appium** - Mobile automation server
- **WebDriverIO** - WebDriver client for Node.js
- **XCUITest** - iOS automation driver

This combination provides full mobile automation capabilities for iOS apps.

## Test Cases

### Test Case 1: Basic Arithmetic Operations
**File:** `src/tests/basic-operations.spec.ts`

**Why this is essential:**
- Tests fundamental calculator functionality
- Validates that basic arithmetic operations work correctly
- Ensures the app handles user input and produces correct results

**Tests:**
1. **Addition:** 5 + 3 = 8
2. **Subtraction:** 10 - 4 = 6
3. **Multiplication:** 7 × 6 = 42
4. **Division:** 15 ÷ 3 = 5

Each test:
- Clears the display before starting
- Enters first operand
- Presses operator button
- Enters second operand
- Presses equals button
- Verifies result is correct

### Test Case 2: Complex Calculation Sequence
**File:** `src/tests/advanced-operations.spec.ts`

**Why this is essential:**
- Tests multi-step calculations
- Validates that the calculator maintains state correctly
- Ensures complex operations produce accurate results

**Tests:**
1. **Complex sequence:** ((5 + 3) * 2) - 4 = 12
   - Step 1: 5 + 3 = 8
   - Step 2: 8 * 2 = 16
   - Step 3: 16 - 4 = 12
   - Verifies final result is 12

2. **Clear and verify reset:**
   - Enters number 999
   - Clears display
   - Verifies display shows 0 or is empty

3. **Multiple operations in sequence:**
   - 10 + 5 = 15
   - 15 - 3 = 12
   - Verifies final result is 12

## Project Structure

```
mobile/
├── src/
│   ├── pages/
│   │   └── calculator.page.ts    # Calculator Page Object Model
│   ├── tests/
│   │   ├── basic-operations.spec.ts    # Basic arithmetic tests
│   │   └── advanced-operations.spec.ts # Complex calculation tests
│   ├── fixtures/
│   │   └── capabilities.ts       # Device capabilities configuration
│   └── utils/
│       └── appium-helper.ts       # Appium session management
├── appium.config.ts               # Appium configuration
├── package.json                   # Dependencies and scripts
├── tsconfig.json                  # TypeScript configuration
└── README.md                      # This file
```

## Setup

### Prerequisites

1. **Xcode** with Command Line Tools installed
2. **Java JDK** (Temurin 26.0.1+) installed
3. **iOS Simulator** available (iOS 26.5)
4. **Appium** installed (via npm, project-level)

### Install Dependencies
```bash
npm install
```

### Verify iOS Simulator
```bash
# List available runtimes
/Applications/Xcode.app/Contents/Developer/usr/bin/simctl list runtimes

# List available devices
/Applications/Xcode.app/Contents/Developer/usr/bin/simctl list devices
```

## Running Tests

### Terminal 1: Start Appium Server
```bash
npm run appium:start
```

This starts the Appium server on `http://127.0.0.1:4723`

### Terminal 2: Run Tests
```bash
npm run test
```

### Debug Mode
```bash
npm run test:debug
```

Sets `NODE_ENV=debug` for verbose output

### Check Appium Doctor
```bash
npm run appium:doctor
```

Verifies all Appium dependencies are correctly configured for iOS

## Configuration

### appium.config.ts

```typescript
{
  server: {
    address: '127.0.0.1',
    port: 4723,
  },
  driver: {
    name: 'XCUITest',
  },
  capabilities: {
    platformName: 'iOS',
    platformVersion: '26.5',
    deviceName: 'iPhone 17 Pro',
    udid: 'dynamic', // Gets first available iPhone 17 Pro
    automationName: 'XCUITest',
    app: 'com.apple.calculator',
    noReset: true,
    fullReset: false,
    showIOSLog: true,
  },
  reporters: ['html'],
  outputDir: './reports',
  timeout: 60000,
}
```

### Device Capabilities

See `src/fixtures/capabilities.ts` for:
- Default iOS Calculator capabilities
- Dynamic UDID detection
- Capability factory function

The configuration targets:
- **Device:** iPhone 17 Pro (or first available iPhone 17 Pro)
- **iOS Version:** 26.5
- **App:** com.apple.calculator (built-in Calculator)
- **Automation:** XCUITest

## Page Object Model

The `CalculatorPage` class provides methods for interacting with the iOS Calculator:

```typescript
class CalculatorPage {
  // Element locators
  digitButtons: Record<string, string>;
  operatorButtons: Record<string, string>;
  equalsButton: string;
  clearButton: string;
  resultLabel: string;

  // Action methods
  async pressDigit(digit: string)
  async pressOperator(operator: string)
  async pressEquals()
  async pressClear()
  async enterNumber(number: string)
  
  // Getter methods
  async getDisplayText()
  async getResult()
  
  // Complex operations
  async performOperation(operand1: string, operator: string, operand2: string)
  async clearDisplay()
}
```

### Element Locators

The iOS Calculator uses XPath for element identification:
- Buttons: `//XCUIElementTypeButton[@name="{button_name}"]`
- Display: `//XCUIElementTypeStaticText`

Button names match the visible labels:
- Digits: '0', '1', '2', ..., '9'
- Operators: '+', '-', '×', '÷', '='
- Clear: 'AC'

## Design Patterns Used

1. **Page Object Model (POM):** CalculatorPage encapsulates all element interactions
2. **Factory Pattern:** Capability configurations with dynamic UDID detection
3. **Dependency Injection:** Driver passed to page objects and tests
4. **Builder Pattern:** Complex operations built from simple steps

## Best Practices Followed

- ✅ TypeScript with strong typing
- ✅ Page Object Model for mobile elements
- ✅ Separation of concerns (pages, tests, utilities)
- ✅ Reusable utility functions
- ✅ Dynamic device detection
- ✅ HTML reporter configured
- ✅ Latest WebDriverIO/Appium best practices
- ✅ All npm packages at project level

## iOS Calculator App

The built-in iOS Calculator app is used as the System Under Test (SUT):
- **Bundle ID:** `com.apple.calculator`
- **No installation needed:** App is pre-installed on all iOS devices
- **Accessibility:** Full VoiceOver support, accessible element labels

## Troubleshooting

### Appium Server Not Starting
1. Ensure Java is installed: `java -version`
2. Ensure Node.js is installed: `node --version`
3. Check port 4723 is available: `lsof -i :4723`
4. Run: `npm run appium:doctor`

### iOS Simulator Not Available
1. Check Xcode is installed
2. List available runtimes: `simctl list runtimes`
3. List available devices: `simctl list devices`
4. Boot simulator: `xcrun simctl boot {UDID}`

### Device Not Found
1. Check device UDID: `simctl list devices | grep "iPhone 17 Pro"`
2. Update `appium.config.ts` with correct UDID
3. Or use dynamic detection (default)

### Test Execution Hangs
1. Check Appium server logs
2. Check iOS Simulator is booted
3. Increase timeout in `appium.config.ts`

## HTML Reports

HTML reports are generated in the `reports/` directory after test execution.

To view the report:
```bash
# After running tests, check the reports directory
ls -la reports/
```

## Dependencies

All installed as devDependencies:
- `webdriverio` ^9.27.2
- `appium` ^3.5.0
- `@wdio/types` ^9.27.2
- `@appium/types` ^1.5.0
- `typescript` ^6.0.3
- `@types/node` ^25.9.2
- `ts-node` ^10.9.2

## Notes

### Appium Server Management

The tests expect Appium to be running before test execution. Use:
```bash
# Start Appium in one terminal
npm run appium:start

# Run tests in another terminal
npm run test
```

For production use, consider:
1. Using `appium` as a devDependency (already done)
2. Starting/stopping Appium programmatically in test setup/teardown
3. Using a process manager for Appium

### iOS Version Compatibility

This configuration is set up for:
- **iOS Runtime:** 26.5
- **Device:** iPhone 17 Pro

To change the iOS version:
1. Update `platformVersion` in `appium.config.ts`
2. Update `platformVersion` in `src/fixtures/capabilities.ts`
3. Ensure the corresponding simulator runtime is installed

### App Bundle ID

The built-in Calculator app uses bundle ID: `com.apple.calculator`

For other built-in apps, use:
- Notes: `com.apple.mobilenotes`
- Contacts: `com.apple.MobileAddressBook`
- Reminders: `com.apple.reminders`
- Clock: `com.apple.clock`
- Photos: `com.apple.mobileslideshow`
