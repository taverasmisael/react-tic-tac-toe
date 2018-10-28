import React from 'react'
import PropTypes from 'prop-types'

import './FAB.css'

export const FAB = ({onClick, text, title}) => (
  <button title={title} className="FAB btn btn--circle btn--accent" type="button" onClick={() => onClick()}>
    {text}
  </button>
)

export default FAB;

FAB.propTypes = {
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
}
