import './main.scss'
const display = document.querySelector<HTMLInputElement>(".display")
const equalSign = document.querySelector<HTMLButtonElement>(".button__operator--equal");
const cancel = document.querySelector<HTMLButtonElement>(".button__function--cancel");
const buttonsOperators = document.querySelectorAll<HTMLElement>(".button__operator");
if(!display || !equalSign|| !cancel) {
    throw new Error("Issues with Selector")
}
let valueFirst: number; 
let valueSecond: number;
let stage:number = 0;
let operator: string;
let numberFirst: number[] = [];
let numberSecond: number[] = [];


const buttonsNumber = document.querySelectorAll<HTMLElement>(".button__number");
const handleButtonsNumber = (event: Event) => {
    const target = event.currentTarget as HTMLButtonElement;
    const buttonValue = target.innerText;
    if (stage == 0 || stage == 1) {
        numberFirst.push(Number(buttonValue));
        display.value = `${numberFirst.join("")}`;
        valueFirst = Number(display.value);
    } else {
        numberSecond.push(Number(buttonValue))
        numberFirst.push(Number(buttonValue));
        display.value = `${numberSecond.join("")}`;
        valueSecond = Number(display.value);
    }
};
buttonsNumber.forEach(button => {
    button.addEventListener("click", handleButtonsNumber);
  });

// idea: all buttons pressed, show up in diplay, perform the calculation
// operators: store previous number and perform with the next number
//eg plus: store previous value, if display include +, then + the second value

const handleButtonsOperators = (event: Event) => {
    const target = event.currentTarget as HTMLButtonElement;
    operator = target.innerText;
    stage = 2;
};

buttonsOperators.forEach(button => {
    button.addEventListener("click", handleButtonsOperators);
});


const handleEqual = () => {
    if (operator === "+") {
        const answer = valueFirst + valueSecond;
        display.value = `${answer}`;
        stage = 0;
        numberFirst = [];
        numberSecond = [];
    } else if (operator === "-") {
        const answer = valueFirst - valueSecond;
        display.value = `${answer}`;
        stage = 0;
        numberFirst = [];
        numberSecond = [];
    } else if (operator === "x") {
        const answer = valueFirst * valueSecond;
        display.value = `${answer}`;
        stage = 0;
        numberFirst = [];
        numberSecond = [];
    } else if (operator === "÷") {
        const answer = valueFirst / valueSecond;
        display.value = `${answer}`;
        stage = 0;
        numberFirst = [];
        numberSecond = [];
    }
};

equalSign.addEventListener("click", handleEqual)

const handleCancel = () => {
    display.value = "";
    stage = 0;
    numberFirst = [];
    numberSecond = [];
}
cancel.addEventListener("click", handleCancel);

// = : perform calculation and show the answer in the display