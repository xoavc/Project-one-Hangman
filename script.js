const words = [
        "Antelope",
        "Camel",
        "Dolphin",
        "Flamingo",
        "Spagetti", 
        "Dumplings", 
        "Meatballs", 
        "Quesadilla",
        "Bahamas", 
        "Australia", 
        "Indonesia", 
        "Seychelles",
]   

let answer = " ";
let mistakes = 0;
let guessed = [];
let wordStatus = null;

function randomWord() {
    answer = words[Math.floor(Math.random() * words.length)]
}

//found this code "shortcut" so i didn't have to repeat a long code for a keyboard

function generateButtons() {
    let buttonsHTML = "abcdefghijklmnopqrstuvwxyz" .split("").map(letter =>
        `
        <button
        class="btn btn-lg btn-primary m-2"
        id='` + letter + `'
        onClick="handleGuess('` + letter +`')"
        >
         ` + letter + `
        </button>
        `).join('');

        document.getElementById("keyboard").innerHTML = buttonsHTML
}

 function handleGuess(chosenLetter) {
    guessed.indexOf(chosenLetter) === -1 ? guessed.push(chosenLetter) : null;
    document.getElementById(chosenLetter).setAttribute('disabled', true);

 

  if (answer.indexOf(chosenLetter) >= 0) {
    guessedWord();
    seeIfPlayerWon();
  } else if (answer.indexOf(chosenLetter) === -1) {
    updateMistakes();
    seeIfPlayerWon();

  }
 }

 
 
 function guessedWord() {
    wordStatus = answer.split("").map(letter => (guessed.indexOf(letter) >= 0 ? letter : " _ ")).join("");
   
    document.getElementById('wordSpotlight').innerHTML = wordStatus;
 }

 function  seeIfPlayerWon() {
    if (wordStatus === answer) {
        document.getElementById("keyboard").innerHTML = "You Won! :)";
    }else if (wordStatus === maxTry) {
        document.getElementById("keybord").innerHTML = "You Lost! :(";
        document.getElementById("keyboard").innerHTML = "The word was: " + answer;
    }
    
 }

 function updateMistakes() {
    document.getElementById("mistakes").innerHTML = mistakes;
 }

 randomWord();
generateButtons();
guessedWord();


const canvas = document.getElementById("canvas");




//couldn't figure out how to draw the original hangman stick figure and got this explanation online.
// I couldn't get it to work in my code though.

    let { initialDrawing } = canvasCreator();

     initialDrawing();
 

const canvasCreator = () => {
    let context = canvas.getContext("2d");
    context.beginPath();
    context.strokeStyle = "000";
    context.lineWidth = 2;

    const drawLine = (fromX, fromY, toX, toY) => {
        context.moveTo(fromX, fromY);
        context.lineTo(toX, toY);
        context.stroke();

    };
    const head = () => {
        context.beginPath();
        context.arc(70, 30, 10, 0, Math.PI * 2, true);
        context.stroke();
    };
    const body = () => {
        drawLine(70, 40, 70, 80);
    };
    const leftArm = () => {
        drawLine(70, 50, 50, 70);
    };
    const rightArm = () => {
        drawLine(70, 50, 90, 70);
    };
    const leftLeg = () => {
        drawLine(70, 80, 50, 110);
    };
    const rightLeg = () => {
        drawLine(70, 80, 50, 110);
    };
      
    const initialDrawing = () => {
        context.clearRect(0, 0, context.canvas.width, context.canvas.height);

        drawLine(15, 120, 120, 120);

        drawLine(12, 12, 12, 130);

        drawLine(12, 12, 70, 10);

        drawLine(70, 12, 70, 25);
    };

    return { initialDrawing, head, body, leftArm, rightArm, leftLeg, rightLeg };

};

const drawMan = (count) => {
    let { head, body, leftArm, rightArm, leftLeg, rightLeg } = canvasCreator();
    switch (count) {
        case 1:
            head();
            break;
        case 2:
            body();
            break;
        case 3:
            leftArm();
            break;
        case 4:
            rightArm();
            break;
        case 5:
            leftLeg();
            break;
        case 6:
            rightLeg();
            break;
        default:
            break;
    }
};

newGameButton.addEventListener("click", initializer);
window.onload = initializer;