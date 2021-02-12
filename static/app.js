let fullCalc = [];

const isOperator = (input) => {
    return (input === '+' || input === '-' || input === 'x' || input === '/');
}

const isSpecial = (input) => {
    return (input === 'AC' || input === 'C' || input === '&lt;' || input === '=');
}

const executeOperation = (arg1, arg2, operation) => {
    switch (operation) {
        case '+':
            return arg1 + arg2;
        case '-':
            return arg1 - arg2;
        case 'x':
            return arg1 * arg2;
        case '/':
            return arg1 / arg2;
    }
}

const executeCalc = () => {
    const copyFullCalc = [...fullCalc];
    let result = '0';
    let operator = '';
    let current;

    while (copyFullCalc.length != 0) {
        current = copyFullCalc.shift();
        
        if (isOperator(current)) {
            operator = current;
            continue;
        }

        if (!operator) {
            result = current;
            continue;
        }

        result = executeOperation(parseFloat(result, 10), parseFloat(current, 10), operator).toString();
    }

    return result;
}

window.onload = () => {
    const calculatorScreen = document.getElementById('js-screen-txt');
    const calculatorMemory = document.getElementById('js-screen-memory');
    const calculatorButtons = document.querySelectorAll('.js-calc-option');
    let currentCalc = '';
    let showingPreviousResult = false;

    for (let i = 0; i < calculatorButtons.length; i++) {
        calculatorButtons[i].addEventListener('click', (pressed) => {
            if (isOperator(pressed.target.innerHTML)) {
                if (showingPreviousResult) {
                    if (isOperator(fullCalc[fullCalc.length - 1])) {
                        fullCalc[fullCalc.length - 1] = pressed.target.innerHTML;
                    }
                } else {
                    fullCalc.push(currentCalc);
                    currentCalc = executeCalc();
                    showingPreviousResult = true;
                    fullCalc.push(pressed.target.innerHTML);
                }
            } else if (isSpecial(pressed.target.innerHTML)) {
                switch (pressed.target.innerHTML) {
                    case 'AC':
                        fullCalc = [];
                        currentCalc = '';
                        break;
                    case 'C':
                        currentCalc = '';
                        break;
                    case '&lt;':
                        if (showingPreviousResult) {
                            currentCalc = '';
                            break;
                        }
                        currentCalc = currentCalc.slice(0, -1);
                        break;
                    case '=':
                        if (currentCalc && !showingPreviousResult) {
                            fullCalc.push(currentCalc);
                        }
                        const result = executeCalc();
                        fullCalc = [];
                        currentCalc = result;
                }

                showingPreviousResult = false;
            } else {
                if (showingPreviousResult) {
                    currentCalc = '';
                    showingPreviousResult = false;
                }
                currentCalc += pressed.target.innerHTML;
            }

            calculatorMemory.innerHTML = fullCalc.join(" ");
            calculatorScreen.innerHTML = currentCalc === '' ? '0' : currentCalc;
        })
    }
};