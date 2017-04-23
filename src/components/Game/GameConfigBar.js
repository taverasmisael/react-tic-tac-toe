import React from 'react';

import './GameConfigBar.css';

import { dynamicClass } from '../../functionality/helpers';

import ColorPicker from '../functional/ColorPicker';

const GameConfigBar = (
  {
    times,
    currentPlayer,
    onResetGame,
    winner,
    isVisible,
    onChangeColor,
    onSetVolume
  }
) => (
  <header
    className={dynamicClass(
      'GameConfigBar',
      ['GameConfigBar--visible'],
      isVisible
    )}
  >
    <div className="config-block color-picker">
      <h4 className="config-block__header">Configuración de Sonido</h4>
      <div className="config-block__content">
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          onChange={({ target }) => onSetVolume(target.value)}
        />
      </div>
    </div>
    <div className="config-block timer">
      <h4 className="config-block__header">Turno de {currentPlayer}</h4>
      <div className="config-block__content">{times[currentPlayer] + ' segs'}</div>
    </div>
    <div className="config-block color-picker">
      <h4 className="config-block__header">Color de Fondo</h4>
      <div className="config-block__content">
        <ColorPicker onChangeColor={color => onChangeColor(color)} />
      </div>
    </div>
    <div className="config-block reset-game">
      <button className="btn btn--big btn--warn" onClick={() => onResetGame()}>
        {winner ? 'Nueva Partida' : 'Reiniciar Partida'}
      </button>
    </div>
  </header>
);
GameConfigBar.propTypes = {
  currentPlayer: React.PropTypes.string.isRequired,
  onResetGame: React.PropTypes.func.isRequired,
  onChangeColor: React.PropTypes.func.isRequired,
  onSetVolume: React.PropTypes.func.isRequired,
  winner: React.PropTypes.bool.isRequired,
  times: React.PropTypes.object,
  isVisible: React.PropTypes.bool.isRequired
};

GameConfigBar.defaultProps = {
  times: {}
}

export default GameConfigBar;