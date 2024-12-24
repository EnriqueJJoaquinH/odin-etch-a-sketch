// ? Global variables
let divisions = 16;
let drawMode = 'black-ink';

// ? DOM elements
let canvas = document.querySelector('#canvas');
let eraseBtn = document.querySelector('#erase-btn');
let blackBtn = document.querySelector('#black-btn');
let clearBtn = document.querySelector('#clear-btn');

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

function drawHandler(event) {
    switch (drawMode) {
        case 'black-ink':
            event.target.classList.replace('erase', 'black-ink');
            break;
        case 'erase':
            event.target.classList.replace('black-ink', 'erase');
            break;
    }
}

function clearCanvas() {
    for (let row of Array.from(canvas.children)){
        for (let cell of Array.from(row.children)){
            cell.classList.remove(...cell.classList);
            cell.classList.add('cell', 'erase');
        }
    }
    drawMode = 'black-ink'
    blackBtn.classList.add('mode-selected');
    eraseBtn.classList.remove('mode-selected');
}

createCanvasGrid();
clearCanvas();

eraseBtn.addEventListener('click', () => {
    drawMode = 'erase';
    eraseBtn.classList.toggle('mode-selected');
    blackBtn.classList.toggle('mode-selected');
});

blackBtn.addEventListener('click', () => {
    drawMode = 'black-ink';
    eraseBtn.classList.toggle('mode-selected');
    blackBtn.classList.toggle('mode-selected');
});

clearBtn.addEventListener('click', clearCanvas);

canvas.addEventListener('mouseover', drawHandler);