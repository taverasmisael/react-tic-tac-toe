import { eq } from './helpers';

const SCORES = [500, 20, 10, 5]

export const PLAYER_ONE_SYMBOL = 'X';
export const PLAYER_TWO_SYMBOL = 'O';

export function Board() {
  return ['', '', '', '', '', '', '', '', ''];
}

export const CurrentSquareAvailable = square => square === '';

/**
 * This function recieve a Board Array and returns a new Board Array with the move applied
 * @param {Array<String>} board The Board an Array with a length of 9
 * @param {Number} index The position in the board where the move will be placed
 * @param {String} player The symbol will be placed in this position
 * @returns {Array<String>} The new Board with the move include
 */
export const MakeMove = (board, index, player) => {
  return CurrentSquareAvailable(board[index])
    ? board.map((square, idx) => eq(idx, index) ? player : square)
    : board;
}

/**
 * This function will switch between returning the oposite player for the one passed
 * @param {String} player
 * @returns {String} the oposite player to the one passed
 */
export const SwitchPlayers = player => {
  return eq(player, PLAYER_ONE_SYMBOL) ? PLAYER_TWO_SYMBOL : PLAYER_ONE_SYMBOL;
}

/**
 * This function checks if any `winningCombo` is present in the board passed as parameter
 * @param {Array} board
 * @returns {Array<Number>|false}
 */
export const CheckForWinner = board => {
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
};

/**
 * This functions return an array filled with the index of LegalMoves in the passed board
 * @param {Array<String>} board The board in wich we'll search the available moves
 */
export const LegalMoves = board => board.reduce((prev, curr, i) => !curr ? [...prev, i] : prev, []);

/**
 * This function recieve a String Array and returns the ammount of moves remaining on this board
 * @param {Array<String>} board This is the board where we are going to check for available moves
 * @returns {number}
 */
export const RemainingMoves = board => LegalMoves(board).length;


const RateBoard = (board) => {
  const winner = CheckForWinner(board);
  const availableMoves = RemainingMoves(board);
  let result;
  if (winner) {
    result = 10 + availableMoves;
  } else if (availableMoves){
    result = -10 + availableMoves
  } else {
    result = 0
  }
  return result;
}

const GameOver = (board) => CheckForWinner(board) || !RemainingMoves(board);

function MinScenario(board, player, depth) {
  if(GameOver(board) || !depth) {
    return RateBoard(board);
  }
  let bestScenario = Number.NEGATIVE_INFINITY;
  const availableMoves = LegalMoves(board);
  const nextPlayer = SwitchPlayers(player)
  const NextScenario = nextPlayer === PLAYER_TWO_SYMBOL ? MaxScenario : MinScenario
  for (let move of availableMoves) {
    const scenario = NextScenario(MakeMove(board, move, nextPlayer), nextPlayer, depth -1)
    bestScenario = scenario > bestScenario ? move : bestScenario;
  }


  return bestScenario
}

function MaxScenario(board, player, depth) {
  if(GameOver(board) || !depth) {
    return RateBoard(board);
  }
  let bestScenario = Number.NEGATIVE_INFINITY;
  const availableMoves = LegalMoves(board);
  const nextPlayer = SwitchPlayers(player)
  const NextScenario = nextPlayer === PLAYER_TWO_SYMBOL ? MaxScenario : MinScenario
  for (let move of availableMoves) {
    const scenario = NextScenario(MakeMove(board, move, nextPlayer), nextPlayer, depth -1)
    bestScenario = scenario > bestScenario ? move : bestScenario;
  }


  return bestScenario
}

export const PlayAI = (board, depth, player) => {
  if(CheckForWinner(board)) return RateBoard(board);
  const availableMoves = LegalMoves(board);
  const bestMove =  MinScenario(board, player, 2);
  return bestMove
}

/**
 * This function return an history entry calculating the score based on time, board
 * and some multiplier. If the time === 0 you get the max score
 * @param {String} winner The symbol of the winner player
 * @param {Array<String>} board The current board in the moment the game is over
 * @param {Number} time The ammount of time the winner player took to win
 * @returns {{winner: String, time: Number, score: Number}} this is the HistoryEntry
 */
export const GenerateHistory = (winner, board, time) => {
  const multipler = time / 5 <= 3 ? Math.round(time / 5) : 3
  const base = SCORES[multipler]
  const BoardScore = RateBoard(board)
  let score = BoardScore * base;
  return {
    winner,
    time,
    score
  }
}

/**
 * This function creates a brand new State with the core parts of the Tic tac toe game
 * And let you pass over any extra members you need in your state
 * @param {Object} extras all extra options you need on your game
 */
export const GameState = (extras) => Object.assign({}, {
  PLAYER_ONE_SYMBOL,
  PLAYER_TWO_SYMBOL,
  currentTurn: PLAYER_ONE_SYMBOL,
  board: new Board(),
  winner: undefined,
  history: [],
  times: {
    [PLAYER_ONE_SYMBOL]: 0,
    [PLAYER_TWO_SYMBOL]: 0,
  }
}, extras)
