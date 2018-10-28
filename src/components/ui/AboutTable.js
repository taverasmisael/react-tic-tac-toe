import React from 'react';
import PropTypes from 'prop-types'

import './AboutTable.css'

export const AboutTable = ({ members }) => (
  <table className="AboutTable">
    <thead>
      <tr>
        <th />
        <th>Nombre</th>
        <th>Matrícula</th>
      </tr>
    </thead>
    <tbody>
      {generateMembersCells(members)}
    </tbody>
  </table>
);

export default AboutTable;

AboutTable.propTypes = {
  members: PropTypes.array
}

AboutTable.defaultProps = {
  members: []
}

function generateMembersCells(members) {
  return members.map(member => (
    <tr key={member.registration}>
      <td>
        <img className="img--circular img--responsive profile-pic" src={member.image} alt={member.name} />
      </td>
      <td>{member.name}</td>
      <td>{member.registration}</td>
    </tr>
  ));
}
