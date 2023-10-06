import CalculatorManager from "./calculator-manager.js";
import state from "../state/state.js";

class Calculator {

  static numberKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  static operationKeys = ['+', '-', '%', '*', '/'];
  static commandKeys = ['=', 'c', 'Backspace'];
  static keys = [
                  ...Calculator.numberKeys, 
                  ...Calculator.operationKeys,
                  ...Calculator.commandKeys
                ];

  static run() {
    Calculator.registerKeyboard();
    CalculatorManager.cm.setState(state.NUMBERS);
  }

  static registerKeyboard() {
    document.addEventListener('keydown', (event) => {
      if (!Calculator.keys.includes(event.key)) return;
      
      switch (CalculatorManager.cm.getState()) {
        case state.NUMBERS:
          if(Calculator.numberKeys.includes(event.key)) {
            console.log(event.key);
          }
          break;

        case state.OPERATION:
          break;
      }

    });
  }
}


export default Calculator;