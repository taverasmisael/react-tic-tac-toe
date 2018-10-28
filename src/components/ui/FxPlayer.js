import React, { forwardRef } from 'react'
import PropTypes from 'prop-types'

const AUDIOFX_DIR = 'assets/audio/fx/'
export const FxPlayer = forwardRef(({ mediaSrc, mediaType }, ref) => (
  <audio
    ref={ref}
    preload="metadata"
    src={AUDIOFX_DIR + mediaSrc}
    type={`audio/${mediaType || 'mp3'}`}
  />
))

FxPlayer.propTypes = {
  mediaSrc: PropTypes.string.isRequired,
  mediaType: PropTypes.string,
}

export default FxPlayer
