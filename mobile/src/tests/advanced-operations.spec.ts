import { WebDriver } from 'webdriverio';
import { CalculatorPage } from '../pages/calculator.page';

/**
 * Test Case 2: Complex Calculation Sequence
 * 
 * Why this is essential:
 * - Tests multi-step calculations
 * - Validates that the calculator maintains state correctly
 * - Ensures complex operations produce accurate results
 */

async function runAdvancedOperationsTests(driver: WebDriver): Promise<void> {
  const calculator = new CalculatorPage(driver);

  try {
    // Clear any existing state
    await calculator.clearDisplay();
    await driver.pause(500);

    // Test 1: Complex sequence - ((5 + 3) * 2) - 4 = 12
    console.log('Test 1: Testing ((5 + 3) * 2) - 4 = 12');
    
    // Step 1: 5 + 3 = 8
    await calculator.enterNumber('5');
    await calculator.pressOperator('+');
    await calculator.enterNumber('3');
    await calculator.pressEquals();
    await driver.pause(300);
    
    // Step 2: * 2 = 16
    await calculator.pressOperator('*');
    await calculator.enterNumber('2');
    await calculator.pressEquals();
    await driver.pause(300);
    
    // Step 3: - 4 = 12
    await calculator.pressOperator('-');
    await calculator.enterNumber('4');
    await calculator.pressEquals();
    await driver.pause(500);
    
    const result1 = await calculator.getResult();
    console.log(`  Result: ${result1}`);
    
    if (!result1.includes('12') && !result1.includes('12.')) {
      throw new Error(`Complex calculation failed: expected 12, got ${result1}`);
    }
    console.log('  ✓ Complex calculation test passed');

    // Clear for next test
    await calculator.clearDisplay();
    await driver.pause(300);

    // Test 2: Clear and verify reset
    console.log('Test 2: Testing clear functionality');
    await calculator.enterNumber('999');
    await calculator.clearDisplay();
    await driver.pause(300);
    
    const result2 = await calculator.getResult();
    console.log(`  Result after clear: ${result2}`);
    
    // After clear, the display should show 0
    if (!result2.includes('0') && result2 !== '') {
      throw new Error(`Clear failed: expected 0 or empty, got ${result2}`);
    }
    console.log('  ✓ Clear functionality test passed');

    // Test 3: Multiple operations in sequence
    console.log('Test 3: Testing multiple operations');
    await calculator.enterNumber('10');
    await calculator.pressOperator('+');
    await calculator.enterNumber('5');
    await calculator.pressEquals();
    await driver.pause(300);
    
    await calculator.pressOperator('-');
    await calculator.enterNumber('3');
    await calculator.pressEquals();
    await driver.pause(300);
    
    const result3 = await calculator.getResult();
    console.log(`  Result: ${result3}`);
    
    // 10 + 5 = 15, 15 - 3 = 12
    if (!result3.includes('12') && !result3.includes('12.')) {
      throw new Error(`Multiple operations failed: expected 12, got ${result3}`);
    }
    console.log('  ✓ Multiple operations test passed');

    console.log('\n✓ All Advanced Operations tests passed!');

  } catch (error) {
    console.error('✗ Advanced Operations test failed:', error);
    throw error;
  }
}

export { runAdvancedOperationsTests };

// For direct execution
if (require.main === module) {
  const { remote } = require('webdriverio');
  const config = require('../../appium.config').default;

  (async () => {
    let driver: WebDriver;
    try {
      driver = await remote({
        ...config,
        capabilities: {
          ...config.capabilities,
          app: 'com.apple.calculator',
        },
      });
      await runAdvancedOperationsTests(driver);
    } catch (error) {
      console.error('Test failed:', error);
      process.exit(1);
    } finally {
      if (driver) {
        await driver.deleteSession();
      }
    }
  })();
}
