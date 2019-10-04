import React, { useState } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import './GameConfigBar.css'

import ColorPicker from '../functional/ColorPicker'

const GameConfigBar = ({
  times,
  currentPlayer,
  onResetGame,
  winner,
  onChangeColor,
}) => {
  const [headerVisible, setHeaderVisible] = useState(false)
  const toggleHeader = () => setHeaderVisible(state => !state)
  return (
    <>
      <header
        className={classnames('GameConfigBar', {
          'GameConfigBar--visible': headerVisible,
        })}
      >
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
          <button
            className="btn btn--big btn--warn"
            onClick={() => onResetGame()}
          >
            {winner ? 'Nueva Partida' : 'Reiniciar Partida'}
          </button>
        </div>
      </header>
      <button
        onClick={toggleHeader}
        type="button"
        className={classnames('hamburger-menu', {
          'hamburger-menu--open': headerVisible,
        })}
      >
        <span className="hamburger-menu__line" />
        <span className="hamburger-menu__line" />
        <span className="hamburger-menu__line" />
      </button>
    </>
  )
}
GameConfigBar.propTypes = {
  currentPlayer: PropTypes.string.isRequired,
  onResetGame: PropTypes.func.isRequired,
  onChangeColor: PropTypes.func.isRequired,
  winner: PropTypes.bool.isRequired,
  times: PropTypes.object,
}

GameConfigBar.defaultProps = {
  times: {},
}

export default GameConfigBar
