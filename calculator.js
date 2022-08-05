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
    a = Number.parseInt(a);
    b = Number.parseInt(b);
    let result;
    switch (op) {
        case "add":
            result = add(a, b);
            break;
        case "substract":
            result = substract(a, b);
            break;
        case "multiply":
            result = multiply(a, b);
            break;
        case "divide":
            result = divide(a, b);
            break;
        default:
            console.log('Operator error!', op);
    }
    return result;
}

const showDigits = document.querySelector('.screen');
const allDigits = document.querySelectorAll('.digits span');
const operators = document.querySelectorAll('.operators span');
const equal = document.querySelector('.equal');
const clear = document.querySelector('.clear');

let numbers = '';

allDigits.forEach(digit => {
    digit.addEventListener('click', () => {
        if (!digit.classList.contains('return') && !digit.classList.contains('dot')) {
            numbers += digit.textContent;
            showDigits.textContent = numbers;
        }
        else { return; }
    });
});

let firstNumbers;
let op = '';
let secondNumbers;
let solution;

operators.forEach(operator => {
    operator.addEventListener('click', () => {
        if (!operator.classList.contains('active')) {
            // Save the first set of numbers and operator
            firstNumbers = numbers;
            operator.classList.toggle('active');
            op = operator.dataset.id;
            // Clear the numbers
            numbers = '';
            showDigits.textContent = '';
        }
    });
});

equal.addEventListener('click', () => {
    secondNumbers = numbers;

    if (firstNumbers !== '' && op !== '' && secondNumbers !== '') {
        solution = operate(op, firstNumbers, secondNumbers);
        showDigits.textContent = solution;

        const sign = document.querySelector(`[data-id="${op}"]`);
        sign.classList.toggle('active');

        firstNumbers = '';
        secondNumbers = '';
        numbers = '';
    }
});

clear.addEventListener('click', () => {
    if (solution) solution = ''
    if (op) {
        const sign = document.querySelector(`[data-id="${op}"]`);
        sign.classList.toggle('active');
    }
    firstNumbers = '';
    secondNumbers = '';
    numbers = '';
    showDigits.textContent = '0';
})