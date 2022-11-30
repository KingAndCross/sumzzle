const cells = document.getElementsByClassName("num-cell");
const wrapper = document.getElementById("wrapper");

let total = 0;
let objetivo = 0;
let nivel = 1;

cellsIndex = [1, 2, 3, 4, 5, 6, 7, 8, 9]

function selectedListener() {
    wrapper.addEventListener("click", (e) => {
        const clickedCell = e.target.parentElement
        const cellIsActive = clickedCell.classList.contains("active")
        const cellIsSelected = clickedCell.classList.contains("selected")
        if (cellIsActive) {
            clickedCell.classList.toggle("selected");
        }
        if (cellIsSelected) {
            total -= parseInt(e.target.innerHTML);
        } else {
            total += parseInt(e.target.innerHTML);
        }
        if (checkWin(objetivo))
            endGame()
        console.log(total)
    })
}

function selectBtn(e) {
    e.classList.toggle("selected")
}

// TODO: agregar un temporizador que desmarque

function checkWin(num) {
    // chequea si la suma es igual al total
    return total === num
}

function resetTiles() {
    // Aqui hago una selección aleatoria de algunas celdas para activarla
    // TODO: cambiar el número de celdas seleccionadas modificando el slice
    // Itero por las celdas para desactivarlas si es que están activadas
    for (const cell of cells) {
        cell.classList.replace("active", "inactive")
        cell.classList.remove("selected")
    };
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
    const activeCells = document.getElementsByClassName("active");
    for (let i = 0; i < arrayOfValues.length; i++) {
        activeCells[i].firstElementChild.innerHTML = arrayOfValues[i];
    }
}

function setObjective(num) {
    const numObjetivo = document.getElementById("num-objetivo");
    numObjetivo.innerHTML = num;
}

function endGame() {
    newGame();
}

function newGame() {
    // Generamos los números que estarán en el tablero
    const cellsToActivate = selectRandomTilesIndex(4);
    nums = randomNumGenerator(4);
    cellArray = selectRandomTilesIndex(4);
    // Selecciono 3 para la respuesta
    objetivo = nums.slice(0, 3).reduce((a, b) => a + b, 0);
    total = 0;
    // reseteo el tablero, establezco un objetivo y colocamos las piezas
    resetTiles();
    activateTiles(cellsToActivate, cells);
    setObjective(objetivo);
    setCellNums(nums, cellArray);
}

// Crea un array aleatorio que será usado para generar la respuesta correcta
// Agregar un slice a partir del cuál será la respuesta
// TODO: cambiar el largo según parámetros
function randomNumGenerator(n = 3) {
    const randomArray = Array.from(
        { length: n },
        () => Math.floor(((Math.random() - 0.5)) * 10)
    );
    return randomArray
}

//.reduce((a, b) => a + b, 0)


newGame()
selectedListener()

// TODO: Reset game after victory
// TODO: animate time bar below
// TODO: dynamic diff. More active cells, more range, less time etc.
// TODO: hide tiles while reloading