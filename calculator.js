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

let op = '';
let newOp = '';
let firstNumbers = '';
let secondNumbers = '';
let solution = '';

// Need to operate each time we change the operator OR when we push the equal operator
// Active should be cosmetic not used here maybe use event to discriminate operators
// secondNumbers should be dissociated from firstNumbers and not combined
operators.forEach(operator => {
    operator.addEventListener('click', () => {
        numbers = '';
        if (!op) {
            firstNumbers = showDigits.textContent;
            op = operator.dataset.id;
        }
        else if (op) {
            secondNumbers = showDigits.textContent;
            newOp = operator.dataset.id;
        }

        if (newOp !== '' && secondNumbers !== '') {
            //operator.classList.toggle('active');
            console.log(op, `First: ${firstNumbers}`, `Second: ${secondNumbers}`);
            solution = operate(op, firstNumbers, secondNumbers);
            firstNumbers = +solution;
            secondNumbers = '';
            showDigits.textContent = +solution;
            op = newOp;
        }

    });
});

equal.addEventListener('click', () => {
    console.log("Solution: " + solution, "First: " + firstNumbers, "Second: " + secondNumbers, "Op:" + op);
    //    secondNumbers = showDigits.textContent;
    if (solution === '' && op && secondNumbers !== '') {
        solution = operate(op, firstNumbers, secondNumbers);
        showDigits.textContent = +solution;
        firstNumbers = +solution;
    }
    else {
        showDigits.textContent = +firstNumbers;
    }
    /*   secondNumbers = numbers;
   
       if (firstNumbers !== '' && op !== '' && secondNumbers !== '') {
           solution = operate(op, firstNumbers, secondNumbers);
           showDigits.textContent = solution;
   
           const sign = document.querySelector(`[data-id="${op}"]`);
           sign.classList.toggle('active');
   
           firstNumbers = '';
           secondNumbers = '';
           numbers = '';
       }*/
});

clear.addEventListener('click', () => {
    numbers = '';
    showDigits.textContent = '0';
    solution = '';
    op = '';
    newOp = '';
    firstNumbers = '';
    secondNumbers = '';

    /*  if (solution) solution = ''
      if (op) {
          const sign = document.querySelector(`[data-id="${op}"]`);
          sign.classList.toggle('active');
      }
      firstNumbers = '';
      secondNumbers = '';
      numbers = '';
      showDigits.textContent = '0';*/
})