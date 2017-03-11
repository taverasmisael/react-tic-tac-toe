import React from "react";

import "./GameBoard.css";

const GameBoard = ({ board, winner, onSelectSquare }) => {
  const BoardSquares = board.map((square, index) => (
    <div
      key={index}
      onClick={() => onSelectSquare(index)}
      className={generateSquareClass(winner, index)}
    >
      {square}
    </div>
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
