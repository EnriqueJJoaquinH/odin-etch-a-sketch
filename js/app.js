// ? Global variables
let divisions = 16;
let drawMode = 'paint';

// ? DOM elements
let canvas = document.querySelector('#canvas');
let eraseBtn = document.querySelector('#erase-btn');
let paintBtn = document.querySelector('#paint-btn');

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
            event.target.classList.remove('erase');
            event.target.classList.add('paint');
            break;
        case 'erase':
            event.target.classList.remove('paint');
            event.target.classList.add('erase');
            break;
    }
}

createCanvasGrid()

eraseBtn.addEventListener('click', () => {
    drawMode = 'erase';
});

paintBtn.addEventListener('click', () => {
    drawMode = 'paint';
});

canvas.addEventListener('mouseover', drawHandler);