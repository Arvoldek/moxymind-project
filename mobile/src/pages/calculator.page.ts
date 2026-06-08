// iOS Calculator app element locators
export class CalculatorPage {
  private driver: WebdriverIO.Browser;

  // Button locators using accessibility IDs
  readonly digitButtons: Record<string, string>;
  readonly operatorButtons: Record<string, string>;
  readonly equalsButton: string;
  readonly clearButton: string;
  readonly resultLabel: string;

  constructor(driver: WebdriverIO.Browser) {
    this.driver = driver;

    // iOS Calculator uses accessibility IDs
    this.digitButtons = {
      '0': '0',
      '1': '1',
      '2': '2',
      '3': '3',
      '4': '4',
      '5': '5',
      '6': '6',
      '7': '7',
      '8': '8',
      '9': '9',
    };

    this.operatorButtons = {
      '+': '+',
      '-': '-',
      '×': '×',
      '÷': '÷',
      '=': '=',
    };

    this.equalsButton = '=';
    this.clearButton = 'AC';
    this.resultLabel = 'Result';
  }

  async pressDigit(digit: string) {
    if (digit in this.digitButtons) {
      await this.driver.$(`//XCUIElementTypeButton[@name="${digit}"]`).click();
    } else {
      throw new Error(`Digit ${digit} not found on calculator`);
    }
  }

  async pressOperator(operator: string) {
    const operatorMap: Record<string, string> = {
      '+': '+',
      '-': '-',
      '*': '×',
      'x': '×',
      '/': '÷',
      '=': '=',
    };

    const actualOperator = operatorMap[operator] || operator;
    await this.driver.$(`//XCUIElementTypeButton[@name="${actualOperator}"]`).click();
  }

  async pressEquals() {
    await this.driver.$(`//XCUIElementTypeButton[@name="="]`).click();
  }

  async pressClear() {
    await this.driver.$(`//XCUIElementTypeButton[@name="AC"]`).click();
  }

  async getDisplayText(): Promise<string> {
    // iOS Calculator displays result in a label
    // The accessibility label for the result display
    const element = await this.driver.$('//XCUIElementTypeStaticText');
    return await element.getText();
  }

  async getResult(): Promise<string> {
    // Alternative method to get result
    try {
      const result = await this.driver.$('//XCUIElementTypeStaticText[2]');
      return await result.getText();
    } catch (e) {
      // Try different index
      const result = await this.driver.$('//XCUIElementTypeStaticText[1]');
      return await result.getText();
    }
  }

  async enterNumber(number: string) {
    for (const digit of number) {
      await this.pressDigit(digit);
    }
  }

  async performOperation(
    operand1: string,
    operator: string,
    operand2: string
  ): Promise<string> {
    await this.enterNumber(operand1);
    await this.pressOperator(operator);
    await this.enterNumber(operand2);
    await this.pressEquals();
    
    // Wait for result
    await this.driver.pause(500);
    
    return await this.getResult();
  }

  async clearDisplay() {
    await this.pressClear();
  }
}
