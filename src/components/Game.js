import React from "react";

import GameBoard from "./GameBoard";
import "./Game.css";

export const Game = ({winner, board, onSelectSquare}) => (
  <div className="Game">
    <GameBoard
      board={board}
      winner={winner}
      onSelectSquare={(square) => onSelectSquare(square)}
    />
  </div>
);

Game.propTypes = {
  winner: React.PropTypes.array,
  board: React.PropTypes.array.isRequired,
  onSelectSquare: React.PropTypes.func.isRequired,
}

export default Game;
