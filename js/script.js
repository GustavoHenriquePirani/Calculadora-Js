const operacaoAnterior = document.querySelector("#anterior");
const operacaoAtual = document.querySelector("#atual");
const buttons = document.querySelectorAll("#botoes button");

class Calculadora {
  constructor(operacaoAnterior, operacaoAtual) {
    this.operacaoAnterior = operacaoAnterior;
    this.operacaoAtual = operacaoAtual;
    this.digitandoAgora = "";
  }

  //ADICIONAR NUMERO NA TELA
  addDigit(digit) {
    if (digit === "," && this.operacaoAtual.innerText.includes(",")) {
      return;
    }

    this.digitandoAgora = digit;
    this.updateScreen();
  }

  //RESULTADO DO CALCULO
  processOperation(operation) {
    if (this.operacaoAtual.innerText === "" && operation !== "C") {
      if (this.operacaoAnterior.innerText !== "") {
        this.changeOperation(operation);
      }
      return;
    }

    //PEGA OPERAÇÃO ATUAL E ANTIGA
    let operationValue;
    const previous = +this.operacaoAnterior.innerText.split(" ")[0];
    const current = +this.operacaoAtual.innerText;

    switch (operation) {
      case "+":
        operationValue = previous + current;
        this.updateScreen(operationValue, operation, current, previous);
        break;
      case "-":
        operationValue = previous - current;
        this.updateScreen(operationValue, operation, current, previous);
        break;
      case "*":
        operationValue = previous * current;
        this.updateScreen(operationValue, operation, current, previous);
        break;
      case "/":
        if (current === 0) {
          console.error("Erro: Divisão por zero.");
          operationValue = "Erro";
        } else {
          operationValue = previous / current;
          this.updateScreen(operationValue, operation, current, previous);
        }
        break;
      case "DEL":
        this.processDelOperator();
        break;
      case "CE":
        this.processClearCurrentOperator();
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

  //MUDAR VALORES NA TELA
  updateScreen(
    operationValue = null,
    operation = null,
    current = null,
    previous = null
  ) {
    if (operationValue === null) {
      this.operacaoAtual.innerText += this.digitandoAgora;
    } else {
      if (previous === 0) {
        operationValue = current;
      }
      //MOVER VALOR ATUAL PARA O ANTIGO
      this.operacaoAnterior.innerText = `${operationValue} ${operation}`;
      this.operacaoAtual.innerText = "";
    }
  }

  changeOperation(operation) {
    const mathOperation = ["*", "/", "+", "-"];

    if (!mathOperation.includes(operation)) {
      return;
    }

    this.operacaoAnterior.innerText =
      this.operacaoAnterior.innerText.slice(0, -1) + operation;
  }

  // Delete a digit
  processDelOperator() {
    this.operacaoAtual.innerText = this.operacaoAtual.innerText.slice(0, -1);
  }

  // Clear current operation
  processClearCurrentOperator() {
    this.operacaoAtual.innerText = "";
  }

  // Clear all operations
  processClearOperator() {
    this.operacaoAtual.innerText = "";
    this.operacaoAnterior.innerText = "";
  }

  // Process an operation
  processEqualOperator() {
    let operation = this.operacaoAnterior.innerText.split(" ")[1];

    this.processOperation(operation);
  }
}

const calc = new Calculadora(operacaoAnterior, operacaoAtual);

buttons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const value = e.target.innerText;

    if (+value >= 0 || value === ",") {
      calc.addDigit(value);
    } else {
      calc.processOperation(value);
    }
  });
});
