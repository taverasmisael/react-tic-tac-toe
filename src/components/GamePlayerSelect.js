import React from "react";

import "./GamePlayerSelect.css";

export const GamePlayerSelect = ({ onPlayerSelect }) => (
  <div className="GamePlayerSelect">
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
  onPlayerSelect: React.PropTypes.func.isRequired
};

export default GamePlayerSelect;
