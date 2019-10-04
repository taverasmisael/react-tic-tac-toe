import React from 'react'
import PropTypes from 'prop-types'

import './GameStadistics.css'

export const GameStadistics = ({ states, onResetScores }) => (
  <div className="GameStadistics">
    <table>
      <thead>
        <tr>
          <th>Pos.</th>
          <th>Ganador</th>
          <th>
            Tiempo <small>(segs)</small>
          </th>
          <th>Puntaje</th>
          <th>
            <button
              className="btn btn--circle btn--warn"
              title="Borrar Puntajes"
              onClick={() => onResetScores()}
            >
              <i className="material-icons">delete_sweep</i>
            </button>
          </th>
        </tr>
      </thead>
      <tbody>{generateTable(states)}</tbody>
    </table>
  </div>
)

export default GameStadistics

GameStadistics.propTypes = {
  states: PropTypes.array.isRequired,
  onResetScores: PropTypes.func.isRequired,
}
GameStadistics.defaultProps = {
  states: [],
}

/**
 *
 * @param {Array<{winner: String, time: Number, score: Number}>} states
 */
function generateTable(states) {
  return states.map((state, index) => (
    <tr key={index} className="t-row--centered">
      <td>{index + 1}</td>
      <td>{state.winner}</td>
      <td>{state.time}</td>
      <td colSpan="2">{state.score}</td>
    </tr>
  ))
}
