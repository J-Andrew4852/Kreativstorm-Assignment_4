class Calculator {

  static keys = [
    '1', '2', '3', '4', '5', '6', '7', '8', '9', 
    '+', '-', '%', '*', '/', '=', 'c', 'Backspace'
  ];

  static run() {

  }

  static registerKeyboard() {
    document.addEventListener('keydown', (event) => {
      if (!this.keys.includes(event.key)) return;
    });
  }
}


export default Calculator;