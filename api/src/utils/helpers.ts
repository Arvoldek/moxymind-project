import { test as base, expect, APIRequestContext, request as baseRequest } from '@playwright/test';
import { ApiClient } from './api-client';

// Extend test with API fixtures
interface ApiFixtures {
  request: APIRequestContext;
  apiClient: ApiClient;
}

export const test = base.extend<ApiFixtures>({
  request: async ({}, use) => {
    const context = await baseRequest.newContext();
    await use(context);
    await context.dispose();
  },
  apiClient: async ({ request }, use) => {
    const client = new ApiClient(request);
    await use(client);
  },
});

export { expect } from '@playwright/test';

// Helper function to validate response schema
export function validateResponseSchema(
  response: any,
  schema: Record<string, any>
): void {
  for (const [key, expectedType] of Object.entries(schema)) {
    if (key === 'arrayOf') {
      // Handle array type validation
      expect(Array.isArray(response)).toBe(true);
      if (response.length > 0) {
        validateResponseSchema(response[0], expectedType);
      }
    } else {
      expect(response).toHaveProperty(key);
      if (expectedType === 'string') {
        expect(typeof response[key]).toBe('string');
      } else if (expectedType === 'number') {
        expect(typeof response[key]).toBe('number');
      } else if (expectedType === 'boolean') {
        expect(typeof response[key]).toBe('boolean');
      } else if (expectedType === 'object') {
        expect(typeof response[key]).toBe('object');
        expect(response[key]).not.toBeNull();
      } else if (expectedType === 'array') {
        expect(Array.isArray(response[key])).toBe(true);
      } else if (typeof expectedType === 'object') {
        // Recursively validate nested objects
        validateResponseSchema(response[key], expectedType);
      }
    }
  }
}

// Helper to assert response time
export async function assertResponseTime(
  responsePromise: Promise<any>,
  limitMs: number
): Promise<any> {
  const start = Date.now();
  const response = await responsePromise;
  const duration = Date.now() - start;
  expect(duration).toBeLessThan(limitMs);
  return response;
}

// Helper to get response time
export async function measureResponseTime(
  responsePromise: Promise<any>
): Promise<{ response: any; duration: number }> {
  const start = Date.now();
  const response = await responsePromise;
  const duration = Date.now() - start;
  return { response, duration };
}
