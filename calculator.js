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
    let result;
    switch (op) {
        case 'add':
            result = add(a, b);
            break;
        case 'substract':
            result = substract(a, b);
            break;
        case 'multiply':
            result = multiply(a, b);
            break;
        case 'divide':
            result = divide(a, b);
            break;
        default:
            console.error('Operator error!', op);
    }
    return result;
}

const showDigits = document.querySelector('.result');
const showHistory = document.querySelector('.history');
const allDigits = document.querySelectorAll('.digits button');
const operators = document.querySelectorAll('.operators button');
const equal = document.querySelector('.equal');
const clear = document.querySelector('.clear');
const erase = document.querySelector('.delete');

let numbers, firstNumbers, secondNumbers, solution;
let op, newOp, isFirstOp;
function reset() {
    firstNumbers = secondNumbers = solution = op = newOp = showHistory.textContent = '';
    numbers = '0';
    isFirstOp = true;
}
reset();

allDigits.forEach(digit => {
    digit.addEventListener('click', () => {
        if (!digit.classList.contains('equal') && !digit.classList.contains('dot')) {
            if (numbers === '0') numbers = '';
            numbers += digit.textContent;
            showDigits.textContent = numbers;
        }

        if (digit.classList.contains('dot') && !numbers.includes('.') && numbers !== '') {
            numbers += ".";
            showDigits.textContent = numbers;
        }
    });
});

erase.addEventListener('click', () => {
    if (solution === '') {
        let arr = numbers.split('');
        numbers = arr.slice(0, -1).join('');
        showDigits.textContent = numbers;
    }
    else {
        let arr = solution.toString().split('');
        solution = Number(arr.slice(0, -1).join(''));
        firstNumbers = showDigits.textContent = solution;
    }
});

operators.forEach(operator => {
    operator.addEventListener('click', () => {
        if (isFirstOp === true) {
            op = operator.className;
            if (firstNumbers === '') firstNumbers = +numbers;
            showHistory.textContent = `${firstNumbers} ${operator.dataset.id}`;
            numbers = secondNumbers = '';
        }

        if (isFirstOp === false) {
            secondNumbers = +numbers;
            // console.log(op, `First: ${firstNumbers}`, `Second: ${secondNumbers}`);
            newOp = operator.className;
            if (op === 'divide' && secondNumbers == '0') {
                showDigits.textContent = "Can't divide by 0 bro!";
                numbers = secondNumbers = '';
                op = newOp;
            }
            else {
                solution = operate(op, firstNumbers, secondNumbers);
                Number.isInteger(solution) ? '' : solution = Number(solution.toFixed(3));
                firstNumbers = showDigits.textContent = solution;
                showHistory.textContent = `${firstNumbers} ${operator.dataset.id}`;
                numbers = secondNumbers = '';
                op = newOp;
            }
        }
        isFirstOp = false;

    });
});

equal.addEventListener('click', () => {
    isFirstOp = true;
    secondNumbers = +numbers;

    if (op !== '' && firstNumbers !== '' && secondNumbers !== '') {
        const getOpSign = [...document.getElementsByClassName(op)][0].dataset.id;
        showHistory.textContent = `${firstNumbers} ${getOpSign} ${secondNumbers} ${equal.textContent}`;
        if (op === 'divide' && secondNumbers == '0') {
            showDigits.textContent = "Can't divide by 0 bro!";
            numbers = secondNumbers = '';
        }
        else {
            solution = operate(op, firstNumbers, secondNumbers);
            Number.isInteger(solution) ? '' : solution = Number(solution.toFixed(3));
            firstNumbers = showDigits.textContent = solution;

            //console.log("Solution: " + solution, "First: " + firstNumbers, "Second: " + secondNumbers, "Op:" + op);
            secondNumbers = op = '';
        }
    }
});

clear.addEventListener('click', () => {
    showDigits.textContent = '0';
    reset();
});