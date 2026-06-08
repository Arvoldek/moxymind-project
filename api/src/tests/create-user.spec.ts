import { test, expect } from '../utils/helpers';
import { measureResponseTime } from '../utils/helpers';
import testData from '../fixtures/test-data.json';
import { CREATE_USER_RESPONSE_SCHEMA } from '../fixtures/schemas';

/**
 * Test Case 2: POST - Create User
 * 
 * From instructions.md:
 * - Send proper request.
 * - In received Response assert:
 *   - HTTP code
 *   - ID and timestamp of createdAt
 * - Make the test data driven. Use external source of data.
 * - Assert whether Response time was less than a variable (e.g. limit = 100 ms)
 * - Create the assert to verify the response schema.
 */
test.describe.serial('POST - Create User', () => {
  test('POST - Create User and validate response', async ({ apiClient }) => {
    // Arrange - Use external source of data (data-driven)
    const userData = testData.users[0];
    const limit = 300; // limit variable = 300 ms

    // Act - Send proper request
    const { response, duration } = await measureResponseTime(
      apiClient.post('users', userData)
    );

    const body = await response.json();

    // Assert - HTTP code
    expect(response.status()).toBe(201);
    
    // Assert - ID field
    expect(body).toHaveProperty('id');
    expect(typeof body.id).toBe('string');
    expect(body.id).not.toBeNull();
    
    // Assert - timestamp of createdAt
    expect(body).toHaveProperty('createdAt');
    expect(typeof body.createdAt).toBe('string');
    expect(body.createdAt).not.toBeNull();
    
    // Assert whether Response time was less than a variable (e.g. limit = 100 ms)
    expect(duration).toBeLessThan(limit);
    
    // Create the assert to verify the response schema
    expect(body).toHaveProperty('name');
    expect(body).toHaveProperty('job');
    expect(body).toHaveProperty('id');
    expect(body).toHaveProperty('createdAt');
    
    expect(typeof body.name).toBe('string');
    expect(typeof body.job).toBe('string');
    expect(typeof body.id).toBe('string');
    expect(typeof body.createdAt).toBe('string');
  });
});
