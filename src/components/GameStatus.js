import React from 'react';

import './GameStatus.css';

const GameStatus = ({currentPlayer, onResetGame}) => (
  <div className="GameStatus">
    <p className="GameStatus__current-player">
      <span className="GameStatus__cururent-player__label">Es el turno de:</span>
      <span className="GameStatus__current-player__player">{ currentPlayer }</span>
    </p>
    <button className="btn btn--warn btn--big" onClick={() => onResetGame()}>Reiniciar Partida</button>
  </div>
)
GameStatus.propTypes = {
  currentPlayer: React.PropTypes.string.isRequired,
  onResetGame: React.PropTypes.func.isRequired
}

export default GameStatus;
