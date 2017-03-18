import { eq, notIdentity } from './helpers'

export const PLAYER_ONE_SYMBOL = 'X'
export const PLAYER_TWO_SYMBOL = 'O'

export function Board() {
  return ["", "", "", "", "", "", "", "", ""]
}

export const CurrentSquareAvailable = (square) => square === '';

/**
 * This function recieve a Board Array and returns a new Board Array with the move applied
 * @param {Array<String>} board The Board an Array with a length of 9
 * @param {Number} index The position in the board where the move will be placed
 * @param {String} player The symbol will be placed in this position
 * @returns {Array<String>} The new Board with the move include
 */
export const MakeMove = (board, index, player) =>
  CurrentSquareAvailable(board[index]) ? board.map((square, idx) => eq(idx, index) ? player : square) : board;

/**
 * This function will switch between returning the oposite player for the one passed
 * @param {String} player
 * @returns {String} the oposite player to the one passed
 */
export const SwitchPlayers = (player) =>
  eq(player, PLAYER_ONE_SYMBOL) ? PLAYER_TWO_SYMBOL : PLAYER_ONE_SYMBOL;

 /**
 * This function checks if any `winningCombo` is present in the board passed as parameter
 * @param {Array} board
 * @returns {Array<Number>|false}
 */
export const CheckForWinner = (board) => {
  const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  return winningCombos.find(combo => {
    if (
      eq(board[combo[0]], board[combo[1]]) &&
      eq(board[combo[1]], board[combo[2]])
    ) {
      return board[combo[0]];
    } else {
      return false;
    }
  });
}

/**
 * This function recieve a String Array and returns the ammount of moves remaining on this board
 * @param {Array<String>} board This is the board where we are going to check for available moves
 * @returns {number}
 */
export const RemainingMoves = (board) =>
  board.filter(notIdentity).length;
