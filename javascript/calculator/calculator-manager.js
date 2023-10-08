import Display from '../display/display.js'
class CalculatorManager {

    static cm = new this();

    #currentNumbers = [];
    #history = [];

    calculate() {
        let total = parseFloat(this.#history[0]) ?? 0;
        // console.log("init > " + total)
        for (let i = 0; i < this.#history.length; i += 2) {
            if (i === 0) continue; // Already initialized
            if (this.#history[i] === undefined) continue;
            // Number
            switch (this.#history[i - 1]) {
                case '+':
                    total += parseFloat(this.#history[i]);
                    break;
                case '-':
                    total -= parseFloat(this.#history[i]);
                    break;
                case '/':
                    total /= parseFloat(this.#history[i]);
                    break;
                case '*':
                    total *= parseFloat(this.#history[i]);
                    break;
                case '%':
                    // console.log('%')
                    // console.log('Hist', this.#history[i])
                    break;
            }
        }
        total = Math.round(total * 100) / 100;
        // console.log("total > " + total)
        this.#history.push("=");
        Display.displayTopNumbers();
        // reset the history and put the total in the history
        this.softReset();
        this.#currentNumbers.push(String(total));
        Display.displayMainNumbers();
        return total;
    }

    pushOperation(operation) {
        if (this.#currentNumbers.length === 0 && this.#history.length === 0) {
            return;
        }
        if (this.#currentNumbers.length === 0 && this.#history.some(operator => ['+', '-', '*', '/'].includes(operator))) {
            return;
        }
              
        this.pushCurrentNumberToHistory();
        this.#history.push(operation);
        // console.log('All numbers after operation: ', this.#history);
        Display.displayTopNumbers();
    }

    pushCurrentNumber(number) {
        this.#currentNumbers.push(number);
        // console.log('Current numbers: ', this.#currentNumbers);
        Display.displayTopNumbers();
    }

    removeLatestNumber() {
        // console.log('lastNum', this.#history, this.#currentNumbers)
        if (this.#currentNumbers.length > 0) {
            this.#currentNumbers.pop();
            // console.log('Current numbers: ', this.#currentNumbers);
            if (this.#currentNumbers.length === 0 && this.#history.length === 0) {
                this.hardReset()
            }
        } else if (this.#history.length > 0) {
            this.#history.pop();
            // console.log('History: ', this.#history);
            if (this.#history.length === 0) {
                this.hardReset()
            }
        } else {
            return
        }
        Display.displayTopNumbers();
    }

    pushCurrentNumberToHistory() {
        if (this.#currentNumbers.length === 0) return;
        this.#history.push(this.#currentNumbers.join(""));
        this.#currentNumbers = [];
        // console.log('All numbers: ', this.#history);
    }

    hardReset() {
        this.#currentNumbers = [];
        this.#history = [];
        // console.log('Current numbers: ', this.#currentNumbers);
        Display.displayTopNumbers();
        Display.displayMainNumbers();
        // console.log('hardReset')
    }
    softReset() {
        this.#history = [];
        this.#currentNumbers = [];
        // console.log('Current numbers: ', this.#currentNumbers);
    }

    getCurrentNumbers() {
        return this.#currentNumbers;
    }

    getAllNumbers() {
        return this.#history;
    }

    changeSignOfCurrentNumber() {
        if (this.#currentNumbers.length === 0) return;
        if (this.#currentNumbers[0]?.charAt(0) === '-') {
            this.#currentNumbers[0] = this.#currentNumbers[0].slice(1);
        } else {
            this.#currentNumbers[0] = '-' + this.#currentNumbers[0];
        }
        // console.log('Current numbers: ', this.#currentNumbers);
        Display.displayTopNumbers();
        Display.displayMainNumbers();
    }
}

export default CalculatorManager;
