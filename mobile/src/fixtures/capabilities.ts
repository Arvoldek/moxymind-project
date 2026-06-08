import { Capabilities } from '@wdio/types';

// iOS Simulator capabilities for Calculator app
export const iosCalculatorCapabilities: Capabilities = {
  platformName: 'iOS',
  platformVersion: '26.5',
  deviceName: 'iPhone 17 Pro',
  automationName: 'XCUITest',
  app: 'com.apple.calculator', // iOS built-in Calculator app bundle ID
  noReset: true,
  fullReset: false,
  showIOSLog: true,
  wdaLocalPort: 8100,
  webkitDebugProxyPort: 27753,
  derivedDataPath: '/tmp/appium',
  // Use existing app on device
  useNewWDA: true,
  // Don't install the app, use the one already on the simulator
  skipUninstall: true,
};

// Function to get device UDID dynamically
export function getDeviceUDID(): string {
  const { execSync } = require('child_process');
  
  try {
    // Get first available iPhone 17 Pro
    const output = execSync(
      '/Applications/Xcode.app/Contents/Developer/usr/bin/simctl list devices | grep "iPhone 17 Pro" | grep -v "Booted" | head -1 | awk \'{print $(NF-1)}\' | tr -d \)'
    ).toString().trim();
    
    if (output) {
      return output;
    }
  } catch (e) {
    // Fallback to hardcoded UDID
  }
  
  // Default fallback UDID - replace with your device UDID
  return '8B2E58DE-E51D-4F35-9148-FD0CEF9A5847';
}

// Create capabilities with dynamic UDID
export function createCapabilities(udid?: string): Capabilities {
  const caps = { ...iosCalculatorCapabilities };
  
  if (udid) {
    caps['appium:udid'] = udid;
  } else {
    caps['appium:udid'] = getDeviceUDID();
  }
  
  return caps;
}
