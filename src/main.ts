import './main.scss'
//Get access to the html elements
const display = document.querySelector<HTMLInputElement>(".display")
const equal = document.querySelector<HTMLButtonElement>(".button__operator--equal");
const cancel = document.querySelector<HTMLButtonElement>(".button__function--cancel");
const posNeg = document.querySelector<HTMLButtonElement>(".button__function--posNeg");
const decimal = document.querySelector<HTMLButtonElement>(".button__function--dot");
const percentage = document.querySelector<HTMLButtonElement>(".button__function--percentage");
const buttonsNumber = document.querySelectorAll<HTMLElement>(".button__number");
const buttonsOperators = document.querySelectorAll<HTMLElement>(".button__operator");

if(!display || !equal || !cancel || !posNeg || !decimal || !percentage) {
    throw new Error("Issues with Selector");
};

//Set variables
let valueFirst: number; 
let valueSecond: number;
let stage:number = 0;
let operator: string;
let numberFirst: any[] = [];
let numberSecond: any[] = [];

//Function for numbers
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
    };
};
//Add eventlistener for the buttons in html
buttonsNumber.forEach(button => {
    button.addEventListener("click", handleButtonsNumber);
  });
//Function for operators
const handleButtonsOperators = (event: Event) => {
    const target = event.currentTarget as HTMLButtonElement;
    operator = target.innerText;
    stage = 2;
};
//Add eventlistener for the buttons in html
buttonsOperators.forEach(button => {
    button.addEventListener("click", handleButtonsOperators);
});

//Function for equal sign
const handleEqual = () => {
    if (operator === "+") {
        const answer = valueFirst + valueSecond;
        if (Number.isInteger(answer) === false) {
            display.value = `${answer.toFixed(3)}`;
            } else {
                display.value =`${answer}`
            }
        valueFirst = answer;
    } else if (operator === "-") {
        const answer = valueFirst - valueSecond;
        if (Number.isInteger(answer) === false) {
            display.value = `${answer.toFixed(3)}`;
            } else {
                display.value =`${answer}`
            }
        valueFirst = answer;
    } else if (operator === "x") {
        const answer = valueFirst * valueSecond;
        if (Number.isInteger(answer) === false) {
            display.value = `${answer.toFixed(3)}`;
            } else {
                display.value =`${answer}`
            }
        valueFirst = answer;
    } else if (operator === "÷") {
        const answer = valueFirst / valueSecond;
        if (Number.isInteger(answer) === false) {
        display.value = `${answer.toFixed(3)}`;
        } else {
            display.value =`${answer}`
        }
        valueFirst = answer;
    }
    stage = 0;
    numberFirst = [];
    numberSecond = [];
};
//Add eventlistener for the eqaul button in html
equal.addEventListener("click", handleEqual);

//Function for cancel sign
const handleCancel = () => {
    display.value = "";
    stage = 0;
    numberFirst = [];
    valueFirst = 0;
    numberSecond = [];
    valueSecond = 0;
};
//Add eventlistener for the cancel button in html
cancel.addEventListener("click", handleCancel);

//Function for +/- sign
const handlePosNeg = () => {
    if (stage == 0 || stage == 1) {
        valueFirst = valueFirst * -1;
        display.value = `${valueFirst}`;
    } else if (stage == 2) {
        valueSecond = valueSecond * -1;
        display.value = `${valueSecond}`;
    };
};
//Add eventlistener for the +/- button in html
posNeg.addEventListener("click", handlePosNeg);

//Function for . 
const handleDot = () => {
    if (stage == 0 || stage == 1) {
        numberFirst.push(".");
        display.value = `${numberFirst.join("")}`;
    } else {
        numberSecond.push(".")
        display.value = `${numberSecond.join("")}`;
    };
};

//Add eventlistener for the . button in html
decimal.addEventListener("click", handleDot);

//Function for percentage sign
const handlePercentage = () => {
    if (stage == 0 || stage == 1) {
        valueFirst = valueFirst / 100;
        display.value = `${valueFirst}`;
    } else if (stage == 2) {
        valueSecond = valueSecond / 100;
        display.value = `${valueSecond}`;
    };
};

//Add eventlistener for the percentage button in html
percentage.addEventListener("click", handlePercentage)