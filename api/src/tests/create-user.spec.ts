import { test, expect } from "../utils/helpers";
import { measureResponseTime, validateResponseSchema } from "../utils/helpers";
import testData from "../fixtures/test-data.json";
import { CREATE_USER_RESPONSE_SCHEMA } from "../fixtures/schemas";

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
test.describe.serial("POST - Create User", () => {
  test("POST - Create User and validate response", async ({ apiClient }) => {
    const userData = testData.users[0];
    const limit = 300;

    const { response, duration } = await measureResponseTime(
      apiClient.post("users", userData),
    );
    const body = await response.json();

    await test.step("Arrange - Use external source of data (data-driven)", async () => {
      expect(userData).toBeDefined();
    });

    await test.step("Act - Send proper request and Assert - HTTP code", async () => {
      expect(response.status()).toBe(201);
    });

    await test.step("Assert - ID field", async () => {
      expect(body).toHaveProperty("id");
      expect(typeof body.id).toBe("string");
      expect(body.id).not.toBeNull();
    });

    await test.step("Assert - timestamp of createdAt", async () => {
      expect(body).toHaveProperty("createdAt");
      expect(typeof body.createdAt).toBe("string");
      expect(body.createdAt).not.toBeNull();
    });

    await test.step("Assert whether Response time was less than a variable", async () => {
      expect(duration).toBeLessThan(limit);
    });

    await test.step("Create the assert to verify the response schema", async () => {
      validateResponseSchema(body, CREATE_USER_RESPONSE_SCHEMA);
    });
  });
});
