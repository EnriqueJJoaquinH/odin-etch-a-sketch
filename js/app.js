let divisions = 16;

let canvas = document.querySelector('#canvas');

for (let row = 0; row < divisions; row++){
    let newRow = document.createElement('div');
    newRow.classList.add('row');
    
    for (let cell = 0; cell < divisions; cell++){
        let newCell = document.createElement('div');
        newCell.classList.add('cell');
        newRow.appendChild(newCell);
    }
    
    canvas.appendChild(newRow);
}