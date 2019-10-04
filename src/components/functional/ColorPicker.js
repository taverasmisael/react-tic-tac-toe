import React from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'

import './ColorPicker.css'

const COLOR_OPTIONS = [
  {
    title: 'Usar Fondo Oscuro',
    className: 'circle-color circle-color--dark',
    eventClass: 'dark',
  },
  {
    title: 'Usar Fondo Rojo',
    className: 'circle-color circle-color--red',
    eventClass: 'red',
  },
  {
    title: 'Usar Fondo Azul',
    className: 'circle-color circle-color--blue',
    eventClass: 'blue',
  },
  {
    title: 'Usar Fondo Verde',
    className: 'circle-color circle-color--green',
    eventClass: 'green',
  },
  {
    title: 'Usar Fondo Predeterminado',
    className: 'circle-color',
    eventClass: '',
  },
]

const ColorPicker = ({ onChangeColor, currentColor }) => (
  <div className="ColorPicker">
    {COLOR_OPTIONS.map(({ title, className, eventClass }, index) => (
      <button
        key={index}
        type="button"
        title={title}
        className={classnames(className, {
          'circle-color--active': currentColor === eventClass,
        })}
        onClick={() => onChangeColor(eventClass)}
      ></button>
    ))}
  </div>
)

export default ColorPicker

ColorPicker.propTypes = {
  onChangeColor: PropTypes.func.isRequired,
}
