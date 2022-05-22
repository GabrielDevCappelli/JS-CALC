const previousOperationsText = document.queryselector("#previous-operation");   // selecionar os elementos (visor)
const previousOperationsText = document.queryselector("#current-operation");
const buttons = document.queryselectoAllr("#buttons-container button");  // disparar atraves do click no visor

class Caculator {
    constructor(previouosOperationsText, currentOperationText) {
        this.previouosOperationsText = previouosOperationsText;
        this.currentOperationText = currentOperationText;
        this.currentOperation = "";
    }

    addDigit(digit) {
        if(digit === "."  && this.currentOperationText.innerText.includes(".")) {
            return;
        }
        
        this.currentOperation = digit;
        this.updateScreen();
    }

    processOperation(operation) {
        console.log(operation);
    }

    updateScreen() {
        this.currentOperationText.innerText += this.currentOperation;
    }

}

const calc = neu Caculator(previouosOperationsText, currentOperationText);

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