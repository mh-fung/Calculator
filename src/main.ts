import './main.scss'
const display = document.querySelector<HTMLHeadElement>(".display")

if(!display ) {
    throw new Error("Issues with Selector")
}
let answer: number = 0;
let currentNumber: number[] = [];

// const handleClick1 = () => {
//     const buttonValue = 1
//     currentNumber.push(buttonValue);
//     const shown = currentNumber.join("");
//     display.innerHTML = `${shown}`;
// };


const buttonsNumber = document.querySelectorAll<HTMLElement>(".button__number");

const handleButtonsNumber = (event: Event) => {
    const target = event.currentTarget as HTMLButtonElement;
    const buttonValue = target.innerText
    currentNumber.push(Number(buttonValue));
    display.innerHTML = `${currentNumber.join("")}`;
}


buttonsNumber.forEach(button => {
    button.addEventListener("click", handleButtonsNumber)
  });


// idea: all buttons pressed, show up in diplay
//
// = : perform calculation and show the answer in the display