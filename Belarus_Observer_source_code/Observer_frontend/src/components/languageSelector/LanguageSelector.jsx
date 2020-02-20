import React, {Fragment} from 'react'
import PropTypes from 'prop-types'

import 'react-dropdown/style.css'

import './LanguageSelector.scss'

const LanguageSelector = ({type, menuDirection, children, disabled, placeholder, options, onSelect, selectedOption}) => {
  return (
    <div className="languages-container">
      {options.map((item, index) => {
        return <Fragment><span className={'lang-option ' + (item.value === selectedOption.value ? 'active' : '')}
                               onClick={() => onSelect(item)}>
          {item.label}
        </span>
          {index !== options.length-1?'|':''}
        </Fragment>
      })}
    </div>
  )
}

LanguageSelector.propTypes = {
  options: PropTypes.array.isRequired,
  onSelect: PropTypes.func.isRequired,
  selectedOption: PropTypes.object
}

LanguageSelector.defaultProps = {
  disabled: false,
  placeholder: '',
  menuDirection: 'bottom',
}

export default LanguageSelector
