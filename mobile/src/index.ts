import { remote } from 'webdriverio';
import config from './config/appium.config';
import { join } from 'path';

// Main test runner
async function runTests() {
  let driver: WebdriverIO.Browser | undefined;
  
  try {
    console.log('Starting Appium session...');
    
    // Start Appium session
    driver = await remote({
      ...config,
      capabilities: {
        ...config.capabilities,
        // For iOS Calculator app
        app: 'com.apple.calculator',
      } as any,
    });

    console.log('Appium session started successfully!');

    // Import and run test suites
    const { runBasicOperationsTests } = await import('./tests/basic-operations.spec');
    const { runAdvancedOperationsTests } = await import('./tests/advanced-operations.spec');

    // Run test suites
    console.log('\n=== Running Basic Operations Tests ===');
    await runBasicOperationsTests(driver);

    console.log('\n=== Running Advanced Operations Tests ===');
    await runAdvancedOperationsTests(driver);

    console.log('\n=== All tests completed successfully! ===');

  } catch (error) {
    console.error('Error during test execution:', error);
    process.exit(1);
  } finally {
    if (driver) {
      try {
        await driver.deleteSession();
        console.log('Appium session closed.');
      } catch (e) {
        console.error('Error closing session:', e);
      }
    }
  }
}

// Check if running as main module
if (require.main === module) {
  runTests().catch(console.error);
}

export { runTests };
