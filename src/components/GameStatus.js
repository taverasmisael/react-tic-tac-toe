import React from 'react';

const GameStatus = ({currentPlayer, onResetGame}) => (
  <div className="game-status">
    <p className="current-player">Current Player: {currentPlayer}</p>
    <button onClick={() => onResetGame()}>Restart Game!</button>
  </div>
)
GameStatus.propTypes = {
  currentPlayer: React.PropTypes.string.isRequired,
  onResetGame: React.PropTypes.func.isRequired
}

export default GameStatus;
