import React from 'react'
import PropTypes from 'prop-types'

import './FAB.css'

export const FAB = ({ children, ...props }) => (
  <button className="FAB btn btn--circle btn--accent" type="button" {...props}>
    {children}
  </button>
)

export default FAB

FAB.propTypes = {
  onClick: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
}
