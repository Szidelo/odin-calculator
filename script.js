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
	if (result) {
		firstNumber = result;
	}
	if (!operator) {
		if (firstNumber === null) {
			firstNumber = "";
		}
		firstNumber += num;
	} else {
		if (secondNumber === null || result) {
			secondNumber = "";
		}
		secondNumber += num;
	}
};

const handleOperator = (operatorValue) => {
	if (!operator) {
		operator = operatorValue;
	}
	// operate the existing numbers and sets the first number to result if user click an operator instead of equal when first number and second number have a value
	if (operator && secondNumber) {
		operate(operator, Number(firstNumber), Number(secondNumber));
		firstNumber = result;
		operator = operatorValue;
	}
};

const handleClearDisplay = () => {
	firstNumber = null;
	secondNumber = null;
	operator = null;
	result = 0;
	handleDisplay();
};

const handleClick = () => {
	buttons.forEach((btn) => {
		btn.addEventListener("click", () => {
			// display and update number to operate when click on numbers
			if (btn.className.includes("number") && btn.id !== "comma" && btn.id !== "sign") {
				handleNumber(btn.value);
				handleDisplay();
			}
			// sets the operator or calculate existing numbers if there are values on first number and second number
			if (btn.className.includes("operator")) {
				handleOperator(btn.value);
			}

			// calculate values
			if (btn.id === "equal") {
				operate(operator, Number(firstNumber), Number(secondNumber));
			}

			// reset values
			if (btn.id === "reset") {
				handleClearDisplay();
			}
		});
	});
};

handleClick();

const handleNumberOfCharacters = (value) => {
	const width = window.innerWidth;
	// TODO: update function to trim the length of the result depending on the window width
	if (value.toString().length > 9) {
		let newValue = value.toString().substring(0, 9);
		return Number(newValue);
	} else {
		console.log(value);
		return value;
	}
};

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

	display.textContent = handleNumberOfCharacters(result);
};
