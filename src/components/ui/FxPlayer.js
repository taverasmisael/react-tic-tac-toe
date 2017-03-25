import React from 'react';
const AUDIOFX_DIR = 'assets/audio/fx/';
export const FxPlayer = ({mediaSrc, mediaType}) => (
  <audio id="FXPlayer" src={AUDIOFX_DIR + mediaSrc} type={`audio/${mediaType || 'mp3'}`} />
);

FxPlayer.propTypes = {
  mediaSrc: React.PropTypes.string.isRequired,
  mediaType: React.PropTypes.string,
}

export default FxPlayer;
