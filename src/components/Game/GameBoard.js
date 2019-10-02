import React, { memo } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import './GameBoard.css'

const GameBoard = memo(({ board, winner, onSelectSquare }) => {
  const BoardSquares = board.map((square, index) => (
    <button
      type="button"
      aria-label={`Cuadro ${index + 1}. Valor: ${square || 'Ninguno'}`}
      key={index}
      onClick={() => onSelectSquare(index)}
      className={generateSquareClass(winner, index)}
    >
      <div className={`content content-color--${square.toLowerCase()}`}>
        {square}
      </div>
    </button>
  ))
  return (
    <div className="GameBoard">
      <div className="GameBoard__content">{BoardSquares}</div>
    </div>
  )
})

GameBoard.propTypes = {
  winner: PropTypes.array,
  board: PropTypes.array.isRequired,
  onSelectSquare: PropTypes.func.isRequired,
}

const positionClasses = [
  'GameBoard__square--top GameBoard__square--left',
  'GameBoard__square--top GameBoard__square--middle',
  'GameBoard__square--top GameBoard__square--right',
  'GameBoard__square--center GameBoard__square--left',
  'GameBoard__square--center GameBoard__square--middle',
  'GameBoard__square--center GameBoard__square--right',
  'GameBoard__square--bottom GameBoard__square--left',
  'GameBoard__square--bottom GameBoard__square--middle',
  'GameBoard__square--bottom GameBoard__square--right',
]

function generateSquareClass(winner, index) {
  return classnames(`GameBoard__square ${positionClasses[index]}`, {
    'GameBoard__square--winner':
      winner && winner.findIndex(el => el === index) >= 0,
  })
}
export default GameBoard
