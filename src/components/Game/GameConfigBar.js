import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import './GameConfigBar.css'

import ColorPicker from '../functional/ColorPicker'

const GameConfigBar = ({
  times,
  currentPlayer,
  onResetGame,
  winner,
  isVisible,
  onChangeColor,
  onSetVolume,
}) => (
  <header
    className={classnames('GameConfigBar', {
      'GameConfigBar--visible': isVisible,
    })}
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
      <div className="config-block__content">
        {times[currentPlayer] + ' segs'}
      </div>
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
)
GameConfigBar.propTypes = {
  currentPlayer: PropTypes.string.isRequired,
  onResetGame: PropTypes.func.isRequired,
  onChangeColor: PropTypes.func.isRequired,
  onSetVolume: PropTypes.func.isRequired,
  winner: PropTypes.bool.isRequired,
  times: PropTypes.object,
  isVisible: PropTypes.bool.isRequired,
}

GameConfigBar.defaultProps = {
  times: {},
}

export default GameConfigBar
