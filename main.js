const toggleButton = document.querySelector('.toggleLDMode');

toggleButton.addEventListener('click', () => {
    document.body.classList.toggle('darkMode');
    document.body.classList.toggle('lightMode');
});

const screenTopDisplay = document.querySelector(".screenTop");
const screenMainDisplay = document.querySelector(".screenMain");
const buttons = document.querySelectorAll("button");

let calculation = []
let cumulativeCalculation

function calculate(button) {
    const value = button.textContent;
    if (value === "AC") {
        calculation = [];
        screenTopDisplay.textContent = ""; 
        screenMainDisplay.textContent = "0";
    } else if (value === "=") {
        screenTopDisplay.textContent = cumulativeCalculation;
        screenMainDisplay.textContent = eval(cumulativeCalculation);
    } else if (value === "+/-") {
        const lastIndex = calculation.length - 1;
        if (lastIndex >= 0 && !isNaN(calculation[lastIndex])) {
            calculation[lastIndex] = (parseFloat(calculation[lastIndex]) * -1).toString();
            cumulativeCalculation = calculation.join("");
            screenMainDisplay.textContent = cumulativeCalculation;
        }
    } else {
        calculation.push(value);
        cumulativeCalculation = calculation.join("");
        screenMainDisplay.textContent = cumulativeCalculation;
    }
}

buttons.forEach(button => button.addEventListener("click", () =>{
    calculate(button)}
    ))