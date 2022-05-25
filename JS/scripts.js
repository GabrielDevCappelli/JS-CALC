
const previousOperationText = document.querySelector("#previous-operation")   // selecionar os elementos (visor)
const currentOperationText = document.querySelector("#current-operation")
const buttons = document.querySelectorAll("#buttons-container button")  // disparar atraves do click no visor

class calculator {
    constructor(previousOperationText, currentOperationText) {
        this.previousOperationText = previousOperationText
        this.currentOperationText = currentOperationText
        this.currentOperation = ""
    }

addDigit(digit) {
    if(digit === "." && this.currentOperationText.innerText.includes(".")) {
        return;
    }
        
    this.currentOperation = digit
    this.updateScreen()
}

processOperation(operations) {
    if (this.currentOperationText.innerText === "" && operations !== "C") {
        if (this.previousOperationText.innerText !== "") {
            this.changeOperation(operations);
        }
        return;
    }

    let operationValue;
    const previous = +this.previousOperationText.innerText.split(" ")[0];
    const current = +this.currentOperationText.innerText;

    switch (operations) {
        case "+":
            operationValue = previous + current;
            this.updateScreen(operationValue, operations, current, previous);
            break;
        case "-":
            operationValue = previous - current;
            this.updateScreen(operationValue, operations, current, previous);
            break;
        case "/":
            operationValue = previous / current;
            this.updateScreen(operationValue, operations, current, previous);
            break;
        case "*":
            operationValue = previous * current;
            this.updateScreen(operationValue, operations, current, previous);
            break;
        case "DEL":
            this.processDelOperator();
            break;
        case "CE":
            this.processClearCurrentOperation();
            break;
        case "C":
            this.processClearOperator();
            break;
        case "=":
            this.processEqualOperator();
            break;
        default:
            return;
    }
}

updateScreen(
    operationValue = null,
    operation = null,
    current = null,
    previous = null
) {

    if(operationValue === null) {
        this.currentOperationText.innerText += this.currentOperation;
    } else {
        if(previous === 0) {
            operationValue = current
        }

        this.previousOperationText.innerText = `${operationValue} ${operation}`;
        this.currentOperationText.innerText = "";
    }
}

changeOperation(operations) {
    const mathOperations = ["*","/","+","-"]

    if (!mathOperations.includes(operations)) {
        return
    }

    this.previousOperationText.innerText = 
        this.previousOperationText.innerText.slice(0, -1) + operations;
}

processDelOperator() {
    this.currentOperationText.innerText = 
        this.currentOperationText.innerText.slice(0, -1);
}

processClearCurrentOperator() {
    this.currentOperationText.innerText = "";
}

processClearOperator() {
    this.currentOperationText.innerText = "";
    this.previousOperationText.innerText = "";
}

processEqualOperator() {
    const operation = previousOperationText.innerText.split(" ")[1];

    this.processOperation(operation);
}
}

const calc = new calculator(previousOperationText, currentOperationText);

buttons.forEach((btn) => {
    btn.addEventListener("click", (e) => {

        const value = e.target.innerText;

        if(+value >= 0 || value === ".") {
            calc.addDigit(value);
        } else {
            calc.processOperation(value);
        }
    });
});