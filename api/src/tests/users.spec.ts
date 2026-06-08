import { test, expect } from '../utils/helpers';

/**
 * Test Case 1: GET - List Users
 * 
 * From instructions.md:
 * - Send a proper Request.
 * - Assert received data in Response:
 *   - "total"
 *   - "last_name" for the first and for the second User in "data"
 * - Count number of received users in "data" and compare it to the received value "total".
 * - Create assertions for possible data types present in the response.
 */
test.describe.serial('GET - List Users', () => {
  test('GET - List Users and validate response', async ({ apiClient }) => {
    // Act - Send a proper Request
    const response = await apiClient.get('users', { page: '1' });

    // Assert - Status code
    expect(response.status()).toBe(200);

    // Assert - Response body
    const body = await response.json();
    
    // Assert "total" field
    expect(body).toHaveProperty('total');
    expect(typeof body.total).toBe('number');
    
    // Assert "data" array exists
    expect(body).toHaveProperty('data');
    expect(Array.isArray(body.data)).toBe(true);
    
    // Assert "last_name" for the first and for the second User in "data"
    expect(body.data[0]).toHaveProperty('last_name');
    expect(typeof body.data[0].last_name).toBe('string');
    expect(body.data[1]).toHaveProperty('last_name');
    expect(typeof body.data[1].last_name).toBe('string');
    
    // Count number of received users in "data" and compare it to the received value "total"
    const usersInData = body.data.length;
    expect(usersInData).toBeLessThanOrEqual(body.total);
    
    // Create assertions for possible data types present in the response
    expect(typeof body.page).toBe('number');
    expect(typeof body.per_page).toBe('number');
    expect(typeof body.total_pages).toBe('number');
    
    // Validate user data types
    for (const user of body.data) {
      expect(typeof user.id).toBe('number');
      expect(typeof user.email).toBe('string');
      expect(typeof user.first_name).toBe('string');
      expect(typeof user.last_name).toBe('string');
      expect(typeof user.avatar).toBe('string');
    }
  });
});
