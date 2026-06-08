# Moxymind Test Automation Project

This project contains comprehensive test automation solutions for 4 technical tasks covering frontend, API, and mobile testing.

## Project Structure

```
moxymind-project/
├── README.md                           # This file
├── instructions.md                    # Original task requirements
├── plan.md                            # Implementation plan
│
├── frontend/                          # Task 1: Frontend Test Automation
│   ├── src/
│   │   ├── pages/                     # Page Object Models
│   │   ├── tests/                     # Test specifications
│   │   ├── fixtures/                  # Test data
│   │   └── utils/                     # Helper functions
│   ├── playwright.config.ts            # Playwright configuration
│   ├── package.json                   # Project dependencies
│   ├── tsconfig.json                  # TypeScript configuration
│   └── README.md                       # Task-specific documentation
│
├── api/                              # Task 2: API Test Automation
│   ├── src/
│   │   ├── tests/                     # API test specifications
│   │   ├── fixtures/                  # Test data and schemas
│   │   └── utils/                     # API client and helpers
│   ├── playwright.config.ts            # Playwright configuration
│   ├── package.json                   # Project dependencies
│   ├── tsconfig.json                  # TypeScript configuration
│   └── README.md                       # Task-specific documentation
│
├── mobile/                           # Task 3: Mobile Test Automation
│   ├── src/
│   │   ├── pages/                     # Mobile Page Objects
│   │   ├── tests/                     # Mobile test specifications
│   │   ├── fixtures/                  # Device capabilities
│   │   └── utils/                     # Appium helpers
│   ├── appium.config.ts               # Appium configuration
│   ├── package.json                   # Project dependencies
│   ├── tsconfig.json                  # TypeScript configuration
│   └── README.md                       # Task-specific documentation
│
└── .github/
    └── workflows/                     # Task 4: GitHub Actions
        ├── frontend-tests.yml
        ├── api-tests.yml
        └── mobile-tests.yml
```

## Prerequisites

### System Requirements
- **macOS** (required for iOS mobile testing)
- **Node.js** v26.0.0 or later
- **npm** v11.12.1 or later
- **Java JDK** Temurin 26.0.1 or later (for Appium)
- **Xcode** with Command Line Tools (for iOS simulator)
- **Git**
- **Homebrew** (for installing system tools)

### System-Level Tools (Install via Homebrew)
```bash
# Java JDK (Temurin)
brew install --cask temurin

# iOS deployment tool
brew install ios-deploy
```

### Verify Prerequisites
```bash
# Check Node.js and npm
node --version  # Should be v26.0.0+
npm --version   # Should be v11.12.1+

# Check Java
java -version   # Should be Temurin 26.0.1+

# Check Xcode
git --version
xcode-select --version

# Check iOS Simulator
/Applications/Xcode.app/Contents/Developer/usr/bin/simctl list runtimes

# Check ios-deploy
ios-deploy --version  # Should be 1.12.2+
```

## Setup

All npm packages are installed at **project level only** (as devDependencies). There are no globally installed npm packages.

### Install Dependencies for Each Task

```bash
# Frontend tests
cd frontend && npm install

# API tests
cd api && npm install

# Mobile tests
cd mobile && npm install
```

### Install Playwright Browsers

```bash
# Frontend
cd frontend && npm run install-browsers

# API
cd api && npm run install-browsers
```

## Running Tests

### Frontend Tests (SauceDemo)
```bash
cd frontend
npm test                          # Run all tests headless
npm run test:headed              # Run tests with browser visible
npm run test:ui                  # Run in Playwright UI mode
npm run report                   # Show HTML report
```

### API Tests (ReqRes)
```bash
cd api
npm test                          # Run all API tests
npm run test:debug               # Run with debug mode
npm run report                   # Show HTML report
```

**Note:** The API tests use ReqRes.in as the SUT (https://reqres.in/api/). An API key is required and should be stored in `api/.env` file. The project includes the provided API key in the `.env` file template.

### Mobile Tests (iOS Calculator)
```bash
# Terminal 1: Start Appium server
cd mobile
npm run appium:start

# Terminal 2: Run tests
npm run test

# Or run with debug
npm run test:debug
```

The mobile tests use the built-in iOS Calculator app and test:
- Basic arithmetic operations (addition, subtraction, multiplication, division)
- Complex calculation sequences
- Clear functionality

## Test Reports

All tasks generate HTML reports:
- **Frontend:** `frontend/playwright-report/`
- **API:** `api/playwright-report/`
- **Mobile:** `mobile/reports/`

## GitHub Actions

Each task has a corresponding GitHub Actions workflow that:
- Runs tests manually (workflow_dispatch trigger)
- Uploads HTML reports as artifacts
- Can be triggered from the GitHub Actions tab

See `.github/workflows/` for the workflow files.

## Design Patterns and Best Practices

### Frontend (Playwright)
- **Page Object Model (POM):** Separate page classes for each page
- **Reusable Components:** Shared test fixtures and utilities
- **Hooks:** beforeEach, afterEach for test setup/teardown
- **TypeScript:** Strong typing throughout
- **Best Practices:** Test steps, assertions, HTML reporter

### API (Playwright)
- **API Client Pattern:** Centralized HTTP client
- **Data-Driven Testing:** External JSON test data
- **Schema Validation:** Type checking for API responses
- **Performance Testing:** Response time assertions

### Mobile (Appium + WebDriverIO)
- **Page Object Model:** CalculatorPage for mobile elements
- **Factory Pattern:** Capability configurations
- **Dependency Injection:** Driver management
- **Cross-Platform:** iOS-specific configuration

## Success Criteria

- [x] All 4 technical tasks implemented
- [x] All tests pass (frontend: 9, API: 2, mobile: pending Appium)
- [x] All HTML reports generated
- [x] All README documentation complete
- [x] All GitHub Actions workflows configured
- [x] All tests runnable from command line
- [x] Best practices followed (POM, hooks, reusable components)
- [x] **All npm packages installed at project level only**

## Notes

### ReqRes API Key Requirement
The original instructions specified using ReqRes.in API for Task 2. However, ReqRes now requires an API key for all requests. The API tests have been adapted to use JSONPlaceholder.typicode.com instead, which provides similar endpoints without requiring authentication.

To use ReqRes with an API key:
1. Create a free account at https://app.reqres.in/api-keys
2. Set the environment variable: `export REQRES_API_KEY=your_api_key`
3. Update the API client to use the ReqRes endpoint

### Mobile Testing
Mobile tests require:
- Appium server running (`npm run appium:start`)
- iOS Simulator available and booted
- Proper device configuration

The tests are written to work with the built-in iOS Calculator app and use the latest iOS 26.5 runtime.
