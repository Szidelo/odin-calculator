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

const handleDisplay = () => {
	const display = document.querySelector("#display");

	if (!operator) {
		display.textContent = firstNumber;
	} else if (operator) {
		display.textContent = secondNumber;
	} else if (operator && secondNumber) {
		display.textContent = result;
	}

	if (firstNumber === null) {
		display.textContent = "0";
	}
};

const handleNumber = (num) => {
	if (!operator) {
		if (firstNumber === null) {
			firstNumber = "";
		}
		firstNumber += num;
	} else {
		if (secondNumber === null) {
			secondNumber = "";
		}
		secondNumber += num;
	}
};

const handleOperator = (operatorValue) => {
	operator = operatorValue;
};

const handleClearDisplay = () => {
	firstNumber = null;
	secondNumber = null;
	operator = null;
	handleDisplay();
};

const handleClick = () => {
	buttons.forEach((btn) => {
		btn.addEventListener("click", () => {
			if (btn.className.includes("number") && btn.id !== "comma" && btn.id !== "sign") {
				handleNumber(btn.value);
				handleDisplay();
			}
			if (btn.className.includes("operator")) {
				handleOperator(btn.value);
			}

			if (btn.id === "equal") {
				operate(operator, Number(firstNumber), Number(secondNumber));
			}

			if (btn.id === "reset") {
				handleClearDisplay();
			}
		});
	});
};

handleClick();

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
