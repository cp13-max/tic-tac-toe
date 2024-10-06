let fields = [
    'cross',
    null,
    'circle',
    null,
    null,
    'circle',
    null,
    null,
    'cross',
]

const tableCells = document.querySelectorAll('#ticTacToe td');

function render() {
    tableCells.forEach((cell, index) => {
        if (fields[index] === 'circle') {
            cell.textContent = 'O';  // O für 'circle'
        } else if (fields[index] === 'cross') {
            cell.textContent = 'X';   // X für 'cross'
        } else {
            cell.textContent = '';     // Leer für null
        }
    });
}

render();