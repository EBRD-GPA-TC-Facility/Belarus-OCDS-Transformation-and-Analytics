import React     from 'react'
import PropTypes from 'prop-types'

import './SlideArrow.scss'


class SlideArrow extends React.PureComponent {
  static propTypes = {
    onClick: PropTypes.func,
  }

  handleClick = () => {
    this.props.onClick()
  }

  render() {
    return <svg className={'slide-arrow'}
                onClick={this.handleClick}
                width="64"
                height="64"
                viewBox="0 0 64 64"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
      <circle cx="32" cy="32" r="32" fill="white" />
      <path d="M32 13V46M32 46L45 33M32 46L19 33" stroke="#C2C2C2" />
    </svg>
  }
}

export default SlideArrow
