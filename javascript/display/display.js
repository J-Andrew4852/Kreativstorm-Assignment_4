import CalculatorManager from "../calculator/calculator-manager.js";

const displayElements = {
  screenTopDisplay: document.getElementById('screenTop'),
  screenMainDisplay: document.getElementById('screenMain'),
  buttons: document.querySelectorAll('button'),

  displayTopNumbers() {
    let history = CalculatorManager.cm.getAllNumbers();
    let current = CalculatorManager.cm.getCurrentNumbers();
    let topNumbers = history.concat(current).join('');
    displayElements.screenTopDisplay.textContent = topNumbers;
  },
  displayMainNumbers() {
    let current = CalculatorManager.cm.getCurrentNumbers().join('');;
    displayElements.screenMainDisplay.textContent = current;
  },

  displayLightDarkMode() {
    const toggleButton = document.querySelector(".toggleLDMode");
    const sunIcon = document.getElementById("sunIcon");
    const moonIcon = document.getElementById("moonIcon");

    toggleButton.addEventListener("click", () => {
      sunIcon.classList.toggle("active");
      sunIcon.classList.toggle("inactive");
      moonIcon.classList.toggle("active");
      moonIcon.classList.toggle("inactive");
      document.body.classList.toggle("darkMode");
      document.body.classList.toggle("lightMode");
    });
  }
}

export default displayElements;
