const previousOperationText = document.queryselector("#previous-operation")   // selecionar os elementos (visor)
const currentOperationText = document.queryselector("#current-operation")
const buttons = document.queryselectoAllr("#buttons-container button")  // disparar atraves do click no visor

class Caculator {
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
                this.chageOperation(operations);
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
                this.precessDelOperator();
                break;
            case "CE":
                this.processClearCurrentOperator();
                break;
            case "C":
                this.processClerOperator();
                break;
            case "=":
                this.processEqaualOperator();
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
    this,currentOperationText.innerText = "";
}

processClerOperator() {
    this.currentOperationText.innerText = "";
    this.previousOperationText.innerText = "";
}

processEqaualOperator() {
    const operation = previousOperationText.innerText.split(" ")[1];

    this.processOperation(operation);
}
}

const calc = new Caculator(previousOperationText, currentOperationText);

buttons.forEach((btn) => {
    btn.addEventlistener("click", (e) => {

        const value = e.target.innerText;

        if(+value >= 0 || value === ".") {
            calc.addDoigit(value);
        } else {
            calc.processOperation(value);
        }
    });
});