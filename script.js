const OPERATORS = {
	ADD: "+",
	SUBTRACT: "-",
	MULTIPLY: "*",
	DIVIDE: "/",
};

const display = document.querySelector("#display");
const buttons = document.querySelectorAll(".btn");

let firstNumber = null;
let secondNumber = null;
let operator = null;
let result = 0;

const add = (a, b) => {
	return a + b;
};

const subtract = (a, b) => {
	return a - b;
};

const multiply = (a, b) => {
	return a * b;
};

const divide = (a, b) => {
	return a / b;
};

buttons.forEach((btn) => {
	btn.addEventListener("click", () => {
		if (btn.id === "reset") {
			display.textContent = 0;
			firstNumber = null;
			secondNumber = null;
			operator = null;
			return;
		}
		if (!firstNumber && display.textContent == 0) {
			display.textContent = btn.value;
		} else if (!firstNumber && display.textContent != 0) {
			if (btn.className.includes("operator")) {
				operator = btn.value;
				firstNumber = display.textContent;
			}
			!firstNumber && !operator ? (display.textContent += btn.value) : (display.textContent = firstNumber);
		} else {
			if (btn.value === "=") {
				secondNumber = display.textContent;
				operate(operator, +firstNumber, +secondNumber);
			}
			display.textContent = "";
			btn.value !== "=" ? (display.textContent += btn.value) : (display.textContent = result);
		}
	});
});

const operate = (operator, a, b) => {
	const { ADD, SUBTRACT, MULTIPLY, DIVIDE } = OPERATORS;

	switch (operator) {
		case ADD:
			result = add(a, b);
			break;
		case SUBTRACT:
			result = subtract(a, b);
			break;
		case MULTIPLY:
			result = multiply(a, b);
			break;
		case DIVIDE:
			result = divide(a, b);
			break;
	}

	display.textContent = result;
};
