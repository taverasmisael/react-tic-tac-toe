import React from 'react';

import './GameBoard.css'

const GameBoard = ({board, winner, onSelectSquare}) => {
  const BoardSquares = board.map((square, index) => {
    const squareClass = winner.findIndex(el => el === index) >= 0 ? 'square square--winner' : 'square'
    return (<div key={index} onClick={() => onSelectSquare(index)} className={squareClass}>{square}</div>)
  });
  return (        
    <div className="board">
      { BoardSquares }
    </div>
  )
}

GameBoard.propTypes = {
  board: React.PropTypes.array.isRequired,
  winner: React.PropTypes.array.isRequired,
  onSelectSquare: React.PropTypes.func.isRequired
}
export default GameBoard;
