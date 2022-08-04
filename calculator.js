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

function operate(func, a, b) {
    a = Number.parseInt(a);
    b = Number.parseInt(b);
    return func(a, b);
}

const allDigits = document.querySelectorAll('.digits span');
let showDigits = document.querySelector('.screen');
let total = '';
allDigits.forEach(digit => {
    digit.addEventListener('click', () => {
        if (!digit.classList.contains('return') && !digit.classList.contains('dot')) {
            total += digit.textContent;
            showDigits.textContent = total;
        }
        else { return; }
    })
})