import './main.scss'
//Get access to the html elements
const display = document.querySelector<HTMLInputElement>(".display")
const equalSign = document.querySelector<HTMLButtonElement>(".button__operator--equal");
const cancel = document.querySelector<HTMLButtonElement>(".button__function--cancel");
const posNeg = document.querySelector<HTMLButtonElement>(".button__function--posNeg");
const buttonsNumber = document.querySelectorAll<HTMLElement>(".button__number");
const buttonsOperators = document.querySelectorAll<HTMLElement>(".button__operator");
if(!display || !equalSign|| !cancel || !posNeg) {
    throw new Error("Issues with Selector");
};

//Set variables
let valueFirst: number; 
let valueSecond: number;
let stage:number = 0;
let operator: string;
let numberFirst: number[] = [];
let numberSecond: number[] = [];

//function for numbers
const handleButtonsNumber = (event: Event) => {
    const target = event.currentTarget as HTMLButtonElement;
    const buttonValue = target.innerText;
    if (stage == 0 || stage == 1) {
        numberFirst.push(Number(buttonValue));
        display.value = `${numberFirst.join("")}`;
        valueFirst = Number(display.value);
    } else {
        numberSecond.push(Number(buttonValue));
        numberFirst.push(Number(buttonValue));
        display.value = `${numberSecond.join("")}`;
        valueSecond = Number(display.value);
    }
};
//add eventlistener for the buttons in html
buttonsNumber.forEach(button => {
    button.addEventListener("click", handleButtonsNumber);
  });
//function for operators
const handleButtonsOperators = (event: Event) => {
    const target = event.currentTarget as HTMLButtonElement;
    operator = target.innerText;
    stage = 2;
};
//add eventlistener for the buttons in html
buttonsOperators.forEach(button => {
    button.addEventListener("click", handleButtonsOperators);
});

//function for equal sign
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
//add eventlistener for the eqaul button in html
equalSign.addEventListener("click", handleEqual);

//function for cancel sign
const handleCancel = () => {
    display.value = "";
    stage = 0;
    numberFirst = [];
    numberSecond = [];
};
//add eventlistener for the cancel button in html
cancel.addEventListener("click", handleCancel);

//function for +/- sign
const handlePosNeg = () => {
    if (stage == 0 || stage == 1) {
        valueFirst = valueFirst * -1;
        display.value = `${valueFirst}`;
    } else if (stage == 2) {
        valueSecond = valueSecond * -1;
        display.value = `${valueSecond}`;
    };
};
//add eventlistener for the +/- button in html
posNeg.addEventListener("click", handlePosNeg);