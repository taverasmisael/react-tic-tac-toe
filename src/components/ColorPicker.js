import React from 'react';

import './ColorPicker.css';

let ColorOptions = [
  {
    title: 'Usar Fondo Rojo',
    className: ['circle-color', 'circle-color--red'],
    eventClass: 'red'
  }, {
    title: 'Usar Fondo Azul',
    className: ['circle-color', 'circle-color--blue'],
    eventClass: 'blue'
  }, {
    title: 'Usar Fondo Verde',
    className: ['circle-color', 'circle-color--green'],
    eventClass: 'green'
  }, {
    title: 'Usar Fondo Predeterminado',
    className: ['circle-color'],
    eventClass: ''
  }
];

export const ColorPicker = ({ onChangeColor }) => {
  function ColorSelected(id, color) {
    ColorOptions = ColorOptions.map((color, index) => {
      if(index === id) {
        return Object.assign({}, color, {className: [...color.className, 'circle-color--active']});
      }
      return Object.assign({}, color, {className: color.className.join(' ').split('circle-color--active')})
    })
    onChangeColor(color);
  }
  const buttonsColor = ColorOptions.map(({title, className, eventClass}, index) => (
    <button key={index} type="button" title={title} className={className.join(' ')} onClick={(event) => ColorSelected(index, eventClass)}></button>
  ))
  return (
    <div className="ColorPicker">
      { buttonsColor }
    </div>
  );
};

export default ColorPicker;

ColorPicker.propTypes = {
  onChangeColor: React.PropTypes.func.isRequired
};