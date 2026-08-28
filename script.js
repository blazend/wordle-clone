const gameBoard = document.getElementById("game-container");



const rows = 6
const columns = 5 //guesses

let currentRow = 0;
let currentColumn = 0;


const targetWord = "amiel";
const targetLetters = Array.from(targetWord);






window.addEventListener("keydown", handlekeydown);



const response1 = "wrong ass word go again"  // word not in list
const response2 = "Congrats for winning nohting" // guessing correct word

function getCurrentGuess() {
    let word = ""
    for (let i = 0; i < columns; i++) {
        const tile = document.querySelector(`[data-row="${currentRow}"][data-column="${i}"]`);

        word += tile.innerText.toLowerCase();
        

        
    }
    
    return word
}


function checkGuess() {


    //only check guesses when all spaces are filled
    if (currentColumn !== columns) {
        return
    }
    const targetCopy = Array.from(targetWord);
    const currentGuess = getCurrentGuess()

    if (!WORD_LIST.includes(currentGuess)) {
        
        alert(response1)
        
        return
    }


    for (let i = 0; i < columns; i++) {
        const tile = document.querySelector(`[data-row="${currentRow}"][data-column="${i}"]`);

        const typedLetter = tile.innerText.toLowerCase();

        if (typedLetter == targetCopy[i]) {
            tile.classList.add("correct")
            targetCopy[i] = null;
        } 
    }
    



    for (let i = 0; i < columns; i++) {
        const tile = document.querySelector(`[data-row="${currentRow}"][data-column="${i}"]`);
        
        // Skip tiles that were ALREADY marked green in Pass 1
        if (tile.classList.contains("correct")) {
            continue;
        }

        const typedLetter = tile.innerText.toLowerCase();
        
        // Check if the typed letter exists anywhere in the remaining targetCopy
        const index = targetCopy.indexOf(typedLetter)

        if (index !== -1) { 
            tile.classList.add("present");
            targetCopy[index] = null
        } else {
            tile.classList.add("absent")
        }
    
    }

    //winning ig
    if (currentGuess === targetWord) {
    alert(response2);
    window.removeEventListener("keydown", handlekeydown); // Stop inputs
    return;
}

// Also check for game over (loss) when rows are exhausted:
if (currentRow === rows - 1) {
    alert(`Game over! The word was ${targetWord.toUpperCase()}`);
    window.removeEventListener("keydown", handlekeydown);
    return;
}

    currentRow++;
    currentColumn = 0;

    
}



function handlekeydown(e) {
    //delete letters
    if (e.key == "Backspace") {
        if (currentColumn > 0) {
            currentColumn--;
            //remove the thing
            const tile = document.querySelector(`[data-row="${currentRow}"][data-column="${currentColumn}"]`);
            tile.innerText = "";
        }
    }
    
    //add letters
    if (e.key.length === 1 && /[a-zA-Z]/.test(e.key)) {

        if (currentColumn < columns) {
            const tile = document.querySelector(`[data-row="${currentRow}"][data-column="${currentColumn}"]`);
            tile.innerText = e.key.toLowerCase();
            currentColumn++
        }
        
    }
    
    //next guess
    if (e.key == "Enter") {
        checkGuess()
    }
}

//create wordle grid
function createGrid() {

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            const letter = document.createElement("div");
            letter.dataset.row = r;
            letter.dataset.column = c;
            letter.classList.add("letter");
            gameBoard.appendChild(letter);
        }
    }
}


createGrid()
