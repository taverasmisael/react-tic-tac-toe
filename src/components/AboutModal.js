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
        <h2>¿Cómo jugar?</h2>
        <div className="AboutModal__instructions">
          Instrucciones
        </div>
      </div>
      <div className="AboutModal__content__block">
        <h2>Sobre los Programadores</h2>
        <div className="AboutModal__instructions">
          Nombres
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
