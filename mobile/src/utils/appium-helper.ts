import { remote, WebDriver } from 'webdriverio';
import config from '../../appium.config';
import { CalculatorPage } from '../pages/calculator.page';

export interface MobileFixtures {
  driver: WebDriver;
  calculatorPage: CalculatorPage;
}

// Start Appium session
async function startSession(): Promise<WebDriver> {
  return await remote({
    ...config,
    capabilities: {
      ...config.capabilities,
      app: 'com.apple.calculator',
    },
  });
}

// Initialize page objects
export async function getCalculatorPage(driver: WebDriver): Promise<CalculatorPage> {
  return new CalculatorPage(driver);
}

// Setup hooks
export async function setup(): Promise<MobileFixtures> {
  const driver = await startSession();
  const calculatorPage = new CalculatorPage(driver);
  
  return { driver, calculatorPage };
}

export async function teardown(fixtures: MobileFixtures): Promise<void> {
  try {
    await fixtures.driver.deleteSession();
    console.log('Appium session closed.');
  } catch (e) {
    console.error('Error closing Appium session:', e);
  }
}

// Helper to boot simulator
export async function ensureSimulatorRunning(deviceUDID: string): Promise<void> {
  const { execSync } = require('child_process');
  
  try {
    // Check if simulator is already booted
    const status = execSync(
      `/Applications/Xcode.app/Contents/Developer/usr/bin/xcrun simctl getenv ${deviceUDID} SIMULATOR_DEVICE_PAIRING_RECORD`
    ).toString();
    
    if (!status.includes('Booted')) {
      console.log(`Booting simulator ${deviceUDID}...`);
      execSync(
        `/Applications/Xcode.app/Contents/Developer/usr/bin/xcrun simctl boot ${deviceUDID}`
      );
      // Wait for simulator to boot
      await new Promise(resolve => setTimeout(resolve, 5000));
    }
  } catch (e) {
    // Simulator might not be booted, try to boot it
    console.log(`Attempting to boot simulator ${deviceUDID}...`);
    try {
      execSync(
        `/Applications/Xcode.app/Contents/Developer/usr/bin/xcrun simctl boot ${deviceUDID}`
      );
      await new Promise(resolve => setTimeout(resolve, 5000));
    } catch (bootError) {
      console.error('Failed to boot simulator:', bootError);
      throw new Error('Could not boot iOS simulator');
    }
  }
}
