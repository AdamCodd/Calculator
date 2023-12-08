const showDigits = document.querySelector('.result');
const showHistory = document.querySelector('.history');
const allDigits = document.querySelectorAll('.digits button[data-key]');
const operators = document.querySelectorAll('.operators button');
const equal = document.querySelector('.equal');
const clear = document.querySelector('.clear');
const erase = document.querySelector('.delete');
const dot = document.querySelector('.dot');

let firstNumbers, secondNumbers, solution;
let op, isFirstOp;

function reset() {
    firstNumbers = secondNumbers = solution = op = showDigits.textContent = showHistory.textContent = '';
    isFirstOp = true;
}
reset();

function add(a, b) {
    return a + b;
}
function substract(a, b) {
    return a - b;
}
function multiply(a, b) {
    return a * b;
}
function divide(a, b) {
    return a / b;
}

function operate(op, a, b) {
    a = Number.parseFloat(a, 10);
    b = Number.parseFloat(b, 10);
    switch (op) {
        case '+':
            return add(a, b);
        case '-':
            return substract(a, b);
        case '*':
            return multiply(a, b);
        case '/':
            if (b === 0) return '';
            else return divide(a, b);
        default:
            console.error('Operator error!', op);
    }
}

function addNumbers(num) {
    if (showDigits.textContent === '0') showDigits.textContent = '';
    showDigits.textContent += num;
}

allDigits.forEach(digit => {
    digit.addEventListener('click', () => {
        addNumbers(digit.textContent);
    });
});

dot.addEventListener('click', () => {
    if (!showDigits.textContent.includes('.')) showDigits.textContent += '.';
})

erase.addEventListener('click', () => {
    if (showDigits.textContent === '0') showDigits.textContent = '';
    showDigits.textContent = showDigits.textContent.toString().slice(0, -1);
});

function operation(operator) {
    if (isFirstOp === false) evaluate();
    if (isFirstOp === true) {
        op = operator;
        firstNumbers = showDigits.textContent;
        showHistory.textContent = `${firstNumbers} ${op}`;
        showDigits.textContent = '';
        isFirstOp = false;
    }
}

function evaluate() {
    if (isFirstOp === true) return;

    secondNumbers = showDigits.textContent;

    if (op === '/' && secondNumbers === "0") {
        alert("Can't divide by 0 bro!");
        return;
    }

    if (secondNumbers !== '') solution = operate(op, firstNumbers, secondNumbers);
    Number.isInteger(solution) ? '' : solution = Number(solution.toFixed(3));
    showDigits.textContent = solution;

    showHistory.textContent = `${firstNumbers} ${op} ${secondNumbers} =`;
    secondNumbers = '';
    isFirstOp = true;
}

operators.forEach(operator => {
    operator.addEventListener('click', () => {
        operation(operator.textContent);
    });
});

equal.addEventListener('click', evaluate);

clear.addEventListener('click', () => {
    showDigits.textContent = '0';
    reset();
});

// Keyboard support
window.addEventListener('keydown', (e) => {
    if (e.key === "=") {
        let clickEqual = new Event('click');
        equal.dispatchEvent(clickEqual);
    }
    else if (e.key === "+" || e.key === "-" || e.key === "*" || e.key === "/") {
        operation(e.key);
    }
    else if (e.key === ".") {
        let clickDot = new Event('click');
        dot.dispatchEvent(clickDot);
    }
    else if (e.key === "Backspace") {
        let clickErase = new Event('click');
        erase.dispatchEvent(clickErase);
    }
    else if (e.key === "Delete") {
        let clickClear = new Event('click');
        clear.dispatchEvent(clickClear);
    }
    else if (e.key >= 0 && e.key <= 9) {
        addNumbers(e.key);
    }

});
