import React, { Component } from 'react'
import PropTypes            from 'prop-types'
import * as classnames      from "classnames"

import './Loader.scss'


export default class Loader extends Component {

  static propTypes = {
    isActive: PropTypes.bool,
    theme: PropTypes.oneOf([
      'light',
      'dark',
    ]),
  }

  static defaultProps = {
    isActive: false,
    theme: 'dark',
  }

  render() {
    return <div className={
      classnames(
        'loader-container',
        this.props.isActive ? 'active' : 'hidden',
        this.props.theme === 'light' ? 'loader-light' : 'loader-dark',
      )}>
      <span className="loader-inner" />
    </div>
  }
}
