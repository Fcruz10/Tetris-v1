document.addEventListener('DOMContentLoaded', () => {

    const grid = document.querySelector('.grid');
    const scoreDisplay = document.querySelector('#score');
    const startButton = document.querySelector('#start-button');
    const width = 10;
    
    let squares = Array.from(document.querySelectorAll('.grid div'));
    let nextRandom = 0;
    let timerId;
    let score = 0;

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
    // timerId = setInterval(moveDown, 1000);

    //assign function to keyCodes
    function control(e) {
        if(e.keyCode === 37) {
            moveLeft();
        } else if (e.keyCode === 38) {
            rotate()
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
            random = nextRandom;
            nextRandom = Math.floor(Math.random() * theTetrominoes.length);

            current = theTetrominoes[random][currentRotation];
            curretPosition = 4;

            draw();

            displayShape();

            addScore();
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

    //rotate the Tetromino
    function rotate() {
        undraw();

        currentRotation ++

        //if current rotation gets to 4
        if(currentRotation === current.length){
            //makes go back to 0
            currentRotation = 0;
        }
        current = theTetrominoes[random][currentRotation];

        draw();
    }
    //show up-next Tetromino in mini-grid
    const displaySquares = document.querySelectorAll('.mini-grid div');
    const displayWidth = 4;
    let displayIndex = 0;

    //the Tetrominos without rotations
    const upNextTetrominoes = [
        //LTetromino
        [1, displayWidth + 1, displayWidth * 2 + 1, 2],
        //zTetromino
        [0, displayWidth, displayWidth + 1, displayWidth * 2 + 1],
        //tTetromino
        [1, displayWidth, displayWidth + 1, displayWidth + 2],
        //oTetromino
        [0, 1, displayWidth, displayWidth + 1],
        //iTetromino
        [1, displayWidth + 1, displayWidth * 2 + 1, displayWidth * 3 + 1],
    ];

    //display the shape in the mini-grid display
    function displayShape() {
        //remove any trace of a tetromino from the entire grid
        displaySquares.forEach(square => {
            square.classList.remove('tetromino')
        })

        upNextTetrominoes[nextRandom].forEach( index => {
            displaySquares[displayIndex + index].classList.add('tetromino')
        })
    };

    //add functionality of the button
    startButton.addEventListener('click', () => {
        if (timerId) {
            clearInterval(timerId)
            timerId = null
        } else {
            draw();
            
            timerId = setInterval(moveDown, 1000);

            nextRandom = Math.floor(Math.random() * theTetrominoes.length);

            displayShape();
        }
    });

    //add score
    function addScore () {
        for ( let i = 0; i < 199; i += width ) {
            const row = [ i, i+1, i+2, i+3, i+4,i+5, i+6, i+7, i+8, i+9 ];

            if(row.every(index => squares[index].classList.contains('taken'))) {

                score += 10;
                scoreDisplay.innerHTML = score;

                row.forEach(index => {
                    squares[index].classList.remove('taken');
                    squares[index].classList.remove('tetromino');
                });

                const squaresRemoved = squares.splice(i, width);
                squares = squaresRemoved.concat(squares);
                squares.forEach(cell => grid.appendChild(cell));

            };
        };
    };


});