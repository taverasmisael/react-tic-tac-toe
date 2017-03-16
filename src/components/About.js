import React from 'react'
import './About.css'

export const AboutModal = ({isVisible, onClose}) => (
  <div className={`AboutModal ${isVisible ? 'AboutModal--is-visible' : ''}`}>
    <h2>¿Cómo jugar?</h2>
    <div className="AboutModal__instructions">
      Instrucciones
    </div>
  </div>
)

export default AboutModal;

AboutModal.propTypes = {
  isVisible: React.PropTypes.bool.isRequired,
  onClose: React.PropTypes.func.isRequired
}

AboutModal.defaultProps = {
  isVisible: false
};
