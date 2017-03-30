import React from 'react';

import './GameStadistics.css';

export const GameStadistics = ({states}) => (
  <div className="GameStadistics">
    <table>
    <thead>
      <tr>
        <th>Partida</th>
        <th>Ganador</th>
        <th>Tiempo</th>
        <th>Puntaje</th>
      </tr>
    </thead>
    <tbody>
      {generateTable(states)}
    </tbody>
  </table>
  </div>
);

export default GameStadistics;

GameStadistics.propTypes = {
  states: React.PropTypes.array.isRequired
}
GameStadistics.defaultProps = {
  states: []
}

/**
 *
 * @param {Array<{winner: String, time: Number, score: Number}>} states
 */
function generateTable(states) {
  return states.map((state, index) => (
    <tr key={index} className="t-row--centered">
      <td>{index}</td>
      <td>{state.winner}</td>
      <td>{state.time}</td>
      <td>{state.score}</td>
    </tr>
  ))
}
