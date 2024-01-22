document.addEventListener("DOMContentLoaded", function () {
    const display = document.getElementById("display");
    const buttons = document.querySelectorAll("button");

    let currentInput = "";
    let currentOperator = "";
    let firstOperand = "";

    buttons.forEach(button => {
        button.addEventListener("click", handleButtonClick);
    });

    function handleButtonClick(event) {
        const buttonValue = event.target.innerText;

        switch (buttonValue) {
            case "=":
                calculateResult();
                break;
            case "CE":
                clearEntry();
                break;
            case "C":
                clearAll();
                break;
            case "Del":
                backspace();
                break;
            default:
                handleInput(buttonValue);
                break;
        }
    }

    function handleInput(value) {
        if (isNumber(value)) {
            currentInput += value;
        } else if (isOperator(value)) {
            handleOperator(value);
        } else if (value === ",") {
            addDecimal();
        }

        updateDisplay();
    }

    function isNumber(value) {
        return !isNaN(value) || value === ",";
    }

    function isOperator(value) {
        const operators = ["+", "-", "*", "/"];
        return operators.includes(value);
    }

    function handleOperator(operator) {
        if (currentInput !== "") {
            if (firstOperand === "") {
                firstOperand = currentInput;
                currentInput = "";
            } else {
                calculateResult();
            }

            currentOperator = operator;
        }
    }

    function calculateResult() {
        if (currentInput !== "") {
            const result = eval(`${firstOperand} ${currentOperator} ${currentInput}`);
            currentInput = result.toString();
            firstOperand = "";
            currentOperator = "";
            updateDisplay();
        }
    }

    function clearEntry() {
        currentInput = "";
        updateDisplay();
    }

    function clearAll() {
        currentInput = "";
        firstOperand = "";
        currentOperator = "";
        updateDisplay();
    }

    function backspace() {
        currentInput = currentInput.slice(0, -1);
        updateDisplay();
    }

    function addDecimal() {
        if (!currentInput.includes(".")) {
            currentInput += ".";
            updateDisplay();
        }
    }

    function updateDisplay() {
        display.value = currentInput !== "" ? currentInput : "0";
    }
});
