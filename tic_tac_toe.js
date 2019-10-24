let canv = document.getElementById("myCanvas"),
    ctx = canv.getContext("2d"),
    msg = document.getElementById("message"),
    cellsize = 100,
    map = [
        1, 0, 0,
        0, 0, -1,
        -1, 0, 1
    ],
    winPatterns = [
        0b111000000, 0b000111000, 0b000000111, //rows
        0b100100100, 0b010010010, 0b001001001, //column
        0b100010001, 0b001010100, 0b001001001, //diagonals
    ],
    BLANK = 0, X = 1, O = -1;

 canv.width = canv.height = 3 * cellsize;

function draw() {
    ctx.clearRect(0,0, canv.width, canv.height);
    drawBoard();
    fillBoard();

    function drawBoard() {
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 10;

        ctx.beginPath();
        ctx.moveTo(cellsize, 0);
        ctx.lineTo(cellsize, canv.height);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(cellsize * 2, 0);
        ctx.lineTo(cellsize * 2, canv.height);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(0, cellsize);
        ctx.lineTo(canv.width, cellsize);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(0, cellsize * 2);
        ctx.lineTo(canv.width, cellsize * 2);
        ctx.stroke();
    }

    function fillBoard() {
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 5;
        for (let i = 0; i < map.length; i++) {
            let coords = getCellCoords(i)

            ctx.save();
            ctx.translate(coords.x + cellsize / 2, coords.y + cellsize / 2);
            if (map[i] === X) {
                drawX();
            } else if (map[i] === O) {
                drawO();
            }
            ctx.restore();
        }
    }

    function drawX() {
        ctx.beginPath();
        ctx.moveTo(-cellsize / 3, -cellsize / 3);
        ctx.lineTo(cellsize / 3, cellsize / 3);
        ctx.moveTo(cellsize / 3, -cellsize / 3);
        ctx.lineTo(-cellsize / 3, cellsize / 3);
        ctx.stroke();
    }

    function drawO() {
        ctx.beginPath();
        ctx.arc(0,0, cellsize / 3, 0, Math.PI * 2);
        ctx.stroke();
    }
    requestAnimationFrame(draw);
}

function getCellCoords(cell) {
    let x = (cell % 3) * cellsize;
    let y = Math.floor(cell / 3) * cellsize;

    return {
        "x": x,
        "y": y,
    };
}

draw();

