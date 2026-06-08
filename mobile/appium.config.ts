import { AppiumConfig } from '@appium/types';

// Dynamic import to get device UDID at runtime
const getDeviceUDID = (): string => {
  // Try to get an available iPhone 17 Pro device
  const { execSync } = require('child_process');
  try {
    const output = execSync(
      '/Applications/Xcode.app/Contents/Developer/usr/bin/simctl list devices | grep "iPhone 17 Pro" | grep -v "Booted" | head -1 | awk \'{print $(NF-1)}\' | tr -d \)'
    ).toString().trim();
    if (output) return output;
  } catch (e) {
    // Fallback to hardcoded UDID
  }
  // Fallback UDID - replace with your actual device
  return '8B2E58DE-E51D-4F35-9148-FD0CEF9A5847';
};

const config: AppiumConfig = {
  server: {
    address: '127.0.0.1',
    port: 4723,
  },
  driver: {
    name: 'XCUITest',
  },
  appium: {
    // Appium server options
    useRunningApp: true,
  },
  capabilities: {
    platformName: 'iOS',
    platformVersion: '26.5',
    deviceName: 'iPhone 17 Pro',
    udid: getDeviceUDID(),
    automationName: 'XCUITest',
    app: 'com.apple.calculator', // iOS built-in Calculator app
    noReset: true,
    fullReset: false,
    showIOSLog: true,
    // iOS specific capabilities
    wdaLocalPort: 8100,
    webkitDebugProxyPort: 27753,
    derivedDataPath: '/tmp/appium',
    // Ensure simulator is booted
    isHeadless: process.env.HEADLESS === 'true',
  },
  reporters: ['html'],
  outputDir: './reports',
  timeout: 60000,
};

export default config;
