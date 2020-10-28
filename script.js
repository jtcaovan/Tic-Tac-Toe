const Player = (name, letter) => {
    const getName = () => name;
    const getLetter = () => letter;

    const createPlayerInfo = (playerOne, playerTwo, turn) => {
        let infoContainer = document.querySelector("#infoContainer");

        let playerOneName = document.createElement("p");
        playerOneName.classList.add("playerName")

        let playerTwoName = document.createElement("p");
        playerTwoName.classList.add("playerName")

        playerOneName.textContent = `${playerOne.getName()} is X`;
        playerTwoName.textContent = `${playerTwo.getName()} is O`;

        infoContainer.append(playerOneName, playerTwoName);
    }

    return {getName, getLetter, createPlayerInfo}
};

const game = (() => {
    // Control flow of game

    const startGame = () => {
        let playerContainer = document.querySelector("#playerContainer")
        let startButton = document.querySelector("#startButton");

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

            let turn = randomizeFirstTurn(playerOne,playerTwo);
            gameBoard.addLetter(playerOne,playerTwo, turn);
            displayTurn(turn);

            let createInfo = Player();
            createInfo.createPlayerInfo(playerOne, playerTwo)

            gameBoard.resetBoard(playerOne,playerTwo);

            playerContainer.style.display = 'none'
        })
    }  

    startGame();

    const displayTurn = (turn) => {
        let whoseTurn = document.createElement('p');
        whoseTurn.classList.add('playerName')
        whoseTurn.textContent = `It is ${turn}'s turn!`
        infoContainer.append(whoseTurn)
    }


    const randomizeFirstTurn = (playerOne,playerTwo) => {
        let turn = Math.floor(Math.random() * 2)
        if (turn === 0) {
            return `${playerOne.getName()}`
        } else {
            return `${playerTwo.getName()}`
        }
    }

    const checkForWinner = () => {

    }

    return {startGame}
})();

const gameBoard = (() => {
    // Populate Board and selected moves
    let boardSquare = document.querySelectorAll('.boardSquare');
    let board = ['','','','','','','','','',]

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
                }
                console.log(board);
            })
        }
    }

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

    displayBoard();

    return {displayBoard, addLetter, resetBoard};
})();