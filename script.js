const cells = document.getElementsByClassName("num-cell");
const wrapper = document.getElementById("wrapper");

const timer = document.getElementById("timer");
const maxTimerSize = parseInt(getComputedStyle(timer).width);
let timerWidth = maxTimerSize;
let timerID = 1;
let timeMs = 100;
let difficulty = 1;

let total = 0;
let objetivo = 0;
let nivel = 1;
let puntos = 0;
let amountOfTiles = 2;


cellsIndex = [1, 2, 3, 4, 5, 6, 7, 8, 9]

function selectedListener() {
    // Esta función se encarga de delegar los eventos a las celdas
    wrapper.addEventListener("click", (e) => {const clickedCell = e.target.parentElement
        const cellIsActive = clickedCell.classList.contains("active")
        const cellIsSelected = clickedCell.classList.contains("selected")
        if (cellIsActive) {
            clickedCell.classList.toggle("selected");
            if (cellIsSelected) {
                total -= parseInt(e.target.innerHTML);
            } else {
                total += parseInt(e.target.innerHTML);
            }
        }
        if (checkWin(objetivo)) {
            newProblem()
        }
    })
}



function checkWin(num) {
    // chequea si la suma es igual al total
    return total === num
}

async function resetTiles() {
    // Aqui hago una selección aleatoria de algunas celdas para activarla
    // TODO: cambiar el número de celdas seleccionadas modificando el slice
    // Itero por las celdas para desactivarlas si es que están activadas
    for (const cell of cells) {
        cell.classList.remove("selected")
        cell.classList.replace("active", "inactive")
    };
}

function hideWrapper() {
    wrapper.classList.toggle("hidden");
}

function activateTiles(arrayOfIndex, cells) {
    for (const index of arrayOfIndex) {
        cells[index - 1].classList.replace("inactive", "active")
    }
}

function selectRandomTilesIndex(n = 9) {
    const randomTilesIndex = cellsIndex.sort(
        function () { return Math.random() - 0.5; }
    );
    return randomTilesIndex.slice(0, n)
}

function setCellNums(arrayOfValues, arrayOfCellsIndex) {
    let i = 0;
    for (index of arrayOfCellsIndex) {
        cells[index - 1].firstElementChild.innerHTML = arrayOfValues[i];
        i++
    }
}

function setObjective(num) {
    const numObjetivo = document.getElementById("num-objetivo");
    numObjetivo.innerHTML = num;
}

function newProblem() {
    wrapper.classList.toggle("hidden");
    puntos++;
    nextLevel();
    wrapper.classList.toggle("hidden");
}

function nextLevel() {
    amountOfTiles = Math.floor(puntos / 5 + 2);
    timeMs = Math.max(2, Math.floor((-0.02 * puntos ** 2 + 10))) * 10;
    newGame(amountOfTiles)
}

function randomSign() {
    return (Math.random() > 0.5) ? -1 : 1
}

// Crea un array aleatorio que será usado para generar la respuesta correcta
// Agregar un slice a partir del cuál será la respuesta
// TODO: cambiar el largo según parámetros
function randomNumGenerator(n = 3) {
    difficulty = Math.floor((puntos ** 2) * 0.05);
    const randomArray = Array.from(
        { length: n },
        () => randomSign() * Math.floor(((Math.random() - 0.5)) * 10) + difficulty
    );
    () => Math.floor(((Math.random() - 0.5)) * 10)
    return randomArray
}

// set the width from a given percentage
function timerPercentage(percentage) {
    timerWidth -= Math.floor((percentage * maxTimerSize) / 100);
    timer.style.width = `${timerWidth}px`;
}

function animateTimer() {
    if (timerWidth > 10) {
        timerPercentage(1)
    } else {
        clearInterval(timerID)
        gameOver()
    }
}

function setTimer(time) {
    return setInterval(animateTimer, time)
}

async function newGame(tiles) {
    // Generamos los números que estarán en el tablero
    hideWrapper();
    clearInterval(timerID)
    const cellsToActivate = selectRandomTilesIndex(tiles);
    const nums = randomNumGenerator(tiles);
    // Selecciono 3 para la respuesta
    objetivo = nums.slice(0, tiles - 1).reduce((a, b) => a + b, 0);
    // reseteo el tablero, establezco un objetivo y colocamos las piezas
    await resetTiles();
    activateTiles(cellsToActivate, cells);
    setCellNums(nums, cellsToActivate);
    setObjective(objetivo);
    timerPercentage(0);
    timerWidth = maxTimerSize;
    timerID = setTimer(timeMs);
    total = 0;
    hideWrapper();
}

function gameOver() {
    alert(`¡perdiste! tu puntaje fue de ${puntos}`)
    puntos = 0;
    timeMs = 100;
    newGame(3);
}



selectedListener()
newGame(3)
