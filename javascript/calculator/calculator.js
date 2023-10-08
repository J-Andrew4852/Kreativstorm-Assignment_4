import CalculatorManager from "./calculator-manager.js";
import Keys from "./keys.js";
import Display from "../display/display.js"

class Calculator {
    static run() {
        this.registerKeyboard();
    }

    static registerKeyboard() {
        document.addEventListener('keydown', (event) => {
            Calculator.#handleKeyPress(event.key)
        });

        const elements = document.querySelectorAll("button[data-calculator]")
        elements.forEach(el => {
            el.addEventListener("click", () => {
                switch (el.getAttribute("data-calculator")) {
                    case 'generic':
                        Calculator.#handleKeyPress(el.innerText);
                        break;
                    case 'reset':
                        Calculator.#handleKeyPress('c');
                        break;
                    case 'changesign':
                        Calculator.#handleKeyPress("ChangeSign");
                        break;
                }
            })
        })
    }

    static #handleKeyPress(key) {
        if (!Keys.keys.includes(key)) return;

        if (Keys.commandKeys.includes(key)) {
            Calculator.#calculatorCommandCase(key)
        }
        if (Keys.numberKeys.includes(key)) {
            Calculator.#calculatorNumberCase(key)
        }
        if (Keys.operationKeys.includes(key)) {
            Calculator.#calculatorOperationCase(key)
        }
    }

    static #calculatorNumberCase(key) {
        if (key === '.') {
            if (CalculatorManager.cm.getCurrentNumbers().includes('.')) return;
            if (CalculatorManager.cm.getCurrentNumbers().length === 0) {
                CalculatorManager.cm.pushCurrentNumber('0');
            }
        }
        CalculatorManager.cm.pushCurrentNumber(key);
    }

    static #calculatorOperationCase(key) {
        let allNumbers = CalculatorManager.cm.getAllNumbers();
        const lastChar = allNumbers[allNumbers.length - 1];
        if (['+', '-', '*', '/'].includes(lastChar)) {
            return;
        }
        CalculatorManager.cm.pushOperation(key);
    }

    static #calculatorCommandCase(key) {
        switch (key) {
            case 'Enter':
                CalculatorManager.cm.pushCurrentNumberToHistory();
                CalculatorManager.cm.calculate();
                break;

            case '=':
                CalculatorManager.cm.pushCurrentNumberToHistory();
                CalculatorManager.cm.calculate();
                break;

            case 'Backspace':
                CalculatorManager.cm.removeLatestNumber();
                break;

            case 'c':
                CalculatorManager.cm.hardReset();
                break;
            case 'ChangeSign':
                CalculatorManager.cm.changeSignOfCurrentNumber();
                break;
        }
    }
}


export default Calculator;