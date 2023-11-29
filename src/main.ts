import './main.scss'
//Get access to the html elements
const display = document.querySelector<HTMLInputElement>(".display")
const equal = document.querySelector<HTMLButtonElement>(".button__operator--equal");
const cancel = document.querySelector<HTMLButtonElement>(".button__function--cancel");
const posNeg = document.querySelector<HTMLButtonElement>(".button__function--posNeg");
const decimal = document.querySelector<HTMLButtonElement>(".button__function--dot");
const percentage = document.querySelector<HTMLButtonElement>(".button__function--percentage");
const sin = document.querySelector<HTMLButtonElement>(".button__functionExtended--sin");
const cos = document.querySelector<HTMLButtonElement>(".button__functionExtended--cos");
const tan = document.querySelector<HTMLButtonElement>(".button__functionExtended--tan");
const footer = document.querySelector<HTMLDivElement>(".footer")
//Get access to html elements with querySelectorAll
const buttonsNumber = document.querySelectorAll<HTMLElement>(".button__number");
const buttonsOperators = document.querySelectorAll<HTMLElement>(".button__operator");

if(!display || !equal || !cancel || !posNeg || !decimal || !percentage || !sin || !cos || !tan || !footer) {
    throw new Error("Issues with Selector");
};

//Set variables
let valueFirst: number; 
let valueSecond: number;
let stage:number = 0;
let operator: string;
let numberFirst: any[] = [];
let numberSecond: any[] = [];
let haveSecondValue:boolean = false;
//Function for numbers
const handleButtonsNumber = (event: Event) => {
    const target = event.currentTarget as HTMLButtonElement;
    const buttonValue = target.innerText;
    if (stage == 0 || stage == 1) {
        numberFirst.push(Number(buttonValue));
        stage = 1;
        display.value = `${numberFirst.join("")}`;
        valueFirst = Number(display.value);
    } else {
        numberSecond.push(Number(buttonValue));
        display.value = `${numberSecond.join("")}`;
        valueSecond = Number(display.value);
        haveSecondValue = true;
    }
};
//Add eventlistener for the buttons in html
buttonsNumber.forEach(button => {
    button.addEventListener("click", handleButtonsNumber);
  });
//Function for operators
const handleButtonsOperators = (event: Event) => {
    if (haveSecondValue == true) {
        handleEqual();
        const target = event.currentTarget as HTMLButtonElement;
        operator = target.innerText;
        stage = 2;
    } else if (haveSecondValue == false) {
    const target = event.currentTarget as HTMLButtonElement;
    operator = target.innerText;
    stage = 2;
    }
};
//Add eventlistener for the buttons in html
buttonsOperators.forEach(button => {
    button.addEventListener("click", handleButtonsOperators);
});

//Function for equal sign i.e. perform the calculation
const handleEqual = () => {
    if (operator === "+") {
        const answer = valueFirst + valueSecond;
        display.value =`${parseFloat(answer.toFixed(3))}` //parseFloat, toFixed are used to handle answer with decimal places
        valueFirst = answer;
    } else if (operator === "-") {
        const answer = valueFirst - valueSecond;
        display.value =`${parseFloat(answer.toFixed(3))}`
        valueFirst = answer;
    } else if (operator === "x") {
        const answer = valueFirst * valueSecond;
        display.value =`${parseFloat(answer.toFixed(3))}`
        valueFirst = answer;
    } else if (operator === "÷") {
        const answer = valueFirst / valueSecond;
        display.value =`${parseFloat(answer.toFixed(3))}`
        valueFirst = answer;
    } else if (operator === "^") {
        const answer = Math.pow(valueFirst, valueSecond);
        display.value =`${parseFloat(answer.toFixed(3))}`
        valueFirst = answer;
    };
    //Easter Egg 1
    if (display.value == "Infinity") {
        display.value = "♾️ 無限 ♾️ ";
    
    //Easter Egg 2
    } else if (display.value == "1314") {
        footer.innerHTML = `<iframe width="250" height="auto" src="https://www.youtube.com/embed/O526KtL5i3U?si=yLuBYoRgofCFGmMZ&autoplay=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe> <p class="easterEgg"> 1314 sounds like forever in Cantonese, which is commonly used to express with love. Hope you enjoy :)</p>`;
    }
    //Reset the calculator
    numberFirst = [];
    numberSecond = [];
    haveSecondValue = false;
};
//Add eventlistener for the eqaul button in html
equal.addEventListener("click", handleEqual);

//Function for cancel sign
const handleCancel = () => {
    //Reset the calculator
    display.value = "";
    stage = 0;
    numberFirst = [];
    valueFirst = 0;
    numberSecond = [];
    valueSecond = 0;
    operator = "";
    haveSecondValue = false;
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
        if (numberFirst.includes(".")) {
            display.value = display.value;
        } else {
        numberFirst.push(".");
        display.value = `${numberFirst.join("")}`;
        }
    } else {
        if (numberSecond.includes(".")){
            display.value = display.value;
        } else {
        numberSecond.push(".")
        display.value = `${numberSecond.join("")}`;
        }
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
percentage.addEventListener("click", handlePercentage);

//Extended - function for sin
const handleSin = () => {
    valueFirst = Math.sin(valueFirst* Math.PI /180);
    display.value = `${parseFloat(valueFirst.toFixed(6))}`;
    stage = 0;
    numberFirst = [];
};
//Add eventlistener for the sin button in html
sin.addEventListener("click", handleSin);
//Extended - function for cos
const handleCos = () => {
    valueFirst = Math.cos(valueFirst* Math.PI /180);
    display.value = `${parseFloat(valueFirst.toFixed(6))}`;
    stage = 0;
    numberFirst = [];
};

//Add eventlistener for the cos button in html
cos.addEventListener("click", handleCos);
//Extended - function for tan
const handleTan = () => {
    if (valueFirst === 90) {
        display.value = "This should not exist!"
        stage = 0;
        numberFirst = [];
    } else {
    valueFirst = Math.tan(valueFirst* Math.PI /180);
    display.value = `${parseFloat(valueFirst.toFixed(6))}`;
    stage = 0;
    numberFirst = [];
    }
};
//Add eventlistener for the tan button in html
tan.addEventListener("click", handleTan);