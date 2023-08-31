const output = document.querySelector('.output');
const keys = document.querySelector('.keys');

let currentInput = '';
let maxInputLength = 25;

keys.addEventListener('click', (event) => {
    const target = event.target;
    const value = target.textContent;

    if (target.classList.contains('element')) {
        if (value === 'C') {
            clear();
        } else if (value === '+/-') {
            negate();
        } else if (value === '%') {
            percent();
        }
    } else if (target.classList.contains('colorElem')) {
        if (value === '=') {
            calculate();
        } else if (value === 'x') {
            handleOperator('*');
        } else {
            handleOperator(value);
        }
    } else if (value === ',') {
        addDecimal();
    } else {
        appendNumber(value);
    }
    updateOutputFontSize();
});

function clear() {
    currentInput = '';
    updateOutput();
}
function appendNumber(number) {
    currentInput += number;
    updateOutput();
}

function addDecimal() {
    if (!currentInput.includes('.')) {
        currentInput += '.';
        updateOutput();
    }
}

function negate() {
    currentInput = (parseFloat(currentInput) * -1).toString();
    updateOutput();
}

function percent() {
    currentInput = (parseFloat(currentInput) / 100).toString();
    updateOutput();
}

function calculate() {
    try {
        currentInput = eval(currentInput).toString();
        updateOutput();
    } catch (error) {
        currentInput = 'Error';
        updateOutput();
    }
}

function handleOperator(op) {
    if (currentInput !== '' && !currentInput.endsWith(' ') && !isNaN(currentInput[currentInput.length - 1])) {
        currentInput += ` ${op} `;
        updateOutput();
    }
}

function updateOutput() {
    output.textContent = currentInput === '' ? '0' : currentInput;
    updateOutputFontSize();
}

function updateOutputFontSize() {
    if (currentInput.length > maxInputLength) {
        let scaleFactor = Math.max(0.5, 1 - (currentInput.length - maxInputLength) * 0.03); // Настройте масштабирование как вам удобно
        output.style.fontSize = `${scaleFactor}em`;
    } else {
        output.style.fontSize = '1em'; // Возвращаем обычный размер шрифта
    }
}