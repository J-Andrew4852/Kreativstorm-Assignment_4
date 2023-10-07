import Calculator from "./calculator/calculator.js";

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

Calculator.run();
