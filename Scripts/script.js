document.addEventListener("DOMContentLoaded", function () {
    // Elementos DOM
    const display = document.getElementById("display");
    const buttons = document.querySelectorAll("button");

    // Variáveis de estado
    let currentInput = "";
    let currentOperator = "";
    let firstOperand = "";

    // Adiciona eventos aos botões
    buttons.forEach(button => {
        button.addEventListener("click", handleButtonClick);
    });

    // Função para lidar com cliques nos botões
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

    // Função para lidar com entrada numérica e operadores
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

    // Função para verificar se o valor é um número
    function isNumber(value) {
        return !isNaN(value) || value === ",";
    }

    // Função para verificar se o valor é um operador
    function isOperator(value) {
        const operators = ["+", "-", "*", "/"];
        return operators.includes(value);
    }

    // Função para lidar com operadores
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

    // Função para calcular o resultado
    function calculateResult() {
        if (currentInput !== "") {
            const result = eval(`${firstOperand} ${currentOperator} ${currentInput}`);
            currentInput = result.toString();
            firstOperand = "";
            currentOperator = "";
            updateDisplay();
        }
    }

    // Função para limpar a última entrada
    function clearEntry() {
        currentInput = "";
        updateDisplay();
    }

    // Função para limpar todos os valores
    function clearAll() {
        currentInput = "";
        firstOperand = "";
        currentOperator = "";
        updateDisplay();
    }

    // Função para apagar o último caractere (backspace)
    function backspace() {
        currentInput = currentInput.slice(0, -1);
        updateDisplay();
    }

    // Função para adicionar um ponto decimal
    function addDecimal() {
        if (!currentInput.includes(".")) {
            currentInput += ".";
            updateDisplay();
        }
    }

    // Função para atualizar a exibição
    function updateDisplay() {
        display.value = currentInput !== "" ? currentInput : "0";
    }
});
