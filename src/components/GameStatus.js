import React from 'react';

import './GameStatus.css';

const GameStatus = ({currentPlayer, onResetGame}) => (
  <div className="GameStatus">
    <p className="current-player">Current Player: {currentPlayer}</p>
    <button class="btn btn--warn btn--big" onClick={() => onResetGame()}>Restart Game!</button>
  </div>
)
GameStatus.propTypes = {
  currentPlayer: React.PropTypes.string.isRequired,
  onResetGame: React.PropTypes.func.isRequired
}

export default GameStatus;
