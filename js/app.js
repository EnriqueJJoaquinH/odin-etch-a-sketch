// ? Global variables
let divisions = 16;
let drawMode = 'black-btn';

// ? DOM elements
let canvas = document.querySelector('#canvas');
let btnPanel = document.querySelector('#control-panel');
let blackBtn = document.querySelector('#black-btn');
let eraseBtn = document.querySelector('#erase-btn');

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

function clearCanvas() {
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

function buttonHandler(event) {
    switch (event.target.id) {
        case 'control-panel':
            return;
        case 'black-btn':
        case 'erase-btn':
            drawMode = event.target.id;
            eraseBtn.classList.toggle('mode-selected');
            blackBtn.classList.toggle('mode-selected');
            break;
        case 'clear-btn':
            clearCanvas();
            break;
    }
}

function drawHandler(event) {
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

btnPanel.addEventListener('click', buttonHandler)

canvas.addEventListener('mouseover', drawHandler);