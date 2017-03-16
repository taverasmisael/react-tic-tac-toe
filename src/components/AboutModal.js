import React from 'react';
import './AboutModal.css';

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
          <table>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Matrícula</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>MisaelTaveras</td>
                <td>13-EIST-1-017</td>
              </tr>
              <tr>
                <td>Elvis Vanderpool</td>
                <td>13-EIST-1-058</td>
              </tr>
              <tr>
                <td>Odani Eustaqui</td>
                <td>13-MISM-1-075</td>
              </tr>
              <tr>
                <td>Kelvin Maria Matos</td>
                <td>11-SISN-1-107</td>
              </tr>
            </tbody>
          </table>
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
