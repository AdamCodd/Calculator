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
            console.log('Operator error!', op);
    }
    return result;
}

const showDigits = document.querySelector('.result');
const showHistory = document.querySelector('.history');
const allDigits = document.querySelectorAll('.digits span');
const operators = document.querySelectorAll('.operators span');
const equal = document.querySelector('.equal');
const clear = document.querySelector('.clear');

let numbers, firstNumbers, secondNumbers, solution;
let op, newOp, isFirstOp;
function reset() {
    numbers = firstNumbers = secondNumbers = solution = op = newOp = showHistory.textContent = '';
    isFirstOp = true;
}
reset();

allDigits.forEach(digit => {
    digit.addEventListener('click', () => {
        if (!digit.classList.contains('equal') && !digit.classList.contains('dot')) {
            numbers += digit.textContent;
        }

        if (digit.classList.contains('dot') && !numbers.includes('.')) {
            (numbers === '') ? numbers += "0." : numbers += ".";
        }

        showDigits.textContent = numbers;
    });
});

operators.forEach(operator => {
    operator.addEventListener('click', () => {
        if (numbers !== '') {
            if (isFirstOp === true) {
                op = operator.className;
                if (firstNumbers === '') firstNumbers = +numbers;
                showHistory.textContent = `${firstNumbers} ${operator.textContent}`;
                numbers = secondNumbers = '';
            }

            if (isFirstOp === false) {
                secondNumbers = +numbers;
                console.log(op, `First: ${firstNumbers}`, `Second: ${secondNumbers}`);
                newOp = operator.className;

                solution = operate(op, firstNumbers, secondNumbers);
                Number.isInteger(solution) ? '' : solution = Number(solution.toFixed(3));
                firstNumbers = showDigits.textContent = solution;

                showHistory.textContent = `${firstNumbers} ${operator.textContent}`;
                numbers = secondNumbers = '';
                op = newOp;
            }
            isFirstOp = false;
        }
    });
});

equal.addEventListener('click', () => {
    if (numbers !== '') {
        isFirstOp = true;
        secondNumbers = +numbers;

        if (secondNumbers !== '' && op !== '') {
            const getOpSign = [...document.getElementsByClassName(op)][0].dataset.id;
            showHistory.textContent = `${firstNumbers} ${getOpSign} ${secondNumbers} ${equal.textContent}`;

            solution = operate(op, firstNumbers, secondNumbers);
            Number.isInteger(solution) ? '' : solution = Number(solution.toFixed(3));
            firstNumbers = showDigits.textContent = solution;

            console.log("Solution: " + solution, "First: " + firstNumbers, "Second: " + secondNumbers, "Op:" + op);
            secondNumbers = op = '';
        }
    }
});

clear.addEventListener('click', () => {
    showDigits.textContent = '0';
    reset();
});