import Keys from "./keys.js";
import state from "../state/state.js";

class CalculatorManager {
  
  static cm = new this();
  
  #calculatorState;
  #currentOperation;
  #currentNumbers;
  #allNumbers;

  constructor() {
    this.#currentOperation = null;
    this.#calculatorState = null;
    this.#currentNumbers = [];
    this.#allNumbers = [];
  }

  calculate() {
    let resultString = '';

    for (let i = 0; i < this.#allNumbers.length; i++) {
      const array = this.#allNumbers[i];
      if (Keys.operationKeys.includes(array[0])) {
          resultString += array[0];
        }
      else if (Keys.numberKeys.includes(array[0])) {
        resultString += array.join('');
      }
    }

    console.log(resultString);

    this.#allNumbers = [];
    this.#currentNumbers = [String(eval(resultString))];
    console.log(eval(resultString));
  }

  pushOperation(operation) {
    this.#allNumbers.push([operation]);
  }
  
  pushCurrentNumber(number) {
    this.#currentNumbers.push(number);
    console.log('Current numbers: ', this.#currentNumbers);
  }

  removeLatestNumber() {
    this.#currentNumbers.pop();
    console.log('Current numbers: ', this.#currentNumbers);
  }

  updateAllNumbers() {
    this.#allNumbers.push(this.#currentNumbers);
    this.#currentNumbers = [];
    console.log('All numbers: ', this.#allNumbers);
  }

  reset() {
    this.#currentOperation = null;
    this.#currentNumbers = [];
    this.#allNumbers = [];
    console.log('Current numbers: ', this.#currentNumbers);
  }

  setState(calculatorState) {
    this.#calculatorState = calculatorState;
  }

  getState() {
    return this.#calculatorState;
  }

  getCurrentNumbers() {
    return this.#currentNumbers;
  }

  getAllNumbers() {
    return this.#allNumbers;
  }

  setCurrentOperation(operation) {
    this.#currentOperation = operation;
  }

  getCurrentOperation() {
    return this.#currentOperation;
  }
}

export default CalculatorManager;
