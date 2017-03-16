import React from 'react'
import './About.css'

export const FAB = ({onClick, text}) => (
  <button className="FAB" type="button" onClick={() => onClick()}>
    {text}
  </button>
)

export default FAB;

FAB.propTypes = {
  onClick: React.PropTypes.func.isRequired,
  text: React.PropTypes.string.isRequired
}
