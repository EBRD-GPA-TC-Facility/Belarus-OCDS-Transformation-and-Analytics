import React     from 'react'
import PropTypes from 'prop-types'


const IceTradeIcon = props => <svg className={props.className} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="8" cy="8" r="7.625" stroke={props.fill} strokeWidth="0.75"/>
  <rect x="7" y="6.5" width="2" height="6" fill={props.fill}/>
  <path d="M4 6.5V6.5C5.10457 6.5 6 7.39543 6 8.5V12.5H4V6.5Z" fill={props.fill}/>
  <rect x="2" y="6.5" width="2" height="2" fill={props.fill}/>
  <rect width="2" height="2" transform="matrix(1 0 0 -1 7 5.5)" fill={props.fill}/>
  <rect width="2" height="2" transform="matrix(1 0 0 -1 4 5.5)" fill={props.fill}/>
  <rect width="2" height="2" transform="matrix(1 0 0 -1 10 5.5)" fill={props.fill}/>
  <rect x="12" y="6.5" width="2" height="2" fill={props.fill}/>
  <path d="M10 12.5H12V6.5V6.5C10.8954 6.5 10 7.39543 10 8.5V12.5Z" fill={props.fill}/>
</svg>


IceTradeIcon.propTypes = {
  className: PropTypes.string,
  fill: PropTypes.string,
}

IceTradeIcon.defaultProps = {
  fill: '#3D5056',
}

export default IceTradeIcon
