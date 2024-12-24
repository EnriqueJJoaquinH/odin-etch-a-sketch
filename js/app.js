// ? Global variables
let divisions = 16;
let drawMode = 'paint';

// ? DOM elements
let canvas = document.querySelector('#canvas');
let eraseBtn = document.querySelector('#erase-btn');
let paintBtn = document.querySelector('#paint-btn');
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
        case 'paint':
            event.target.classList.replace('erase', 'paint');
            break;
        case 'erase':
            event.target.classList.replace('paint', 'erase');
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
}

createCanvasGrid();
clearCanvas();

eraseBtn.addEventListener('click', () => {
    drawMode = 'erase';
});

paintBtn.addEventListener('click', () => {
    drawMode = 'paint';
});

clearBtn.addEventListener('click', clearCanvas);

canvas.addEventListener('mouseover', drawHandler);