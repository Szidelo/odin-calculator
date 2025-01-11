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
let isPositiveNumber = true;
let isFirstNumberDisplayed = true;
let isSecondNumberDisplayed = false;
let sign = "";

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

const updateDisplay = () => {
    const display = document.querySelector("#display");

    if (!operator) {
        display.textContent = firstNumber;
    } else if (operator) {
        display.textContent = secondNumber;
    } else if (operator && secondNumber) {
        display.textContent = result;
    }

    if (firstNumber === null || display.textContent === "") {
        display.textContent = "0";
    }
};

const handleNumber = (num) => {
    if (!operator) {
        // create first number if there is no operator
        if (firstNumber === null) firstNumber = "";
        isFirstNumberDisplayed = true;
        isFirstNumberDisplayed = false;
        firstNumber += num;
    } else {
        // create second number if operator exist
        if (secondNumber === null) secondNumber = "";
        secondNumber += num;
        isFirstNumberDisplayed = false;
        isSecondNumberDisplayed = true;
    }
};

const handleOperator = (operatorValue) => {
    if (!operator) {
        // set the operator if it is the first time
        operator = operatorValue;
    } else if (operator && secondNumber !== null) {
        // check if operator and second number exist
        operate(operator, Number(firstNumber), Number(secondNumber));
        firstNumber = result.toString(); // set result as the first number
        secondNumber = null; // reset second number for chaining
        operator = operatorValue; // update the operator
    } else if (operator) {
        operator = operatorValue;
    }
};

const handleClearDisplay = () => {
    firstNumber = null;
    secondNumber = null;
    operator = null;
    result = 0;
    isPositiveNumber = true;
    sign = "";
    updateDisplay();
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

const handleDelete = () => {
    if (operator && secondNumber) {
        secondNumber = secondNumber.slice(0, -1);
    } else if (!operator && firstNumber) {
        firstNumber = firstNumber.slice(0, -1);
    } else if (result) {
        return;
    } else if (!firstNumber && !secondNumber && !result) {
        console.log("reset display to 0");

        const display = document.querySelector("#display");
        display.textContent = "0";
    }
};

const handleNumberSign = () => {
    isPositiveNumber = !isPositiveNumber;
    sign = !isPositiveNumber ? "-" : "";

    console.log("- first number:", firstNumber);
    if (isFirstNumberDisplayed && !isPositiveNumber) {
        firstNumber = sign.concat(firstNumber);
    }

    if (isSecondNumberDisplayed && !isPositiveNumber) {
        console.log(" - second number:", secondNumber);

        secondNumber = sign.concat(secondNumber);
    }
};

const handleClick = () => {
    buttons.forEach((btn) => {
        btn.addEventListener("click", () => {
            // display and update number to operate when click on numbers
            if (
                btn.className.includes("number") &&
                btn.id !== "comma" &&
                btn.id !== "sign"
            ) {
                handleNumber(btn.value);
                updateDisplay();
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

            // create floating numbers
            if (btn.id === "comma") {
                handleComma();
                updateDisplay();
            }

            // remove last caracter from the input
            if (btn.id === "delete") {
                handleDelete();
                updateDisplay();
            }

            // convert number from positive to negative or from negative from positive
            if (btn.id === "sign") {
                handleNumberSign();
                updateDisplay();
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
