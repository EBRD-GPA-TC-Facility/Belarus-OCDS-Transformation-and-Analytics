import React                from 'react'
import PropTypes            from 'prop-types'
import { NavLink }          from 'react-router-dom'

import './NavItem.scss'
import { FormattedMessage } from "react-intl"
import * as classnames      from "classnames"


class NavItem extends React.Component {
  state = {
    isActive: window.location.pathname === this.props.location,
  }

  render() {
    const className = this.state.isActive ? 'active' : ''
    const handleItemOnClick = () => this.props.onItemClick(this.props.to, window.location.pathname)
    return (
      <div
        className={classnames('nav-item', className)}
        onClick={handleItemOnClick}
      >
        <NavLink to={this.props.to}>
          {this.props.icon && this.props.icon}
          <span><FormattedMessage id={this.props.label} /></span>
        </NavLink>
      </div>
    )
  }
}

NavItem.contextTypes = {
  router: PropTypes.object.isRequired,
}

NavItem.propTypes = {
  to: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  active: PropTypes.PropTypes.bool,
  icon: PropTypes.object,
  onItemClick: PropTypes.func,
  location: PropTypes.string,
}

NavItem.defaultProps = {
  active: false,
}

export default NavItem
