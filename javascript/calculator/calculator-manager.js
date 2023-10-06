import state from "../state/state.js";

class CalculatorManager {
  
  static cm = new this();
  
  #calculatorState;
  #currentOperation;
  #currentValues;

  constructor() {
    this.#currentOperation = null;
    this.#calculatorState = null;
    this.#currentValues = [];
  }
  
  setState(calculatorState) {
    this.#calculatorState = calculatorState;
  }

  getState() {
    return this.#calculatorState;
  }
}

export default CalculatorManager;
