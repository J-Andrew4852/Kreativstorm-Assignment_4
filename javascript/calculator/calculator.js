import CalculatorManager from "./calculator-manager.js";
import Keys from "./keys.js";
import state from "../state/state.js";

class Calculator {

  static numberKeys = ['.', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  static operationKeys = ['+', '-', '%', '*', '/'];
  static commandKeys = ['=', 'c', 'Backspace', 'Enter'];
  static keys = [
                  ...Calculator.numberKeys, 
                  ...Calculator.operationKeys,
                  ...Calculator.commandKeys
                ];

  static run() {
    this.registerKeyboard();
    CalculatorManager.cm.setState(state.NUMBERS);
  }

  static registerKeyboard() {
    document.addEventListener('keydown', (event) => {
      if (!Keys.keys.includes(event.key)) return;
      this.calculatorStateCases();
    });
  }

  static calculatorStateCases() {
    switch (CalculatorManager.cm.getState()) {
      case state.NUMBERS:
        this.calculatorNumberCase();
        break;

      case state.OPERATION:
        this.calculatorOperationCase();
        break;
    }
  }

  static calculatorNumberCase() {
    if (Keys.numberKeys.includes(event.key)) {

      if (event.key === '.' && 
      // Fix DOT situation where array size is 0.
      CalculatorManager.cm.getCurrentNumbers().includes('.')) return;
      CalculatorManager.cm.pushCurrentNumber(event.key);
    } else if (Keys.operationKeys.includes(event.key)) {

      CalculatorManager.cm.updateAllNumbers();
      CalculatorManager.cm.setCurrentOperation(event.key);
      CalculatorManager.cm.setState(state.OPERATION);
    } else if (Keys.commandKeys.includes(event.key)) {
      this.calculatorCommandCase(); 
    }
  }

  static calculatorOperationCase() {
    if (Keys.operationKeys.includes(event.key)) {

      CalculatorManager.cm.setCurrentOperation(event.key);
    } else if (Keys.numberKeys.includes(event.key)) {

      CalculatorManager.cm.pushOperation(CalculatorManager.cm.getCurrentOperation());
      CalculatorManager.cm.setState(state.NUMBERS);
      this.calculatorNumberCase();
    }
  }

  static calculatorCommandCase() {
    switch (event.key) {
      case 'Enter':
        CalculatorManager.cm.updateAllNumbers();
        CalculatorManager.cm.calculate();
        break;
      
      case '=':
        CalculatorManager.cm.updateAllNumbers();
        CalculatorManager.cm.calculate();
        break;
    }
  }
}


export default Calculator;