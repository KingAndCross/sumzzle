const cells = document.getElementsByClassName("num-cell");
const wrapper = document.getElementById("wrapper");
let total = 0;
let objetivo = 0;

cellsIndex = [1, 2, 3, 4, 5, 6, 7, 8, 9]

// TODO: aqui se puede poner el listener en el wrapper y usar e.target
function selectedListener() {
    wrapper.addEventListener("click", (e) => {
        if (e.target.classList.contains("active")) {
            e.target.classList.toggle("selected");
        }
        if (e.target.classList.contains("selected")) {
            total += parseInt(e.target.innerHTML);
        } else {
            total -= parseInt(e.target.innerHTML);
        }
        if (checkWin(objetivo))
            endGame()
    })
}

function selectBtn(e) {
    e.classList.toggle("selected")
}

// TODO: agregar un temporizador que desmarque

function checkWin(num) {
    // chequea si la suma es igual al total
    let suma = 0;
    const selectedCells = document.getElementsByClassName("selected");
    for (let i = 0; i < selectedCells.length; i++) {
        suma += parseInt(selectedCells[i].innerHTML)
    };
    return suma === num
}

function resetTiles() {
    // Aqui hago una selección aleatoria de algunas celdas para activarla
    // TODO: cambiar el número de celdas seleccionadas modificando el slice
    const activeCellsIndex = cellsIndex.sort(
        function () { return Math.random() - 0.5; }
    ).slice(0, 3);
    const cells = document.getElementsByClassName("num-cell")
    // Itero por las celdas para activarlas
    for (const index of activeCellsIndex) {
        cells[index - 1].classList.toggle("inactive")
        cells[index - 1].classList.toggle("active")
    };
}

function setCellNums(arrayOfValues) {
    const activeCells = document.getElementsByClassName("active");
    for (let i = 0; i < arrayOfValues.length; i++) {
        activeCells[i].innerHTML = arrayOfValues[i];
    }
}

function setObjective(num) {
    const numObjetivo = document.getElementById("num-objetivo");
    numObjetivo.innerHTML = num;
}

function endGame() {
    console.log("game over!")
}

function newGame() {
    // Generamos los números que estarán en el tablero
    nums = randomNumGenerator(4);
    // Selecciono 3 para la respuesta
    objetivo = nums.slice(0, 3).reduce((a, b) => a + b, 0);
    total = 0;
    resetTiles();
    setObjective(objetivo);
    setCellNums(nums);
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