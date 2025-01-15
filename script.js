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
let isFirstNumberDisplayed = true;
let isSecondNumberDisplayed = false;

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

window.addEventListener("keyup", (e) => {
    console.log(e.key);
    const key = document.querySelector(`button[data-key='${e.key}']`);
    key.click();
});

const updateDisplay = () => {
    const display = document.querySelector("#display");

    if (!operator) {
        display.textContent = handleNumberOfCharacters(firstNumber);
    } else if (operator && !result) {
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
        isSecondNumberDisplayed = false;
        firstNumber += num;
        firstNumber = handleNumberOfCharacters(firstNumber); // set max number if digits for the firstNumber
    } else {
        // set first number to 0 if the operator is set before first number
        if (firstNumber === null) firstNumber = "0";
        // create second number if operator exist
        if (secondNumber === null) secondNumber = "";
        secondNumber += num;
        isFirstNumberDisplayed = false;
        isSecondNumberDisplayed = true;
        secondNumber = handleNumberOfCharacters(secondNumber); // set max number if digits for the secondNumber
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
        result = 0;
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
    } else if (!firstNumber.includes(".") && !secondNumber) {
        firstNumber += ".";
    } else if (!firstNumber.includes(".") && !secondNumber.includes(".")) {
        secondNumber += ".";
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
        const display = document.querySelector("#display");
        display.textContent = "0";
    }
};

const handleNumberSign = () => {
    if (isFirstNumberDisplayed && result === 0) {
        if (firstNumber === null || firstNumber === "0") {
            return;
        } else {
            firstNumber = (-Number(firstNumber)).toString(); // toggle sign
        }
    } else if (result !== 0) {
        // if the result is being displayed, toggle its sign
        result = -result;
        display.textContent = result.toString();
        firstNumber = result.toString(); // update firstNumber to the toggled result for further calculations
        return;
    }

    if (isSecondNumberDisplayed) {
        secondNumber = (-Number(secondNumber)).toString(); // toggle sign
    }
};

const handlePercent = () => {
    if (isFirstNumberDisplayed) {
        // if first number is displayed calculate its percentage
        firstNumber = (Number(firstNumber) * 0.01).toString();
        firstNumber = handleNumberOfCharacters(firstNumber);
    }

    if (isSecondNumberDisplayed) {
        // If second number is displayed calculate the second number percentage of the first number
        secondNumber = (
            (Number(firstNumber) * Number(secondNumber)) /
            100
        ).toString();
        secondNumber = handleNumberOfCharacters(secondNumber);
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

            // remove last character from the input
            if (btn.id === "delete") {
                handleDelete();
                updateDisplay();
            }

            // convert number from positive to negative or from negative from positive
            if (btn.id === "sign") {
                handleNumberSign();
                updateDisplay();
            }

            // calculate percentage
            if (btn.id === "percent") {
                handlePercent();
                updateDisplay();
            }
        });
    });
};

handleClick();

const handleNumberOfCharacters = (value) => {
    const displayWidth = display.offsetWidth;
    const fontWidthInPixels = 20;
    const maxCharacters = Math.floor((displayWidth / fontWidthInPixels) * 0.7); // max characters based on display width

    if (value && value.toString().length > maxCharacters) {
        value = value.toString().substring(0, maxCharacters);
    }

    return value;
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

    if (result !== "Error") {
        result = handleNumberOfCharacters(result);
    }
    display.textContent = result;
};
