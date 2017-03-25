import React from "react";

import "./GamePlayerSelect.css";

import { dynamicClass } from '../../functionality/helpers'

export const GamePlayerSelect = ({ onPlayerSelect, isVisible }) => (
  <div className={dynamicClass('GamePlayerSelect', ['GamePlayerSelect--visible'], isVisible)}>
    <div className="GamePlayerSelect__container">
      <h1>Elegir al jugador 1</h1>
      <span className="flex--spandex" />
      <div className="GamePlayerSelect__selector">
        <button
          className="btn btn--big btn--success GamePlayerSelect__panel"
          onClick={() => onPlayerSelect("X")}
        >
          X
        </button>
        <button
          className="btn btn--big btn--success GamePlayerSelect__panel"
          onClick={() => onPlayerSelect("O")}
        >
          O
        </button>
      </div>
    </div>
  </div>
);

GamePlayerSelect.propTypes = {
  onPlayerSelect: React.PropTypes.func.isRequired,
  isVisible: React.PropTypes.bool.isRequired
};

export default GamePlayerSelect;
