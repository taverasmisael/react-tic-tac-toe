import React, { Component } from 'react';
import './AboutModal.css';

import AboutTable from '../ui/AboutTable';
const members = require('../../data/info.json').members;

export default class AboutModal extends Component {
  render() {
    return (
      <div
        className={
          `AboutModal ${this.props.isVisible ? 'AboutModal--is-visible' : ''}`
        }
      >
        <h1 className="AboutModal__title">Acerca de</h1>
        <button
          className="btn btn--transparent btn--circle AboutModal__btn-close"
          type="button"
          onClick={() => this.props.onClose()}
        >
          X
        </button>
        <div className="AboutModal__content">
          <div className="AboutModal__content__block">
            <h2 className="AboutModal__content_title">¿Cómo jugar?</h2>
            <div className="AboutModal__instructions">
              {gameInstructions()}
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
    );
  }
  componentDidMount() {
    document.addEventListener('keyup', ({ keyCode }) => {
      if (keyCode === 27 && this.props.isVisible) this.props.onClose();
    });
  }
}


AboutModal.propTypes = {
  isVisible: React.PropTypes.bool.isRequired,
  onClose: React.PropTypes.func.isRequired
};

AboutModal.defaultProps = {
  isVisible: false
};


function gameInstructions() {
  return (
    <p>
      Es un juego entre dos jugadores: <em>X</em> y <em>O</em>, que marcan los espacios de un tablero de 3×3 alternadamente. Un jugador gana si consigue tener una línea de tres de sus símbolos: <strong> la línea puede ser horizontal, vertical o diagonal. </strong> Elige el simbolo de jugador 1, y empieza una partida. ¡Suerte!
    </p>
  );
}
