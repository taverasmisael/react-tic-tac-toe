import React from 'react';

import './GameConfigBar.css';

const GameConfigBar = ({currentPlayer, onResetGame, winner, onChangeColor}) => (
  <header className="GameConfigBar">
    <div className="config-block current-player">
      <h4 className="config-block__header">{ winner  ? 'El ganador es' : 'Es el turno de' }:</h4>
      <div className={computeCurrentPlayerClasses(winner)}>{ currentPlayer }</div>
    </div>
    <div className="config-block color-picker">
      <h4 className="config-block__header">Configuración de Sonido</h4>
      <div className="config-block__content">
        <input type="range" min="0" max="1" step="0.1"/>
      </div>
    </div>
    <div className="config-block timer">
      <h4 className="config-block__header">Tiempo</h4>
      <div className="config-block__content">{new Date().getUTCDate()}</div>
    </div>
    <div className="config-block color-picker">
      <h4 className="config-block__header">Color de Fondo</h4>
      <div className="config-block__content">
        <button type="button" title="Usar Fondo Rojo" className="circle-color circle-color--red" onClick={() => onChangeColor('red')}></button>
        <button type="button" title="Usar Fondo Azul" className="circle-color circle-color--blue" onClick={() => onChangeColor('blue')}></button>
        <button type="button" title="Usar Fondo Verde" className="circle-color circle-color--green" onClick={() => onChangeColor('green')}></button>
        <button type="button" title="Usar Fondo Predeterminado" className="circle-color" onClick={() => onChangeColor('')}></button>
      </div>
    </div>
    <div className="config-block reset-game">
      <button className="btn btn--big btn--warn" onClick={() => onResetGame()}>{winner ? 'Nueva Partida' : 'Reiniciar Partida'}</button>
    </div>
  </header>
)
GameConfigBar.propTypes = {
  currentPlayer: React.PropTypes.string.isRequired,
  onResetGame: React.PropTypes.func.isRequired,
  onChangeColor: React.PropTypes.func.isRequired,
  winner: React.PropTypes.bool.isRequired,
}

export default GameConfigBar;

function computeCurrentPlayerClasses(winner) {
  const baseClases = 'config-block__content current-player__player';
  return winner ? `${baseClases} text--accent` : baseClases;
}
