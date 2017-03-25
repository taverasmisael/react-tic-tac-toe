import React from 'react';
import './AboutModal.css';

import AboutTable from './AboutTable'
const members = require('../data/info.json').members

export const AboutModal = ({ isVisible, onClose }) => (
  <div className={`AboutModal ${isVisible ? 'AboutModal--is-visible' : ''}`}>
    <h1 className="AboutModal__title">Acerca de</h1>
    <button
      className="btn btn--transparent btn--circle AboutModal__btn-close"
      type="button"
      onClick={() => onClose()}
    >
      X
    </button>
    <div className="AboutModal__content">
      <div className="AboutModal__content__block">
        <h2 className="AboutModal__content_title">¿Cómo jugar?</h2>
        <div className="AboutModal__instructions">
          <p>
            Es un juego entre dos jugadores: <em>X</em> y <em>O</em>, que marcan los espacios de un tablero de 3×3 alternadamente.
            Un jugador gana si consigue tener una línea de tres de sus símbolos: <strong>la línea puede ser horizontal, vertical o diagonal.</strong>
          </p>
          <p>Elige el simbolo de jugador 1, y empieza una partida. ¡Suerte!</p>
        </div>
      </div>
      <div className="AboutModal__content__block">
        <h2 className="AboutModal__content_title">Desarrolladores</h2>
        <div className="AboutModal__instructions">
          <AboutTable members={members}></AboutTable>
        </div>
      </div>
    </div>
  </div>
);

export default AboutModal;

AboutModal.propTypes = {
  isVisible: React.PropTypes.bool.isRequired,
  onClose: React.PropTypes.func.isRequired
};

AboutModal.defaultProps = {
  isVisible: false
};
