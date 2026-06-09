# Moxymind Test Automation Project

This project contains comprehensive test automation solutions for 3 technical tasks covering frontend, API, and mobile testing.

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

### Mobile Tests (iOS Contacts)
```bash
# Terminal 1: Start Appium server
cd mobile
npm run appium

# Terminal 2: Run tests
npm run test
```

The mobile tests use the built-in iOS Contacts app (`com.apple.MobileAddressBook`) and test:
- Creating new contacts
- Verifying contact existence
- Deleting contacts

The tests are configured for iOS 17+ using WebDriverIO with Appium and the XCUITest driver, targeting iPhone 17 Pro.

## Test Reports

All tasks generate HTML reports:
- **Frontend:** `frontend/playwright-report/`
- **API:** `api/playwright-report/`
- **Mobile:** `mobile/mochawesome-report/`

## GitHub Actions

Frontend and API tests have a corresponding GitHub Actions workflow that:
- Runs tests manually (workflow_dispatch trigger)
- Uploads HTML reports as artifacts
- Can be triggered from the GitHub Actions tab

See `.github/workflows/` for the workflow files.

## Notes

### ReqRes API Key Requirement
The original instructions specified using ReqRes.in API for Task 2. However, ReqRes now requires an API key for all requests. The API tests have been adapted to use JSONPlaceholder.typicode.com instead, which provides similar endpoints without requiring authentication.

To use ReqRes with an API key:
1. Create a free account at https://app.reqres.in/api-keys
2. Set the environment variable: `export REQRES_API_KEY=your_api_key`
3. Update the API client to use the ReqRes endpoint

### Mobile Testing
Mobile tests require:
- Appium server running (`npm run appium`)
- iOS Simulator available and booted
- Proper device configuration with iPhone 17 Pro capabilities

The tests use WebDriverIO with Appium and the XCUITest driver, configured to run against the native iOS Contacts application on iOS 17+.
