import React from "react";

import "./GameBoard.css";

const GameBoard = ({ board, winner, onSelectSquare }) => {
  const BoardSquares = board.map((square, index) => (
    <button type="button"
      aria-label={`Cuadro ${index + 1}. Valor: ${square || 'Ninguno'}`}
      key={index}
      onClick={() => onSelectSquare(index)}
      className={generateSquareClass(winner, index)}
    >
      <div className="container">
        <div className="wrapper">
          <div className="content">
            {square}
          </div>
        </div>
      </div>
    </button>
  ));
  return (
    <div className="GameBoard">
      {BoardSquares}
    </div>
  );
};

GameBoard.propTypes = {
  winner: React.PropTypes.array,
  board: React.PropTypes.array.isRequired,
  onSelectSquare: React.PropTypes.func.isRequired
};

const positionClasses = [
  'GameBoard__square--top GameBoard__square--left', 'GameBoard__square--top GameBoard__square--middle', 'GameBoard__square--top GameBoard__square--right',
  'GameBoard__square--center GameBoard__square--left', 'GameBoard__square--center GameBoard__square--middle', 'GameBoard__square--center GameBoard__square--right',
  'GameBoard__square--bottom GameBoard__square--left', 'GameBoard__square--bottom GameBoard__square--middle', 'GameBoard__square--bottom GameBoard__square--right',
]

function generateSquareClass(winner, index) {
  const baseClass = 'GameBoard__square'
  const posClass = positionClasses[index]
  const fullClass = `${baseClass} ${posClass}`
  return winner && winner.findIndex(el => el === index) >= 0
    ? `${fullClass} ${baseClass}--winner`
    : fullClass;
}
export default GameBoard;
