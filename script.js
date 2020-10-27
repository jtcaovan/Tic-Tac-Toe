const Player = (name, letter) => {
    const getName = () => name;
    const getLetter = () => letter;

    const createPlayerInfo = (playerOne, playerTwo) => {
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

        // grab player names and letter
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

            playerContainer.style.display = 'none'
            currentTurn(playerOne, playerTwo);
        })
    }  

    const randomizeFirstTurn = (playerOne,playerTwo) => {
        let turn = Math.floor(Math.random() * 2)
        if (turn === 0) {
            return `${playerOne.getName()}`
        } else {
            return `${playerTwo.getName()}`
        }
    }

    const currentTurn = (playerOne,playerTwo) => {
            let turn = randomizeFirstTurn(playerOne,playerTwo);
            let whoseTurn = document.createElement('p');
            whoseTurn.textContent = `It is ${turn}'s turn!`
            infoContainer.append(whoseTurn)
        }

    const checkIfSpaceTaken = () => {

    }

    const checkForWinner = () => {

    }

    startGame();
    return {startGame}
})();

const gameBoard = (() => {
    // Populate Board and selected moves
    let boardSquare = document.querySelectorAll('.boardSquare');

    let board = ['','','','','','','','','',]

    const addLetter = () => {
        for (i=0; i<boardSquare.length; i++) {
            boardSquare[i].index = i;
            
            boardSquare[i].addEventListener('click', (e) => {
                if (turn === "playerOne") {
                    e.target.textContent = playerOne;
                    board.splice(e.target.index, 1, playerOne)
                } else {
                    e.target.textContent = playerTwo;
                    board.splice(e.target.index, 1, playerTwo)
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

    // const resetBoard = () => {

    // }

    displayBoard();
    addLetter();

    return {displayBoard, addLetter};
})();