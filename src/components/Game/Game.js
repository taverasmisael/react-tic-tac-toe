import React from 'react'
import PropTypes from 'prop-types'

import GameBoard from './GameBoard'
import GameStadistics from '../ui/GameStadistics'
import './Game.css'

export const Game = ({
  winner,
  board,
  onSelectSquare,
  history,
  onResetScores,
}) => (
  <div className="Game">
    <GameBoard
      board={board}
      winner={winner}
      onSelectSquare={square => onSelectSquare(square)}
    />
    <GameStadistics onResetScores={() => onResetScores()} states={history} />
  </div>
)

Game.propTypes = {
  winner: PropTypes.array,
  board: PropTypes.array.isRequired,
  history: PropTypes.array.isRequired,
  onSelectSquare: PropTypes.func.isRequired,
}

export default Game
