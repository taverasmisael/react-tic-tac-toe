import React from "react";
import PropTypes from 'prop-types'

import "./GameModeSelect.css";

import { dynamicClass } from '../../functionality/helpers'

export const GameModeSelect = ({ onModeSelect, isVisible }) => (
  <div className={dynamicClass('GameModeSelect', ['GameModeSelect--visible'], isVisible)}>
    <div className="GameModeSelect__container">
      <h1>Elegir al jugador 1</h1>
      <span className="flex--spandex" />
      <div className="GameModeSelect__selector">
        <button
          className="btn btn--big btn--success GameModeSelect__panel"
          onClick={() => onModeSelect(true)}
        >
          1 vs PC
        </button>
        <button
          className="btn btn--big btn--success GameModeSelect__panel"
          onClick={() => onModeSelect(false)}
        >
          1 vs 1
        </button>
      </div>
    </div>
  </div>
);

GameModeSelect.propTypes = {
  onModeSelect: PropTypes.func.isRequired,
  isVisible: PropTypes.bool.isRequired
};

export default GameModeSelect;
