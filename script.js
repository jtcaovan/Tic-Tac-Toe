const game = (() => {
    // Control the flow of the game
    // checkIfSpaceTaken();
    // checkForWinner();
})();



const gameBoard = (() => {
    // Populate Board and selected moves
    let boardSquare = document.querySelectorAll('.boardSquare');

    const board = [
        'x','x','x',
        'x','x','x',
        'x','x','x',
    ]

    const displayBoard = () => {
        for (let i = 0; i< board.length; i++) {
            boardSquare[i].textContent = board[i];
        }
    }
    displayBoard();

    return {displayBoard};
})();



const Player = (name, letter) => {
    // Create new players
    const getName = () => name;
    const getLetter = () => letter;

    return {getName, getLetter}
}

// const john = Player('John', 'X')
// console.log(john.getName());

