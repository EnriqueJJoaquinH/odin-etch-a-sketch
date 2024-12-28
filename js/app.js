// ? Global variables
let divisions = 16;
let drawMode = 'black-btn';

// ? DOM elements
let canvas = document.querySelector('#canvas');
let btnPanel = document.querySelector('#control-panel');
let blackBtn = document.querySelector('#black-btn');
let gradientBtn = document.querySelector('#gradient-btn');
let eraseBtn = document.querySelector('#erase-btn');
let rainbowBtn = document.querySelector('#rainbow-btn');
let colorBtn = document.querySelector('#color-btn');
let colorBox = document.querySelector('#color-box');
let gridSlider = document.querySelector('#grid-slider');
let sliderLabel = document.querySelector('label[for="grid-slider"]');
let buttons = document.querySelectorAll('button');

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

function unselectButtons() {
    buttons.forEach((button) => {
        button.classList.remove('mode-selected', 'inactive');
    });
}

function eraseCanvas() {
    for (let row of Array.from(canvas.children)){
        for (let cell of Array.from(row.children)){
            cell.style.backgroundColor = '';
            cell.style.borderColor = '';
            cell.classList.remove(...cell.classList);
            cell.classList.add('cell', 'erase');
        }
    }
    drawMode = 'black-btn';
    unselectButtons();
    blackBtn.classList.add('mode-selected');
}

function manageButtonClicks(event) {
    switch (event.target.id) {
        case 'black-btn':
        case 'erase-btn':
        case 'gradient-btn':
        case 'rainbow-btn':
            drawMode = event.target.id;
            unselectButtons();
            event.target.classList.add('mode-selected', 'inactive');
            break;
        case 'color-btn':
            drawMode = event.target.id;
            unselectButtons();
            event.target.classList.add('mode-selected');
            colorBox.showPicker();
            break;
        case 'clear-btn':
            eraseCanvas();
            break;
        default:
            return;
    }
}

function getRandomColor() {
    let red = Math.floor(256 * Math.random());
    let green = Math.floor(256 * Math.random());
    let blue = Math.floor(256 * Math.random());

    return `rgb(${red}, ${green}, ${blue})`;
}

function drawOnCanvas(event) {
    switch (drawMode) {
        case 'black-btn':
            event.target.style.backgroundColor = '';
            event.target.style.borderColor = '';
            event.target.classList.replace('erase', 'black-ink');
            break;
        case 'erase-btn':
            event.target.style.backgroundColor = '';
            event.target.style.borderColor = '';
            event.target.classList.replace('black-ink', 'erase');
            break;
        case 'color-btn':
            let inkColor = colorBox.value;
            event.target.style.backgroundColor = inkColor;
            event.target.style.borderColor = inkColor;
            break;
        case 'rainbow-btn':
            let randColor = getRandomColor();
            event.target.style.backgroundColor = randColor;
            event.target.style.borderColor = randColor;
            break;
        default:
            break;
    }
}

createCanvasGrid();

btnPanel.addEventListener('click', manageButtonClicks);

canvas.addEventListener('mouseover', drawOnCanvas);

gridSlider.addEventListener('mouseup', changeCanvasGrid);

gridSlider.addEventListener('keyup', changeCanvasGrid);

gridSlider.addEventListener('input', (event) => {
    sliderLabel.textContent = `Squares per side: ${event.target.value}`;
});