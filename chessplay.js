const Board = document.querySelector("#board");
const Player = document.querySelector("#player");
const width = 8;
let Playergo = 'purple';
Player.textContent = 'purple';

const StartPosition = [
    Brook, Bknight, Bbishop, Bqueen, Bking, Bbishop, Bknight, Brook,
    Bpawn, Bpawn, Bpawn, Bpawn, Bpawn, Bpawn, Bpawn, Bpawn,
    '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '',
    Wpawn, Wpawn, Wpawn, Wpawn, Wpawn, Wpawn, Wpawn, Wpawn,
    Wrook, Wknight, Wbishop, Wqueen, Wking, Wbishop, Wknight, Wrook,
];

function createboard() {
    StartPosition.forEach((startpiece, i) => {
        const square = document.createElement('div');
        square.classList.add('square');
        square.setAttribute('square-id', i);

        if (startpiece) {
            const piececontainer = document.createElement('div');
            piececontainer.innerHTML = startpiece;
            const pieceSVG = piececontainer.firstChild;
            if (pieceSVG) {
                pieceSVG.setAttribute('draggable', true);
            }
            square.appendChild(piececontainer);
        }

        const row = Math.floor((63 - i) / 8) + 1;
        if (row % 2 === 0) {
            square.classList.add(i % 2 === 0 ? "purple" : "white");
        } else {
            square.classList.add(i % 2 === 0 ? "white" : "purple");
        }

        Board.append(square);
    });
}

createboard();

const allsquares = document.querySelectorAll(" .square");
allsquares.forEach(square => {
    square.addEventListener('dragstart', dragStart);
    square.addEventListener('dragover', dragOver);
    square.addEventListener('drop', dragDrop);
});

let StartPositionid;
let draggedElement;

function dragStart(e) {
    StartPositionid = e.target.closest('.square').getAttribute('square-id');
    draggedElement = e.target;
    console.log("Dragging started for:", draggedElement);
}

function dragOver(e) {
    e.preventDefault();
}

function dragDrop(e) {
    e.preventDefault();
    e.stopPropagation();
    const targetSquare = e.target.closest('.square');
    console.log("Drop target:", targetSquare);
    const correctgo = draggedElement.classList.contains(Playergo);
    const taken = targetSquare.querySelector('.piece');
    const valid = checkifvalid(targetSquare);
    const opponentgo = Playergo === 'white' ? 'purple' : 'white';
    const takenbyopp = taken && taken.classList.contains(opponentgo);
    console.log("Taken by opponent:", takenbyopp, "Valid move:", valid);

            targetSquare.appendChild(draggedElement);
            taken.remove();
            changeplayer();
        
    
}

function changeplayer() {
    if (Playergo === 'purple') {
        reverseId();
        Playergo = 'white';
        Player.textContent = 'white';
    } else {
        revertId();
        Playergo = 'purple';
        Player.textContent = 'purple';
    }
}

function reverseId() {
    const allSquares = document.querySelectorAll(".square");
    allSquares.forEach((square, i) => 
        square.setAttribute('square-id', (width * width - 1) - i)
    );
}

function revertId() {
    const allSquares = document.querySelectorAll(".square");
    allSquares.forEach((square, i) => 
        square.setAttribute('square-id', i)
    );
}

function checkifvalid(target) {
    const targetid = Number(target.getAttribute('square-id')) || Number(target.closest('.square').getAttribute('square-id'));
    const startid = Number(StartPositionid);
    const piece = draggedElement.id;
    console.log('Target ID:', targetid);
    console.log('Start ID:', startid);
    console.log('Piece:', piece);

    switch(piece) {
        case 'wpawn':
            const startrow2 = [8, 9, 10, 11, 12, 13, 14, 15]; 
            if (startrow2.includes(startid) && (startid + width * 2 === targetid || startid + width === targetid)) {
                return true;
            }
            if (startid + width === targetid) {
                return true;
            }
            if ((startid + width - 1 === targetid || startid + width + 1 === targetid) && document.querySelector(`[square-id="${targetid}"]`).firstChild) {
                return true;
            }
            break;
            
        case 'bpawn':
            const startrow1 = [8, 9, 10, 11, 12, 13, 14, 15];
            if (startrow1.includes(startid) && (startid + width * 2 === targetid || startid + width === targetid)) {
                return true;
            }
            if (startid + width === targetid) {
                return true;
            }
            if ((startid + width - 1 === targetid || startid + width + 1 === targetid) && document.querySelector(`[square-id="${targetid}"]`).firstChild) {
                return true;
            }
            break;
    }
    return false;
}
