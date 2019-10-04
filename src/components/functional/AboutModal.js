import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import './AboutModal.css'

import AboutTable from '../ui/AboutTable'

import { members } from '../../data/info.json'

const AboutModal = props => {
  useEffect(() => {
    const handleKeyPress = ({ keyCode }) => {
      if (keyCode === 27 && props.isVisible) props.onClose()
    }
    document.addEventListener('keyup', handleKeyPress)
    return () => document.removeEventListener('keyup', handleKeyPress)
  })

  return (
    <div
      className={classnames('AboutModal', {
        'AboutModal--is-visible': props.isVisible,
      })}
    >
      <h1 className="AboutModal__title">Acerca de</h1>
      <button
        className="btn btn--transparent btn--circle AboutModal__btn-close"
        type="button"
        onClick={() => props.onClose()}
      >
        X
      </button>
      <div className="AboutModal__content">
        <div className="AboutModal__content__block">
          <h2 className="AboutModal__content_title">¿Cómo jugar?</h2>
          <div className="AboutModal__instructions">
            <p>
              Es un juego entre dos jugadores: <em>X</em> y <em>O</em>, que
              marcan los espacios de un tablero de 3×3 alternadamente. Un
              jugador gana si consigue tener una línea de tres de sus símbolos:{' '}
              <strong>
                la línea puede ser horizontal, vertical o diagonal.{' '}
              </strong>
              Elige el simbolo de jugador 1, y empieza una partida. ¡Suerte!
            </p>
          </div>
        </div>
        <div className="AboutModal__content__block">
          <h2 className="AboutModal__content_title">Desarrolladores</h2>
          <div className="AboutModal__instructions">
            <AboutTable members={members} />
          </div>
        </div>
      </div>
    </div>
  )
}

AboutModal.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
}

export default AboutModal
