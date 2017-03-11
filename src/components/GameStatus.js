import React from 'react';

import './GameStatus.css';

const GameStatus = ({currentPlayer, onResetGame, winner}) => (
  <div className="GameStatus">
    <p className="GameStatus__current-player">
      <span className="GameStatus__cururent-player__label">{ winner  ? 'El ganador es' : 'Es el turno de' }:</span>
      <span className={computeCurrentPlayerClasses(winner)}>{ currentPlayer }</span>
    </p>
    <button className="btn btn--big btn--warn">{winner ? 'Nueva Partida' : 'Reiniciar Partida'}</button>
  </div>
)
GameStatus.propTypes = {
  currentPlayer: React.PropTypes.string.isRequired,
  onResetGame: React.PropTypes.func.isRequired,
  winner: React.PropTypes.bool.isRequired,
}

function computeCurrentPlayerClasses(winner) {
  const baseClases = 'GameStatus__current-player__player';
  return winner ? `${baseClases} text--success` : baseClases;
}
export default GameStatus;
