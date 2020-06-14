document.addEventListener('DOMContentLoaded', () => {

    const grid = document.querySelector('.grid');
    let squares = Array.from(document.querySelectorAll('.grid div'));
    const scoreDisplay = document.querySelector('#score');
    const startButton = document.querySelector('#start-button');
    const width = 10;

    //The Tetrominoes
    const lTetromino = [
        [1, width + 1, width * 2 + 1, 2],
        [width, width + 1, width + 2, width * 2 + 2],
        [1, width + 1, width * 2 + 1, width * 2],
        [width, width * 2, width * 2 + 1, width * 2 + 2]
    ];

    const zTetromino = [
        [0, width, width + 1, width * 2 + 1],
        [width + 1, width + 2, width * 2, width * 2 + 1],
        [0, width, width + 1, width * 2 + 1],
        [width + 1, width + 2, width * 2, width * 2 + 1]
    ];

    const tTetromino = [
        [1, width, width + 1, width + 2],
        [1, width + 1, width + 2, width * 2 + 1],
        [width, width + 1, width + 2, width * 2 + 1],
        [1, width, width + 1, width * 2 + 1]
    ];

    const oTetromino = [
        [0, 1, width, width + 1],
        [0, 1, width, width + 1],
        [0, 1, width, width + 1],
        [0, 1, width, width + 1]
    ];

    const iTetromino = [
        [1, width + 1, width * 2 + 1, width * 3 + 1],
        [width, width + 1, width + 2, width + 3],
        [1, width + 1, width * 2 + 1, width * 3 + 1],
        [width, width + 1, width + 2, width + 3]
    ];

    const theTetrominoes = [lTetromino, zTetromino, tTetromino, oTetromino, iTetromino];

    let curretPosition = 4;
    let currentRotation = 0;

    //randomly select a Tetromino and its first rotation
    let random = Math.floor(Math.random()*theTetrominoes.length);
    let current = theTetrominoes[random][currentRotation];

    //draw the Tetromino
    function draw() {
        current.forEach(index => {
            squares[curretPosition + index].classList.add('tetromino')
        })
    };

    //undraw the Tetromino
    function undraw() {
        current.forEach(index => {
            squares[curretPosition + index].classList.remove('tetromino')
        })
    };

    //make move Tetromino move down every second
    timerId = setInterval(moveDown, 1000);

    //assign function to keyCodes
    function control(e) {
        if(e.keyCode === 37) {
            moveLeft();
        } else if (e.keyCode === 38) {
            //rotate()
        } else if (e.keyCode === 39) {
            moveRight()
        } else if (e.keyCode === 40) {
            moveDown();
        }
    };
    document.addEventListener('keyup', control)

    //move down function
    function moveDown() {
        undraw();
        curretPosition += width;
        draw();
        freeze();
    };

    //freeze function
    function freeze() {
        if(current.some(index => squares[curretPosition + index + width].classList.contains('taken'))) {
            current.forEach(index => squares[curretPosition + index].classList.add('taken'));
            //start a new Tetromino falling
            random = Math.floor(Math.random() * theTetrominoes.length);
            current = theTetrominoes[random][currentRotation];
            curretPosition = 4;
            draw();
        }
    };

    //move the Tetromino left, unless is at the edge or there is a blockage
    function moveLeft() {
        undraw();

        const isAtLeftEdge = current.some(index => (curretPosition + index) % width === 0);

        if(!isAtLeftEdge) curretPosition -= 1;

        if(current.some(index => squares[curretPosition + index].classList.contains('taken'))) {
            curretPosition += 1;
        };

        draw();
    };

    //move the Tetromino right, unless is at the edge or there is a blockage
    function moveRight() {
        undraw();

        const isAtRightEdge = current.some(index => (curretPosition + index) % width === width - 1);

        if(!isAtRightEdge) curretPosition += 1;

        if(current.some(index => squares[curretPosition + index].classList.contains('taken'))) {
            curretPosition -= 1;
        }

        draw();
    };

    

});