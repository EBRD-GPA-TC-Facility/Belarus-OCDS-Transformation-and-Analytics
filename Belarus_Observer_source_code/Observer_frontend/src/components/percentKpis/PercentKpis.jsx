import React, { Component } from 'react'
import PropTypes            from 'prop-types'


export default class PercentKpis extends Component {

  static propTypes = {
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    title: PropTypes.string,
  }

  render() {
    return (
      <div>

      </div>
    )
  }
}
