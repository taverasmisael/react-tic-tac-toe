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
      {square}
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

function generateSquareClass(winner, index) {
  const baseClase = "GameBoard__square";
  return winner && winner.findIndex(el => el === index) >= 0
    ? `${baseClase} ${baseClase}--winner`
    : baseClase;
}
export default GameBoard;
