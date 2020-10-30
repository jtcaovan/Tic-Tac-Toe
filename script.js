const Player = (name, letter) => {
    const getName = () => name;
    const getLetter = () => letter;

    const createPlayerInfo = (playerOne, playerTwo) => {
        let infoContainer = document.querySelector("#infoContainer");
        let playerOneName = document.querySelector("#playerOneName")
        let playerTwoName = document.querySelector("#playerTwoName")

        playerOneName.textContent = `${playerOne.getName()} is X`;
        playerTwoName.textContent = `${playerTwo.getName()} is O`;

        infoContainer.style.display = "flex";
    }

    return {getName, getLetter, createPlayerInfo}
};

const game = (() => {
    // Control flow of game

    const startGame = () => {
        let playerContainer = document.querySelector("#playerContainer")
        let startButton = document.querySelector("#startButton");
        let resetBoard =  document.querySelector("#resetButton");

        startButton.addEventListener('click', () => {
            let player1 = document.querySelector("#playerOne").value
            let player2 = document.querySelector("#playerTwo").value

                if (player1 === '') {
                    player1 = 'Player One'
                }
                if (player2 === '') {
                    player2 = 'Player Two'
                }
            let playerOne = Player(player1, 'X');
            let playerTwo = Player(player2, 'O');

            let createInfo = Player();
            createInfo.createPlayerInfo(playerOne, playerTwo)

            let turn = randomizeFirstTurn(playerOne,playerTwo);
            displayTurn(turn);

            gameBoard.addLetter(playerOne,playerTwo, turn);
            gameBoard.resetBoard(playerOne,playerTwo);

            playerContainer.style.display = 'none';
            resetBoard.style.display = 'inline-block';
        })
    }  

    const displayTurn = (turn) => {
        whoseTurn.textContent = `It is ${turn}'s turn!`
    }

    const displayWinner = () => {

    }

    const randomizeFirstTurn = (playerOne,playerTwo) => {
        let turn = Math.floor(Math.random() * 2)
        if (turn === 0) {
            return `${playerOne.getName()}`
        } else {
            return `${playerTwo.getName()}`
        }
    }

    startGame();

    return {startGame,displayTurn}
})();

const gameBoard = (() => {
    // Populate Board and selected moves
    let boardSquare = document.querySelectorAll('.boardSquare');
    let resultModal = document.querySelector('#resultModal')
    let board = ['','','','','','','','','',]

    const displayBoard = () => {
        for (let i = 0; i< board.length; i++) {
            boardSquare[i].textContent = board[i];
        }
    }

    const resetBoard = () => {
        let resetBoard = document.querySelector('#resetButton')
        resetBoard.addEventListener('click', () => {
           location.reload();
        })
    }

    const addLetter = (playerOne,playerTwo,turn) => {
        for (i=0; i<boardSquare.length; i++) {
            boardSquare[i].index = i;
            boardSquare[i].addEventListener('click', (e) => {
                if (e.target.textContent !== '') {
                    alert('Spot is taken!')
                } else {
                    if (turn === playerOne.getName()) {
                        e.target.textContent = playerOne.getLetter();
                        board.splice(e.target.index, 1, playerOne.getLetter())
                        turn = playerTwo.getName();
                    } else {
                        e.target.textContent = playerTwo.getLetter();
                        board.splice(e.target.index, 1, playerTwo.getLetter())
                        turn = playerOne.getName();
                    }
                    game.displayTurn(turn);
                    checkForWin();
                    // checkForTie();
                }
            })
        }
    }

    const checkForWin = () => {
        if (
            // horizontal
            board[6] === board[7] && board[6] === board[8] && board[6] !== '' ||
            board[3] === board[4] && board[3] === board[5] && board[3] !== '' ||
            board[0] === board[1] && board[0] === board[2] && board[0] !== '' ||
            // vertical 
            board[7] === board[4] && board[7] === board[1] && board[7] !== '' ||
            board[8] === board[5] && board[8] === board[2] && board[8] !== '' ||
            board[6] === board[3] && board[6] === board[0] && board[6] !== '' ||
            // diag
            board[6] === board[4] && board[6] === board[2] && board[6] !== '' ||
            board[0] === board[4] && board[0] === board[8] && board[0] !== '') {
                infoContainer.style.display = 'none';
                resultModal.style.display = 'block';
                // displayWinner();
                alert("Win")
        }
    }
    
    // const checkForTie = () => {
    //     if (board[i])
    // }
 
    displayBoard();

    return {displayBoard, addLetter, resetBoard, checkForWin};
})();