import React from 'react';

import './GameConfigBar.css';

const GameConfigBar = ({currentPlayer, onResetGame, winner}) => (
  <header className="GameConfigBar">
    <div className="config-block current-player">
      <span className="config-block__header">{ winner  ? 'El ganador es' : 'Es el turno de' }:</span>
      <span className={computeCurrentPlayerClasses(winner)}>{ currentPlayer }</span>
    </div>
    <div className="config-block color-picker">
      <span className="config-block__header">Configuración de Sonido</span>
      <span className="config-block__content">{new Date().getUTCDate()}</span>
    </div>
    <div className="config-block timer">
      <span className="config-block__header">Tiempo</span>
      <span className="config-block__content">{new Date().getUTCDate()}</span>
    </div>
    <div className="config-block color-picker">
      <span className="config-block__header">Color de Fondo</span>
      <span className="config-block__content">{new Date().getUTCDate()}</span>
    </div>
    <button className="btn btn--big btn--warn" onClick={() => onResetGame()}>{winner ? 'Nueva Partida' : 'Reiniciar Partida'}</button>
  </header>
)
GameConfigBar.propTypes = {
  currentPlayer: React.PropTypes.string.isRequired,
  onResetGame: React.PropTypes.func.isRequired,
  winner: React.PropTypes.bool.isRequired,
}

export default GameConfigBar;

function computeCurrentPlayerClasses(winner) {
  const baseClases = 'config-block__content current-player__player';
  return winner ? `${baseClases} text--accent` : baseClases;
}
