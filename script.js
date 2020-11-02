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
    let resultText = document.querySelector('#resultText')
    let board = ['','','','','','','','','']
    let spacesTaken = [];

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
        let playerOneName = playerOne.getName();
        let playerTwoName = playerTwo.getName();

        for (i=0; i<boardSquare.length; i++) {
            boardSquare[i].index = i;
            boardSquare[i].addEventListener('click', (e) => {
                if (e.target.textContent !== '') {
                    e.target.classList.add("shake-horizontal")
                } else {
                    if (turn === playerOneName) {
                        e.target.textContent = playerOne.getLetter();
                        board.splice(e.target.index, 1, playerOne.getLetter())
                        spacesTaken.push(playerOne.getLetter())
                        turn = playerTwoName;
                    } else {
                        e.target.textContent = playerTwo.getLetter();
                        board.splice(e.target.index, 1, playerTwo.getLetter())
                        spacesTaken.push(playerTwo.getLetter())
                        turn = playerOneName;
                    }
                    game.displayTurn(turn);
                    checkForWin(playerOneName,playerTwoName);
                }
            })
        }
    }

    const checkForWin = (playerOneName,playerTwoName) => {
        let winner = null

        if (winRequirement(board[6],board[7],board[8])) {winner = board[6]}
        if (winRequirement(board[3],board[4],board[5])) {winner = board[3]}
        if (winRequirement(board[0],board[1],board[2])) {winner = board[0]}

        if (winRequirement(board[7],board[4],board[1])) {winner = board[7]}
        if (winRequirement(board[8],board[5],board[2])) {winner = board[8]}
        if (winRequirement(board[6],board[3],board[0])) {winner = board[6]}

        if (winRequirement(board[6],board[4],board[2])) {winner = board[6]}
        if (winRequirement(board[0],board[4],board[8])) {winner = board[0]}

        if (winner) {
            displayWinner(winner,playerOneName,playerTwoName);
        } else if (spacesTaken.length === 9 && winner === null) {
            displayTie();
        }
    }

    const displayWinner = (winner, playerOne, playerTwo) => {
        infoContainer.style.display = 'none';
        resultModal.style.display = 'block';
        if (winner === 'X') {
            resultText.textContent = `${playerOne} wins!`
        } else if (winner === 'O') {
            resultText.textContent = `${playerTwo} wins!`
        }
    }

    const displayTie = () => {
        infoContainer.style.display = 'none';
        resultModal.style.display = 'block';
        resultText.textContent = `It's a tie!`
    }

    const winRequirement = (a,b,c) => {
        return a === b && a === c && a !== '';
    }
    
    displayBoard();

    return {displayBoard, addLetter, resetBoard};
})();