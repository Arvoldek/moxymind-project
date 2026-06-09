import { remote } from "webdriverio";
import { config } from "../config/config";

let driver: WebdriverIO.Browser;

export async function getDriver(): Promise<WebdriverIO.Browser> {
  if (!driver) {
    console.log("Starting Appium session...");
    driver = await remote({ ...config });
    console.log("Session started!\n");
  }
  return driver;
}

export async function cleanupDriver(): Promise<void> {
  if (driver) {
    try {
      await driver.deleteSession();
      console.log("\nSession closed.");
    } catch (error) {
      console.log("\nError closing session:", error);
    }
  }
}
