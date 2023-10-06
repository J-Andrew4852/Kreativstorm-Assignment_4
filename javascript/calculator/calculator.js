import CalculatorManager from "./calculator-manager.js";
import Keys from "./keys.js";
import state from "../state/state.js";

class Calculator {
  static run() {
    this.registerKeyboard();
    CalculatorManager.cm.setState(state.NUMBERS);
  }

  static registerKeyboard() {
    document.addEventListener('keydown', (event) => {
      if (!Keys.keys.includes(event.key)) return;
      this.#calculatorStateCases();
    });
  }

  static #calculatorStateCases() {
    switch (CalculatorManager.cm.getState()) {
      case state.NUMBERS:
        this.#calculatorNumberCase();
        break;

      case state.OPERATION:
        this.#calculatorOperationCase();
        break;
    }
  }

  static #calculatorNumberCase() {
    if (Keys.numberKeys.includes(event.key)) {

      if (event.key === '.') {
        if (CalculatorManager.cm.getCurrentNumbers().includes('.')) return;
        if (CalculatorManager.cm.getCurrentNumbers().length === 0) {
          CalculatorManager.cm.pushCurrentNumber('0');
        }
      }
      CalculatorManager.cm.pushCurrentNumber(event.key);
    } else if (Keys.operationKeys.includes(event.key)) {

      CalculatorManager.cm.updateAllNumbers();
      CalculatorManager.cm.setCurrentOperation(event.key);
      CalculatorManager.cm.setState(state.OPERATION);
    } else if (Keys.commandKeys.includes(event.key)) {

      this.#calculatorCommandCase(); 
    }
  }

  static #calculatorOperationCase() {
    if (Keys.operationKeys.includes(event.key)) {

      CalculatorManager.cm.setCurrentOperation(event.key);
    } else if (Keys.numberKeys.includes(event.key)) {
      if (CalculatorManager.cm.getAllNumbers().length !== 0) {
        CalculatorManager.cm.pushOperation(CalculatorManager.cm.getCurrentOperation());
      }
      CalculatorManager.cm.setState(state.NUMBERS);
      this.#calculatorNumberCase();
    } else if (Keys.commandKeys.includes(event.key)) {

      this.#calculatorCommandCase();
    }
  }

  static #calculatorCommandCase() {
    switch (event.key) {
      case 'Enter':
        CalculatorManager.cm.updateAllNumbers();
        CalculatorManager.cm.calculate();
        break;
      
      case '=':
        CalculatorManager.cm.updateAllNumbers();
        CalculatorManager.cm.calculate();
        break;

      case 'Backspace':
        if (CalculatorManager.cm.getState() === state.NUMBERS)
          CalculatorManager.cm.removeLatestNumber();
        break;

      case 'c':
        CalculatorManager.cm.reset();
        break;
    }
  }
}


export default Calculator;