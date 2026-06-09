export const config = {
  hostname: '127.0.0.1',
  port: 4723,
  path: '/',
  capabilities: {
    platformName: 'iOS',
    'appium:udid': '8B2E58DE-E51D-4F35-9148-FD0CEF9A5847',
    'appium:deviceName': 'iPhone 17 Pro',
    'appium:automationName': 'XCUITest',
    'appium:bundleId': 'com.apple.MobileAddressBook',
    'appium:noReset': false,
    'appium:fullReset': false,
  },
  timeout: 60000,
};
