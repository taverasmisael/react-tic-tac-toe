import React from 'react';

import './GameConfigBar.css';

const GameConfigBar = ({currentPlayer, onResetGame, winner}) => (
  <header className="GameConfigBar">
    <div className="GameConfigBar__current-player">
      <span className="GameConfigBar__cururent-player__label">{ winner  ? 'El ganador es' : 'Es el turno de' }:</span>
      <span className={computeCurrentPlayerClasses(winner)}>{ currentPlayer }</span>
    </div>
    <div className="GameConfigBar__timer">
      <span>Tiempo</span>
      <span>{new Date().getUTCDate()}</span>
    </div>
    <button className="btn btn--big btn--warn" onClick={() => onResetGame()}>{winner ? 'Nueva Partida' : 'Reiniciar Partida'}</button>
  </header>
)
GameConfigBar.propTypes = {
  currentPlayer: React.PropTypes.string.isRequired,
  onResetGame: React.PropTypes.func.isRequired,
  winner: React.PropTypes.bool.isRequired,
}

function computeCurrentPlayerClasses(winner) {
  const baseClases = 'GameConfigBar__current-player__player';
  return winner ? `${baseClases} text--accent` : baseClases;
}
export default GameConfigBar;
