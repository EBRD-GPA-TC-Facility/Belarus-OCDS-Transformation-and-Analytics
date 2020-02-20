import React from 'react'

import './Divider.scss'

const Divider = props => {
  const { ...styles } = props
  return <div className="divider" style={styles} />
}

export default Divider
