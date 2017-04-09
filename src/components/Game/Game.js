import React from "react";

import GameBoard from "./GameBoard";
import GameStadistics from "../ui/GameStadistics";
import "./Game.css";

export const Game = ({winner, board, onSelectSquare, history, onResetScores}) => (
  <div className="Game">
    <GameBoard
      board={board}
      winner={winner}
      onSelectSquare={(square) => onSelectSquare(square)}
    />
    <GameStadistics onResetScores={() => onResetScores()} states={history} />
  </div>
);

Game.propTypes = {
  winner: React.PropTypes.array,
  board: React.PropTypes.array.isRequired,
  history: React.PropTypes.array.isRequired,
  onSelectSquare: React.PropTypes.func.isRequired,
}

export default Game;
