import React     from 'react'
import PropTypes from 'prop-types'


const IconHome = props => <svg className={props.className}
                               xmlns="http://www.w3.org/2000/svg"
                               width="18"
                               height="16"
                               viewBox="0 0 18 16"
                               fill="none">
  <path
    d="M8.61539 0L0 8.59643L0.797806 9.52311L1.57269 8.74923V16H15.6581V8.74923L16.433 9.52311L17.2308 8.59643L13.3105 4.68269V0.85767H12.1367V3.50955L8.61539 0ZM8.61539 1.71534L14.4843 7.58102V14.7381H10.963V8.42883H6.26782V14.7381H2.74647V7.58102L8.61539 1.71534ZM7.4416 9.6907H9.78917V14.7381H7.4416V9.6907Z"
    fill={props.fill} />
</svg>

IconHome.propTypes = {
  className: PropTypes.string,
  fill: PropTypes.string,
}

IconHome.defaultProps = {
  fill: '#3D5056',
}

export default IconHome
