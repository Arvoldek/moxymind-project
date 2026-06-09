import { getDriver } from "../support/setup";
import { ContactsPage } from "../pages/contacts.page";
import assert from "assert";

const TEST_FIRST_NAME = "Test";
const TEST_LAST_NAME = "User";
const TEST_FULL_NAME = `${TEST_FIRST_NAME} ${TEST_LAST_NAME}`;

describe("Contacts Suite", () => {
  let contacts: ContactsPage;
  let driver: WebdriverIO.Browser;

  before(async function () {
    driver = await getDriver();
    contacts = new ContactsPage(driver);

    // Wait for app to load and launch Contacts
    await driver.pause(5000);
    await driver.launchApp({ bundleId: "com.apple.MobileAddressBook" });
    await driver.pause(5000);
  });

  it("should create a new contact and verify it exists", async function () {
    await contacts.addContact(TEST_FIRST_NAME, TEST_LAST_NAME);

    const exists = await contacts.contactExists(TEST_FIRST_NAME);
    assert.strictEqual(
      exists,
      true,
      `Contact "${TEST_FIRST_NAME}" should exist`,
    );
  });

  it("should delete the contact and verify it no longer exists", async function () {
    await contacts.deleteContact(TEST_FIRST_NAME);

    const stillExists = await contacts.contactExists(TEST_FIRST_NAME);
    assert.strictEqual(
      stillExists,
      false,
      `Contact "${TEST_FIRST_NAME}" should not exist`,
    );
  });
});
