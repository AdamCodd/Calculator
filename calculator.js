// Selecting DOM elements
const displayCurrent = document.querySelector('.result');
const displayHistory = document.querySelector('.history');
const digitButtons = document.querySelectorAll('.digits button[data-key]');
const operatorButtons = document.querySelectorAll('.operators button');
const equalsButton = document.querySelector('.equal');
const clearButton = document.querySelector('.clear');
const deleteButton = document.querySelector('.delete');
const decimalButton = document.querySelector('.dot');

// Variables for calculator state
let currentInput = '';
let previousInput = '';
let currentOperator = null;
let resetScreen = false;

// Reset calculator to initial state
function resetCalculator() {
    currentInput = '0';
    previousInput = '';
    currentOperator = null;
    resetScreen = false;
    updateDisplay();
}

// Update display screen
function updateDisplay() {
    displayCurrent.textContent = currentInput;
    displayHistory.textContent = previousInput + ' ' + (currentOperator ? currentOperator : '');
}
// Basic arithmetic functions
const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => b !== 0 ? a / b : null;

// Perform calculation based on operator
function operate(operator, a, b) {
    a = parseFloat(a);
    b = parseFloat(b);
    switch (operator) {
        case '+': return add(a, b);
        case '-': return subtract(a, b);
        case '*': return multiply(a, b);
        case '/': return divide(a, b);
        default: return null;
    }
}

// Handle digit button click
function inputDigit(digit) {
    if (resetScreen) {
        currentInput = digit === '0' ? '0' : digit;
        resetScreen = false;
    } else {
        if (currentInput === '0' && digit !== '0') {
            currentInput = digit;
        } else if (currentInput !== '0') {
            currentInput += digit;
        }
    }
    updateDisplay();
}

// Handle decimal input
function inputDecimal() {
    if (!currentInput.includes('.')) {
        currentInput += '.';
    }
    updateDisplay();
}

// Handle delete input
function deleteDigit() {
    // Delete the last digit or set current input to zero if all digits are deleted
    currentInput = currentInput.slice(0, -1) || '0';
    updateDisplay();
}

// Handle operator input
function inputOperator(operator) {
    if (currentInput === '' || currentInput === '0') {
        // If current input is empty or zero, use the previous result
        if (previousInput !== '') {
            currentOperator = operator;
            resetScreen = true;
            updateDisplay();
        }
        // Do nothing if there's no previous result
    } else {
        // Perform calculation if an operator was already chosen
        if (currentOperator !== null && !resetScreen) {
            currentInput = String(operate(currentOperator, previousInput, currentInput));
        }
        previousInput = currentInput;
        currentOperator = operator;
        resetScreen = true;
        updateDisplay();
    }
}

// Perform calculation and update display
function evaluate() {
    if (!currentOperator || resetScreen) return;
    const calculation = operate(currentOperator, previousInput, currentInput);
    if (calculation === null) {
        alert("Can't divide by zero!");
        resetCalculator();
        return;
    }
    currentInput = formatResult(calculation);
    previousInput = '';
    currentOperator = null;
    resetScreen = true;
    updateDisplay();
}

function formatResult(result) {
    if (result.toString().length > 10) { // Adjust the length as needed
        return result.toPrecision(10); // Use scientific notation for large numbers
    }
    return String(result);
}

// Adding event listeners to buttons
digitButtons.forEach(button => button.addEventListener('click', () => inputDigit(button.textContent)));
operatorButtons.forEach(button => button.addEventListener('click', () => inputOperator(button.textContent)));
equalsButton.addEventListener('click', evaluate);
clearButton.addEventListener('click', resetCalculator);
deleteButton.addEventListener('click', deleteDigit);
decimalButton.addEventListener('click', inputDecimal);

// Keyboard support
window.addEventListener('keydown', (e) => {
    if (e.key.match(/[0-9]/)) inputDigit(e.key);
    else if (e.key === '.') inputDecimal();
    else if (e.key.match(/[\+\*\/]/)) inputOperator(e.key);
    else if (e.key === 'Enter' || e.key === '=') evaluate();
    else if (e.key === 'Backspace') deleteDigit();
    else if (e.key === 'Escape') resetCalculator();
    else if (e.key === '-') {
        if (currentInput === '' || currentInput === '0' || resetScreen) {
            currentInput = '-';
            resetScreen = false;
            updateDisplay();
        } else {
            inputOperator('-');
        }
    }
});

// Initialize calculator
resetCalculator();
