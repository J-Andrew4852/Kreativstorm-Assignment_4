let display = document.querySelector("#display");
const numbers = document.getElementsByClassName("number");
const operators = document.getElementsByClassName("operator");
const controls = document.getElementsByClassName("controls");
const decimal = document.getElementById(".");


let numberStorage = null;
let operatorStorage = null;

const userInput = () => display.textContent.split(',').join('');

const getNumber = () => {
  return parseFloat(userInput());
};

const setDisplay = (input) => {

  if (input.length === 7){
    display.style.fontSize = "3.7rem";
  } else if (input.length === 8){
    display.style.fontSize = "3.3rem";
  } else if (input.length === 9){
    display.style.fontSize = "3rem";
    for(button of numbers){
      button.disabled = true;
    } 
  } else if (input.length >= 10 ){
    display.style.fontSize = "2.6rem";
  }else {
    display.style.fontSize = "4.5rem";
    for(button of numbers){
      button.disabled = false;
    }
  }

  if (input === "0") {
    controls[0].innerText = "AC";
  } else {
    controls[0].innerText = "C";
  }
  if (input[input.length - 1] === ".") {
    display.textContent += ".";
    return;
  }

  const [wholeNumber, decimal] = input.split(".");
  if (decimal) {
    display.textContent = parseFloat(wholeNumber).toLocaleString() + "." + decimal;
  } else {
    display.textContent = parseFloat(wholeNumber).toLocaleString();
  }
};


const numberSelect = (numStr) => {
  const displayString = userInput();
  if (displayString === "0") {
    setDisplay(numStr);
  } else {
    setDisplay(displayString + numStr);
  }
};

const calculateAndConvertToString = () => {

  const currentNumber = getNumber();
  const numberStored = parseFloat(numberStorage);
  let newNumber;
  if (operatorStorage === "+") {
    newNumber = numberStored + currentNumber;
  } else if (operatorStorage === "-") {
    newNumber = numberStored - currentNumber;
  } else if (operatorStorage === "×") {
    newNumber = numberStored * currentNumber;
  } else if (operatorStorage === "÷") {
    if (currentNumber === 0){
      display.textContent="error"
      return;
    }
    newNumber = numberStored / currentNumber;
  }

  if(newNumber.toString().length > 9){
    newNumber = Number.parseFloat(newNumber).toExponential(6);
  } 
  return newNumber.toString().replace("+","");
};



const operatorSelect = (operator) => {
  const currentNumber = getNumber();
  if (!numberStorage) { 
    numberStorage = currentNumber;
    operatorStorage = operator;
    setDisplay("0");
    return;
  }
  numberStorage = calculateAndConvertToString();
  operatorStorage = operator;
  setDisplay("0");
};

for (let i = 0; i < numbers.length; i++) {
  numbers[i].addEventListener("click", (event) => {
    numberSelect(event.target.id.toString());
  });
}

decimal.addEventListener("click", () => {
  const displayString = userInput();
  if (!displayString.includes(".")) {
    setDisplay(displayString + ".");
  }
});


for (let i = 0; i < controls.length; i++) {
  controls[i].addEventListener("click", (event) => {
    if (event.target.id == "clear") {
      setDisplay("0");
      numberStorage = null;
      operatorStorage = null;
    } else if (event.target.id == "plus-or-minus") {
      const currentNumber = getNumber();
      const currentNumberStr = userInput();
      if (currentNumberStr === "-0") {
        setDisplay("0");
      } else if (currentNumber >= 0) {
        setDisplay("-" + currentNumber);
      } else {
        setDisplay(currentNumberStr.substring(1));
      }
    } else if (event.target.id == "percent") {
      const currentNumber = getNumber();
      const newNumber = currentNumber / 100;
      setDisplay(newNumber.toString());
      numberStorage = null;
      operatorStorage = null;
    }

  });
};


for (let i = 0; i < operators.length; i++) {
  operators[i].addEventListener("click", (event) => {
    if (event.target.textContent == "+") {
      operatorSelect("+");

    } else if (event.target.textContent == "−") {
      operatorSelect("-");

    } else if (event.target.textContent == "×") {
      operatorSelect("×");

    } else if (event.target.textContent == "÷") {
      operatorSelect("÷");

    } else if (event.target.textContent == "=") {
      if (numberStorage) { // Number in storage
        setDisplay(calculateAndConvertToString());
        numberStorage = null;
        operatorStorage = null;

      }

    }

  });
}
window.addEventListener("keydown", handleKeyPress);
function handleKeyPress(e) {
  const key = e.key;
  const validKeys = /[0-9+\-*/.=]|Enter|Escape|Backspace|Delete/;
  
  
  if (!validKeys.test(key)) {
    return;
  }

  
  if (/[0-9]/.test(key)) {
    numberSelect(key);
  }
  
  
  if (/[\+\-\*/]/.test(key)) {
    operatorSelect(key);
  }

  
  if (key === "Enter") {
    operatorSelect("=");
  }

  
  if (["Escape", "Backspace", "Delete"].includes(key)) {
    setDisplay("0");
    numberStorage = null;
    operatorStorage = null;
  }

  
  if (key === ".") {
    const displayString = userInput();
    if (!displayString.includes(".")) {
      setDisplay(displayString + ".");
    }
  }
}
