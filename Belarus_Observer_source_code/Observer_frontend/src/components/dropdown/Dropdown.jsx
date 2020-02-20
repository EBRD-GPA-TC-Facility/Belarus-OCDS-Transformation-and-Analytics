import React from 'react'
import PropTypes from 'prop-types'
import Dropdown from 'react-dropdown'
import classNames from 'classnames'

import 'react-dropdown/style.css'

import './Dropdown.scss'

const DropdownMenu = ({ type, menuDirection, children, disabled, placeholder, options, onSelect, selectedOption }) => {
  const getDropdownMenuDirection = () => classNames({
    'direction-top': menuDirection === 'top',
    'direction-bottom': menuDirection === 'bottom',
  })
  const getClassNames = () => classNames({
    'with-icon': children,
  })
  const getControlClassName = () => classNames({
    'Dropdown-field': type === 'field',
    'Dropdown-text': type === 'text',
  })
  return (
    <div className="Dropdown-container">
      {children && <div className="Dropdown-icon">{children}</div>}
      <Dropdown
        className={getClassNames()}
        menuClassName={getDropdownMenuDirection()}
        controlClassName={getControlClassName()}
        disabled={disabled}
        placeholder={placeholder}
        options={options}
        onChange={onSelect}
        value={selectedOption}
      />
    </div>
  )
}

DropdownMenu.propTypes = {
  type: PropTypes.oneOf(['field', 'text']).isRequired,
  menuDirection: PropTypes.oneOf(['top', 'bottom']),
  disabled: PropTypes.bool,
  placeholder: PropTypes.string,
  options: PropTypes.array.isRequired,
  onSelect: PropTypes.func.isRequired,
  selectedOption: PropTypes.object,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
}

DropdownMenu.defaultProps = {
  disabled: false,
  placeholder: '',
  menuDirection: 'bottom',
}

export default DropdownMenu
