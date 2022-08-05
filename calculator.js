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


let numbers, firstNumbers, secondNumbers, solution;
let op, newOp, isFirstOp;
function reset() {
    numbers = firstNumbers = secondNumbers = solution = op = newOp = '';
    isFirstOp = true;
}
reset();

allDigits.forEach(digit => {
    digit.addEventListener('click', () => {
        if (!digit.classList.contains('return') && !digit.classList.contains('dot')) {
            numbers += digit.textContent;
            showDigits.textContent = numbers;
        }
    });
});

operators.forEach(operator => {
    operator.addEventListener('click', () => {
        if (numbers !== "") {
            if (isFirstOp == true) {
                op = operator.dataset.id;
                firstNumbers = numbers;
                numbers = "";
            }
            if (isFirstOp == false) {
                secondNumbers = numbers;
                console.log(op, `First: ${firstNumbers}`, `Second: ${secondNumbers}`);
                newOp = operator.dataset.id;
                if (secondNumbers !== "") {
                    solution = operate(op, firstNumbers, secondNumbers);
                }
                firstNumbers = showDigits.textContent = +solution;
                secondNumbers = '';
                numbers = '';
                op = newOp;
            }
            isFirstOp = false;
        }
    });
});

// Not fully functional
equal.addEventListener('click', () => {
    console.log("Solution: " + solution, "First: " + firstNumbers, "Second: " + secondNumbers, "Op:" + op);

    if (solution === '' && op && secondNumbers !== '') {
        solution = operate(op, firstNumbers, secondNumbers);
        showDigits.textContent = +solution;
        firstNumbers = +solution;
    }
    else {
        showDigits.textContent = +firstNumbers;
    }
});

clear.addEventListener('click', () => {
    showDigits.textContent = '0';
    reset();
});