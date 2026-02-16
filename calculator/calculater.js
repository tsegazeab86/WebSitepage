// Get the display element
var display = doc.getElementById("display");

// Append a number or operator to the display
function appendToDisplay(input) {
  display.value += input;
}

// Clear the display completely
function clearDisplay() {
  display.value = "";
}

// Calculate the expression in the display
function calculate() {
  try {
    display.value = eval(display.value);
  } catch (error) {
    display.value = "Error";
  }
}
