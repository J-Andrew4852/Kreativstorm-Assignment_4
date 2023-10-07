class CalculatorManager {

    static cm = new this();

    #currentNumbers = [];
    #history = [];

    calculate() {
        let total = parseFloat(this.#history[0]) ?? 0;
        console.log("init > " + total)
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
                    total /= 100;
                    break;
            }
        }

        total = Math.round(total * 100) / 100;
        console.log("total > " + total)

        // reset the history and put the total in the history
        this.reset();
        this.#currentNumbers.push(String(total));
        return total;
    }

    pushOperation(operation) {
        if (this.#currentNumbers.length === 0) return;
        this.pushCurrentNumberToHistory();
        this.#history.push(operation);
        console.log('All numbers after operation: ', this.#history);
    }

    pushCurrentNumber(number) {
        this.#currentNumbers.push(number);

        console.log('Current numbers: ', this.#currentNumbers);
    }

    removeLatestNumber() {
        this.#currentNumbers.pop();
        console.log('Current numbers: ', this.#currentNumbers);
    }


    pushCurrentNumberToHistory() {
        if (this.#currentNumbers.length === 0) return;
        this.#history.push(this.#currentNumbers.join(""));
        this.#currentNumbers = [];
        console.log('All numbers: ', this.#history);
    }

    reset() {
        this.#currentNumbers = [];
        this.#history = [];
        console.log('Current numbers: ', this.#currentNumbers);
    }


    getCurrentNumbers() {
        return this.#currentNumbers;
    }

    getAllNumbers() {
        return this.#history;
    }

    changeSignOfCurrentNumber() {
        if (this.#currentNumbers[0] === '-') {
            this.#currentNumbers.shift();
        } else {
            this.#currentNumbers = ['-', ...this.#currentNumbers];
        }
        console.log('Current numbers: ', this.#currentNumbers);

    }
}

export default CalculatorManager;
