import React from 'react'
import './FAB.css'

export const FAB = ({onClick, text, title}) => (
  <button title={title} className="FAB btn btn--circle btn--accent" type="button" onClick={() => onClick()}>
    {text}
  </button>
)

export default FAB;

FAB.propTypes = {
  onClick: React.PropTypes.func.isRequired,
  text: React.PropTypes.string.isRequired,
  title: React.PropTypes.string.isRequired
}
