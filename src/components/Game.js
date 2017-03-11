import React from "react";

import GameBoard from "./GameBoard";
import GameStatus from "./GameStatus";
import "./Game.css";

export const Game = ({winner, board, currentTurn, onSelectSquare, onResetGame}) => (
  <div className="Game">
    <GameBoard
      board={board}
      winner={winner}
      onSelectSquare={(square) => onSelectSquare(square)}
    />
    <GameStatus
      winner={Boolean(winner)}
      currentPlayer={currentTurn}
      onResetGame={() => onResetGame()}
    />
  </div>
);

Game.propTypes = {
  winner: React.PropTypes.array,
  board: React.PropTypes.array.isRequired,
  currentTurn: React.PropTypes.string.isRequired,
  onSelectSquare: React.PropTypes.func.isRequired,
  onResetGame: React.PropTypes.func.isRequired,
}

export default Game;
