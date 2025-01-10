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
let chainedNr = null;
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
	// create first number if there is no operator
	if (!operator) {
		if (firstNumber === null) firstNumber = "";
		firstNumber += num;
	} else {
		// create second number if operator exist
		if (secondNumber === null) secondNumber = "";
		secondNumber += num;
	}
};

const handleOperator = (operatorValue) => {
	// set the operator if it is the first time
	if (!operator) {
		operator = operatorValue;
		// check if operator and second number exist
	} else if (operator && secondNumber !== null) {
		operate(operator, Number(firstNumber), Number(secondNumber));
		firstNumber = result.toString(); // set result as the first number
		secondNumber = null; // reset second number for chaining
		operator = operatorValue; // update the operator
	}
};

const handleClearDisplay = () => {
	firstNumber = null;
	secondNumber = null;
	operator = null;
	result = 0;
	handleDisplay();
};

const handleComma = () => {
	if (firstNumber.includes(".") && !secondNumber) {
		return;
	} else if (!firstNumber.includes(".")) {
		firstNumber += ".";
	} else if (firstNumber && !secondNumber.includes(".")) {
		secondNumber += ".";
	}
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

			if (btn.id === "comma") {
				handleComma();
				handleDisplay();
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
			result = b !== 0 ? divide(a, b) : "Error";
			break;
	}

	result = handleNumberOfCharacters(result);
	display.textContent = result;
};
