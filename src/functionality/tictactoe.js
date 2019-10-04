import GameHistory from './history'

export const PLAYER_ONE_SYMBOL = 'X'
export const PLAYER_TWO_SYMBOL = 'O'

export const createBoard = () => Array(9).fill('')

export const CurrentSquareAvailable = square => square === ''

/**
 * This function recieve a Board Array and returns a new Board Array with the move applied
 * @param {Array<String>} board The Board an Array with a length of 9
 * @param {Number} index The position in the board where the move will be placed
 * @param {String} player The symbol will be placed in this position
 * @returns {Array<String>} The new Board with the move include
 */
export const MakeMove = (board, index, player) => {
  return CurrentSquareAvailable(board[index])
    ? board.map((square, idx) => (idx === index ? player : square))
    : board
}

/**
 * This function will switch between returning the oposite player for the one passed
 * @param {String} player
 * @returns {String} the oposite player to the one passed
 */
export const SwitchPlayers = player => {
  return player === PLAYER_ONE_SYMBOL ? PLAYER_TWO_SYMBOL : PLAYER_ONE_SYMBOL
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
    [2, 4, 6],
  ]

  return winningCombos.find(combo => {
    if (
      board[combo[0]] === board[combo[1]] &&
      board[combo[1]] === board[combo[2]]
    ) {
      return board[combo[0]]
    } else {
      return false
    }
  })
}

/**
 * This functions return an array filled with the index of LegalMoves in the passed board
 * @param {Array<String>} board The board in wich we'll search the available moves
 */
export const LegalMoves = board =>
  board.reduce((prev, curr, i) => (!curr ? [...prev, i] : prev), [])

/**
 * This function recieve a String Array and returns the ammount of moves remaining on this board
 * @param {Array<String>} board This is the board where we are going to check for available moves
 * @returns {number}
 */
export const RemainingMoves = board => LegalMoves(board).length

/**
 * This function takes a Board and Evaluates it if is a winned board and calculates
 * the available moves and the remainings. Based on these  variables it assigns a value to the current
 * board given the highest score to a wining board and a 0 to a lose one. The total score depends if
 * the table is won, raw or lose and on each case (except if it's lose) it calculates based on the
 * remainingMoves
 * @param {Array<string>} board This is the board wich we want to obtain the value
 */
export const RateBoard = board => {
  const winner = CheckForWinner(board)
  const availableMoves = RemainingMoves(board)
  let result
  if (winner) {
    result = 10 + availableMoves
  } else if (availableMoves) {
    result = -10 + availableMoves
  } else {
    result = 0
  }
  return result
}

const GameOver = board => CheckForWinner(board) || !RemainingMoves(board)

function MinScenario(board, player, depth) {
  if (GameOver(board) || !depth) {
    return RateBoard(board)
  }
  let bestScenario = Number.NEGATIVE_INFINITY
  const availableMoves = LegalMoves(board)
  const nextPlayer = SwitchPlayers(player)

  for (let move of availableMoves) {
    const scenario = MinScenario(
      MakeMove(board, move, nextPlayer),
      nextPlayer,
      depth - 1
    )
    bestScenario = scenario > bestScenario ? move : bestScenario
  }

  return bestScenario
}

export const PlayAI = (board, depth, player) => {
  if (CheckForWinner(board)) return RateBoard(board)
  const bestMove = MinScenario(board, player, depth)
  return bestMove
}

/**
 * This function creates a brand new State with the core parts of the Tic tac toe game
 * And let you pass over any extra members you need in your state
 * @param {Object} extras all extra options you need on your game
 */
export const GameState = extras => ({
  PLAYER_ONE_SYMBOL,
  PLAYER_TWO_SYMBOL,
  currentTurn: PLAYER_ONE_SYMBOL,
  board: createBoard(),
  winner: undefined,
  history: new GameHistory(),
  vsComputer: true,
  gameStarted: false,
  times: {
    [PLAYER_ONE_SYMBOL]: 0,
    [PLAYER_TWO_SYMBOL]: 0,
  },
  ...extras,
})
