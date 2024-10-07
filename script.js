let fields = [
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
]

function init(){
    render();
}

const tableCells = document.querySelectorAll('#ticTacToe td');
let currentPlayer = 'cross'; // Start mit 'cross'

function render() {
    tableCells.forEach((cell, index) => {
        if (fields[index] === 'circle') {
            cell.innerHTML = renderCircle();  // O für 'circle'
        } else if (fields[index] === 'cross') {
            cell.innerHTML = renderCross();   // X für 'cross'
        } else {
            cell.innerHTML = '';     // Leer für null
        }
        cell.setAttribute('onclick', `handleCellClick(${index})`);
    });
}

function handleCellClick(index) {
    // Füge den aktuellen Spieler zum fields-Array hinzu, wenn die Zelle leer ist
    if (fields[index] === null) {
        fields[index] = currentPlayer; // Aktuellen Spieler einfügen
        render(); // Neu rendern

        if (checkGameOver()) {
            drawWinningLine();
        } else {
            // Wechsle den Spieler
            currentPlayer = currentPlayer === 'cross' ? 'circle' : 'cross';
            // Entferne die onclick-Funktion
            tableCells[index].removeAttribute('onclick');
        }}
}

function checkGameOver() {
    // Gewinnbedingungen (Reihen, Spalten und Diagonalen)
    const winningCombinations = [
        [0, 1, 2], // Erste Reihe
        [3, 4, 5], // Zweite Reihe
        [6, 7, 8], // Dritte Reihe
        [0, 3, 6], // Erste Spalte
        [1, 4, 7], // Zweite Spalte
        [2, 5, 8], // Dritte Spalte
        [0, 4, 8], // Erste Diagonale
        [2, 4, 6], // Zweite Diagonale
    ];

    return winningCombinations.some(combination => {
        const [a, b, c] = combination;
        return fields[a] && fields[a] === fields[b] && fields[a] === fields[c];
    });
}

function drawWinningLine() {
    // Hier kannst du die Logik hinzufügen, um die gewinnende Linie zu zeichnen
    const winningCombination = getWinningCombination();

    if (winningCombination) {
        const [a, b, c] = winningCombination;
        const line = document.createElement('div');
        line.className = 'winning-line'; // Eine Klasse, die du für die Linie verwenden kannst
        const startCell = tableCells[a].getBoundingClientRect();
        const endCell = tableCells[c].getBoundingClientRect();

        const lineLength = Math.sqrt(Math.pow(endCell.left - startCell.left, 2) + Math.pow(endCell.top - startCell.top, 2));

        const lineAngle = Math.atan2(endCell.top - startCell.top, endCell.left - startCell.left);

        const pythagoras = Math.sqrt(Math.pow(((Math.sin(lineAngle)) * lineLength), 2) + Math.pow(lineLength, 2))

        line.style.position = 'absolute';
        line.style.transform = `rotate(${lineAngle}rad)`
        line.style.transformOrigin = `left top`
        line.style.border = '2px solid white'; // Weiße Linie
        line.style.backgroundColor = "white"
        line.style.top = `${(startCell.top + ((startCell.bottom - startCell.top) / 2))}px`;
        line.style.left = `${(startCell.left + (startCell.right - startCell.left) / 2)}px`;
       
        
        line.style.width = `${lineLength}px`;

        line.style.height = '2px';
        
        
        // Füge die Linie zur Tabelle hinzu
        document.getElementById('ticTacToe').appendChild(line);
    }
}

function getWinningCombination() {
    const winningCombinations = [
        [0, 1, 2], // Erste Reihe
        [3, 4, 5], // Zweite Reihe
        [6, 7, 8], // Dritte Reihe
        [0, 3, 6], // Erste Spalte
        [1, 4, 7], // Zweite Spalte
        [2, 5, 8], // Dritte Spalte
        [0, 4, 8], // Erste Diagonale
        [2, 4, 6], // Zweite Diagonale
    ];

    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (fields[a] && fields[a] === fields[b] && fields[a] === fields[c]) {
            return combination; // Gibt die gewinnende Kombination zurück
        }
    }
    return null; // Kein Gewinner
}

function renderCircle() {
    // Variablen für Höhe und Breite
    const width = 70;
    const height = 70;

    // SVG als String erstellen
    return (svg = `
        <svg width="${width}" height="${height}">
            <defs>
                <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:blue; stop-opacity:1" />
                    <stop offset="100%" style="stop-color:blue; stop-opacity:1" />
                </linearGradient>
            </defs>
            <circle cx="${width / 2}" cy="${height / 2}" r="${(width / 2) - 5}" fill="none" stroke="url(#grad1)" stroke-width="2" stroke-dasharray="440" stroke-dashoffset="440">
                <animate 
                    attributeName="stroke-dashoffset" 
                    from="440" 
                    to="0" 
                    dur="1s" 
                    fill="freeze" 
                />
            </circle>
        </svg>
    `);    
}

function renderCross() {
    // Variablen für Höhe und Breite
    const width = 70;
    const height = 70;

    // SVG als String erstellen
    return svg = `
        <svg width="${width}" height="${height}">
            <line x1="10" y1="10" x2="60" y2="60" stroke="orange" stroke-width="5" stroke-dasharray="100" stroke-dashoffset="100">
                <animate 
                    attributeName="stroke-dashoffset" 
                    from="100" 
                    to="0" 
                    dur=".5s" 
                    fill="freeze" 
                />
            </line>
            <line x1="10" y1="60" x2="60" y2="10" stroke="orange" stroke-width="5" stroke-dasharray="100" stroke-dashoffset="100">
                <animate 
                    attributeName="stroke-dashoffset" 
                    from="100" 
                    to="0" 
                    dur=".5s" 
                    fill="freeze" 
                    
                />
            </line>
        </svg>
    `;
}

function restart() {
   fields.forEach((element, index) => {fields[index] = null });
    currentPlayer = 'cross';
    const linethrough = document.querySelector('.winning-line');
    if (linethrough != null) {
        linethrough.remove();
    }
    render();
}





