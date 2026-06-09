import { getDriver, cleanupDriver } from "./support/setup";

describe("Mobile App Tests", () => {
  before(async function () {
    await getDriver();
  });

  after(async function () {
    await cleanupDriver();
  });

  // Import test files inside the describe block so they run in this context
  require("./tests/contacts.spec");
});
