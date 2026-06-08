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
    const response = await apiClient.get('users', { page: '1' });
    const body = await response.json();

    await test.step('Act - Send a proper Request', async () => {
      expect(response.status()).toBe(200);
    });

    await test.step('Assert - Response body has total and data', async () => {
      expect(body).toHaveProperty('total');
      expect(typeof body.total).toBe('number');
      
      expect(body).toHaveProperty('data');
      expect(Array.isArray(body.data)).toBe(true);
    });

    await test.step('Assert "last_name" for the first and for the second User in "data"', async () => {
      expect(body.data[0]).toHaveProperty('last_name');
      expect(typeof body.data[0].last_name).toBe('string');
      expect(body.data[1]).toHaveProperty('last_name');
      expect(typeof body.data[1].last_name).toBe('string');
    });

    await test.step('Count number of received users in "data" and compare it to the received value "total"', async () => {
      const usersInData = body.data.length;
      expect(usersInData).toBeLessThanOrEqual(body.total);
    });

    await test.step('Create assertions for possible data types present in the response', async () => {
      expect(typeof body.page).toBe('number');
      expect(typeof body.per_page).toBe('number');
      expect(typeof body.total_pages).toBe('number');
    });

    await test.step('Validate user data types', async () => {
      for (const user of body.data) {
        expect(typeof user.id).toBe('number');
        expect(typeof user.email).toBe('string');
        expect(typeof user.first_name).toBe('string');
        expect(typeof user.last_name).toBe('string');
        expect(typeof user.avatar).toBe('string');
      }
    });
  });
});
