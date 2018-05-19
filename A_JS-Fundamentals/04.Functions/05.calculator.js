function calculator(x, y, op) {
    switch(op) {
        case "+": return add(x, y); break;
        case "-": return subtract(x, y); break;
        case "*": return multiply(x, y); break;
        case "/": return divide(x, y); break;
    }

    function add(a, b) {
        return a + b
    }
    function subtract(a, b) {
        return a - b
    }
    function multiply(a, b) {
        return a * b
    }
    function divide(a, b) {
        return a / b
    }
}

console.log(calculator(2, 4, '+'))
