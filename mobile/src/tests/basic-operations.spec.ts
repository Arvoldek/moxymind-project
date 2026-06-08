import { WebDriver } from 'webdriverio';
import { CalculatorPage } from '../pages/calculator.page';

/**
 * Test Case 1: Basic Arithmetic Operations
 * 
 * Why this is essential:
 * - Tests fundamental calculator functionality
 * - Validates that basic arithmetic operations work correctly
 * - Ensures the app handles user input and produces correct results
 */

async function runBasicOperationsTests(driver: WebDriver): Promise<void> {
  const calculator = new CalculatorPage(driver);

  try {
    // Clear any existing state
    await calculator.clearDisplay();
    await driver.pause(500);

    // Test 1: Addition - 5 + 3 = 8
    console.log('Test 1: Testing 5 + 3 = 8');
    await calculator.enterNumber('5');
    await calculator.pressOperator('+');
    await calculator.enterNumber('3');
    await calculator.pressEquals();
    
    await driver.pause(500);
    const result1 = await calculator.getResult();
    console.log(`  Result: ${result1}`);
    
    // The result might have formatting, so we check if it contains the expected value
    if (!result1.includes('8') && !result1.includes('8.')) {
      throw new Error(`Addition failed: expected 8, got ${result1}`);
    }
    console.log('  ✓ Addition test passed');

    // Clear for next test
    await calculator.clearDisplay();
    await driver.pause(300);

    // Test 2: Subtraction - 10 - 4 = 6
    console.log('Test 2: Testing 10 - 4 = 6');
    await calculator.enterNumber('10');
    await calculator.pressOperator('-');
    await calculator.enterNumber('4');
    await calculator.pressEquals();
    
    await driver.pause(500);
    const result2 = await calculator.getResult();
    console.log(`  Result: ${result2}`);
    
    if (!result2.includes('6') && !result2.includes('6.')) {
      throw new Error(`Subtraction failed: expected 6, got ${result2}`);
    }
    console.log('  ✓ Subtraction test passed');

    // Clear for next test
    await calculator.clearDisplay();
    await driver.pause(300);

    // Test 3: Multiplication - 7 * 6 = 42
    console.log('Test 3: Testing 7 × 6 = 42');
    await calculator.enterNumber('7');
    await calculator.pressOperator('*');
    await calculator.enterNumber('6');
    await calculator.pressEquals();
    
    await driver.pause(500);
    const result3 = await calculator.getResult();
    console.log(`  Result: ${result3}`);
    
    if (!result3.includes('42') && !result3.includes('42.')) {
      throw new Error(`Multiplication failed: expected 42, got ${result3}`);
    }
    console.log('  ✓ Multiplication test passed');

    // Clear for next test
    await calculator.clearDisplay();
    await driver.pause(300);

    // Test 4: Division - 15 / 3 = 5
    console.log('Test 4: Testing 15 ÷ 3 = 5');
    await calculator.enterNumber('15');
    await calculator.pressOperator('/');
    await calculator.enterNumber('3');
    await calculator.pressEquals();
    
    await driver.pause(500);
    const result4 = await calculator.getResult();
    console.log(`  Result: ${result4}`);
    
    if (!result4.includes('5') && !result4.includes('5.')) {
      throw new Error(`Division failed: expected 5, got ${result4}`);
    }
    console.log('  ✓ Division test passed');

    console.log('\n✓ All Basic Arithmetic Operations tests passed!');

  } catch (error) {
    console.error('✗ Basic Arithmetic Operations test failed:', error);
    throw error;
  }
}

export { runBasicOperationsTests };

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
      await runBasicOperationsTests(driver);
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
