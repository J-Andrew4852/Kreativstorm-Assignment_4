import CalculatorManager from "../calculator/calculator-manager.js";

const displayElements = {
  screenTopDisplay: document.getElementById('screenTop'),
  screenMainDisplay: document.getElementById('screenMain'),
  buttons: document.querySelectorAll('button'),

  displayTopNumbers() {
    let history = CalculatorManager.cm.getAllNumbers();
    let current = CalculatorManager.cm.getCurrentNumbers();
    let topNumbers = history.concat(current).join('');
    console.log('Display Top Numbers: ', topNumbers);
    displayElements.screenTopDisplay.textContent = topNumbers;
  },
  displayMainNumbers() {
    let current = CalculatorManager.cm.getCurrentNumbers().join('');;
    console.log('Display Current Numbers: ', current);
    displayElements.screenMainDisplay.textContent = current;
  }
}


export default displayElements;
