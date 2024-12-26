// ? Global variables
let divisions = 16;
let drawMode = 'black-btn';

// ? DOM elements
let canvas = document.querySelector('#canvas');
let btnPanel = document.querySelector('#control-panel');
let blackBtn = document.querySelector('#black-btn');
let eraseBtn = document.querySelector('#erase-btn');
let gridSlider = document.querySelector('#grid-slider');
let sliderLabel = document.querySelector('label[for="grid-slider"]');

function createCanvasGrid() {
    for (let row = 0; row < divisions; row++){
        let newRow = document.createElement('div');
        newRow.classList.add('row');

        for (let cell = 0; cell < divisions; cell++){
            let newCell = document.createElement('div');
            newCell.classList.add('cell', 'erase');
            newRow.appendChild(newCell);
        }
        canvas.appendChild(newRow);
    }
}

function deleteCanvasGrid() {
    for (let row of Array.from(canvas.children)){
        for (let cell of Array.from(row.children)){
            cell.remove();
        }
        row.remove();
    }
}

function changeCanvasGrid(event) {
    divisions = Number(event.target.value);
    deleteCanvasGrid();
    createCanvasGrid();
}

function eraseCanvas() {
    for (let row of Array.from(canvas.children)){
        for (let cell of Array.from(row.children)){
            cell.classList.remove(...cell.classList);
            cell.classList.add('cell', 'erase');
        }
    }
    drawMode = 'black-btn'
    blackBtn.classList.add('mode-selected');
    eraseBtn.classList.remove('mode-selected');
}

function manageButtonClicks(event) {
    switch (event.target.id) {
        case 'black-btn':
        case 'erase-btn':
            drawMode = event.target.id;
            eraseBtn.classList.toggle('mode-selected');
            blackBtn.classList.toggle('mode-selected');
            break;
        case 'clear-btn':
            eraseCanvas();
            break;
        default:
            return;
    }
}

function drawOnCanvas(event) {
    switch (drawMode) {
        case 'black-btn':
            event.target.classList.replace('erase', 'black-ink');
            break;
        case 'erase-btn':
            event.target.classList.replace('black-ink', 'erase');
            break;
    }
}

createCanvasGrid();

btnPanel.addEventListener('click', manageButtonClicks)

canvas.addEventListener('mouseover', drawOnCanvas);

gridSlider.addEventListener('mouseup', changeCanvasGrid);

gridSlider.addEventListener('keyup', changeCanvasGrid);

gridSlider.addEventListener('input', (event) => {
    sliderLabel.textContent = `Squares per side: ${event.target.value}`;
});