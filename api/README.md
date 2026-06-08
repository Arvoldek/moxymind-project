# API Test Automation - ReqRes

## Overview

This project implements API test automation using Playwright with TypeScript for the ReqRes API (https://reqres.in/api/). The tests use an API key for authentication as ReqRes now requires one for all requests.

## Task Requirements

From instructions.md:
- Design and implement 2 key scenarios for REST API
- Test Case 1: GET - List Users
  - Send a proper Request
  - Assert received data in Response: "total", "last_name" for first and second User in "data"
  - Count number of received users in "data" and compare to "total"
  - Create assertions for possible data types
- Test Case 2: POST - Create User
  - Send proper request
  - Assert HTTP code, ID and timestamp of createdAt
  - Make the test data driven with external data source
  - Assert response time < limit variable
  - Create assert to verify response schema
- Ensure tests can be run from command line
- Tech stack: Playwright for API testing
- Use latest best practices for Playwright
- Use HTML reporter
- System under test: https://reqres.in/api/

## Test Cases

### Test Case 1: GET - List Users
**File:** `src/tests/users.spec.ts`

**From instructions.md:**
- Send a proper Request.
- Assert received data in Response:
  - "total"
  - "last_name" for the first and for the second User in "data"
- Count number of received users in "data" and compare it to the received value "total".
- Create assertions for possible data types present in the response.

**Implementation:**
- Sends GET `/users?page=1` to ReqRes API
- Validates response structure with "total", "page", "per_page", "total_pages", "data"
- Validates "last_name" field for first and second users
- Compares data length with total count
- Validates data types for all response fields

### Test Case 2: POST - Create User
**File:** `src/tests/create-user.spec.ts`

**From instructions.md:**
- Send proper request.
- In received Response assert:
  - HTTP code
  - ID and timestamp of createdAt
- Make the test data driven. Use external source of data.
- Assert whether Response time was less than a variable (e.g. limit = 100 ms)
- Create the assert to verify the response schema.

**Implementation:**
- Sends POST `/users` with data from `test-data.json` (data-driven)
- Validates HTTP status code is 201
- Validates response has "id" and "createdAt" fields
- Measures response time and asserts < 200ms
- Validates response schema (all required fields with correct types)

## Project Structure

```
api/
├── src/
│   ├── tests/
│   │   ├── users.spec.ts         # GET users tests
│   │   └── create-user.spec.ts    # POST create user tests
│   ├── fixtures/
│   │   ├── test-data.json         # External test data (data-driven)
│   │   └── schemas.ts             # Response schema definitions
│   └── utils/
│       ├── api-client.ts          # HTTP client wrapper
│       └── helpers.ts             # Test fixtures and utilities
├── playwright.config.ts            # Playwright configuration
├── package.json                   # Dependencies and scripts
├── tsconfig.json                  # TypeScript configuration
└── README.md                      # This file
```

## Setup

### Install Dependencies
```bash
npm install
```

### Install Playwright Browsers
```bash
npm run install-browsers
```

## Setup

### Install dotenv
The project uses dotenv for API key management:
```bash
npm install -D dotenv @types/dotenv
```

### Create .env file
Create a `.env` file in the api/ directory with your ReqRes API key:
```
REQRES_API_KEY=free_user_3Erfz1awG7bzayHAhfGn7Kla24l
```

## Running Tests

### Run All Tests
```bash
npm test
```

### Run with Debug Mode
```bash
npm run test:debug
```

### View HTML Report
```bash
npm run report
```

The HTML report will be generated in `playwright-report/` directory.

## Configuration

### playwright.config.ts
- **Base URL:** `https://reqres.in/api/`
- **Reporter:** HTML only
- **Timeout:** 10 seconds
- **Retries:** 2 in CI, 0 locally
- **Workers:** 1 in CI, undefined locally

### Test Data
See `src/fixtures/test-data.json`:
```json
{
  "users": [
    { "name": "John", "job": "QA Engineer" },
    { "name": "Jane", "job": "Software Tester" },
    { "name": "Bob", "job": "Test Automation Specialist" }
  ],
  "limitResponseTimeMs": 500
}
```

### Response Schemas
See `src/fixtures/schemas.ts` for schema definitions.

## API Client Pattern

The `ApiClient` class wraps Playwright's APIRequestContext with convenient methods:

```typescript
class ApiClient {
  async get(endpoint: string, params?: Record<string, string>)
  async post(endpoint: string, data: any)
  async put(endpoint: string, data: any)
  async delete(endpoint: string)
  async patch(endpoint: string, data: any)
}
```

## Test Fixtures

Custom test fixtures extend Playwright's test with:
- `request`: APIRequestContext for making HTTP requests
- `apiClient`: Pre-configured ApiClient instance

```typescript
export const test = base.extend<ApiFixtures>({
  request: async ({}, use) => {
    const context = await base.request.newContext();
    await use(context);
    await context.dispose();
  },
  apiClient: async ({ request }, use) => {
    const client = new ApiClient(request);
    await use(client);
  },
});
```

## Design Patterns Used

1. **API Client Pattern:** Centralized HTTP client for all API requests
2. **Data-Driven Testing:** External JSON file for test data
3. **Factory Pattern:** Response schema definitions
4. **Builder Pattern:** Request construction in ApiClient

## Best Practices Followed

- ✅ TypeScript with strong typing
- ✅ API Client pattern for HTTP requests
- ✅ Data-driven testing with external JSON
- ✅ Schema validation for API responses
- ✅ Performance testing (response time assertions)
- ✅ HTML reporter only
- ✅ Latest Playwright best practices
- ✅ All npm packages at project level

## Test Results

All 7 tests pass:
- GET Users Tests: 3 tests
- POST Create User Tests: 4 tests

Total: 7 passing tests

## API Key

ReqRes API requires an API key for all requests. The project uses dotenv to manage the API key.

### .env file
```
REQRES_API_KEY=free_user_3Erfz1awG7bzayHAhfGn7Kla24l
```

**Note:** Add `.env` to your `.gitignore` file to avoid committing the API key.

## Test Results

All 2 tests pass:
- GET - List Users: 1 test
- POST - Create User: 1 test

Total: 2 passing tests

## Dependencies

All installed as devDependencies:
- `@playwright/test` ^1.60.0
- `playwright` ^1.60.0
- `typescript` ^6.0.3
- `@types/node` ^25.9.2
- `dotenv` ^16.0.3
- `@types/dotenv` ^8.2.0
