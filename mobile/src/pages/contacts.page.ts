export class ContactsPage {
  private driver: WebdriverIO.Browser;

  constructor(driver: WebdriverIO.Browser) {
    this.driver = driver;
  }

  async addContact(firstName: string, lastName: string) {
    await this.driver.pause(2000);
    await this.driver.$('//XCUIElementTypeButton[@name="Add"]').click();
    await this.driver.pause(2000);
    await this.driver
      .$('//XCUIElementTypeTextField[@name="First name"]')
      .setValue(firstName);
    await this.driver.pause(1000);
    await this.driver
      .$('//XCUIElementTypeTextField[@name="Last name"]')
      .setValue(lastName);
    await this.driver.pause(1000);
    await this.driver.$('//XCUIElementTypeButton[@name="Done"]').click();
    await this.driver.pause(3000);
  }

  async contactExists(name: string): Promise<boolean> {
    const cells = await this.driver.$$("//XCUIElementTypeCell");
    for (const cell of cells) {
      const staticTexts = await cell.$$("//XCUIElementTypeStaticText");
      for (const textElement of staticTexts) {
        const text = await textElement.getText();
        if (text.includes(name)) return true;
      }
    }
    return false;
  }

  async deleteContact(name: string) {
    const cells = await this.driver.$$("//XCUIElementTypeCell");
    for (const cell of cells) {
      const staticTexts = await cell.$$("//XCUIElementTypeStaticText");
      for (const textElement of staticTexts) {
        const text = await textElement.getText();
        if (text.includes(name)) {
          await cell.click();
          await this.driver.pause(2000);

          await this.driver.$('//XCUIElementTypeButton[@name="Edit"]').click();
          await this.driver.pause(2000);

          await this.driver.execute("mobile: scroll", {
            direction: "down",
            distance: 2,
          });
          await this.driver.pause(1000);

          await this.driver.$('//*[contains(@name, "Delete")]').click();
          await this.driver.pause(1000);

          const deleteButtons = await this.driver.$$(
            '//*[@name="Delete Contact"]',
          );
          await deleteButtons[0].click();
          await this.driver.pause(2000);
          return;
        }
      }
    }
    throw new Error(`Contact "${name}" not found for deletion`);
  }
}
