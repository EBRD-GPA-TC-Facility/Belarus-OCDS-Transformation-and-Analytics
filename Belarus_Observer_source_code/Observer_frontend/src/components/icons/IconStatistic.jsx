import React     from 'react'
import PropTypes from 'prop-types'


const IconStatistic = props => <svg className={props.className}
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="17"
                                    height="16"
                                    viewBox="0 0 17 16"
                                    fill="none">
  <path
    d="M7.39128 0V1.23188H1.84782C0.832481 1.23188 0 2.06436 0 3.0797V10.471C0 11.4863 0.832481 12.3188 1.84782 12.3188H7.39128V13.6758L2.48301 14.797L2.75248 16L8.00722 14.8018L13.262 16L13.5314 14.797L8.62316 13.6758V12.3188H14.1666C15.182 12.3188 16.0144 11.4863 16.0144 10.471V3.0797C16.0144 2.06436 15.182 1.23188 14.1666 1.23188H8.62316V0H7.39128ZM1.84782 2.46376H14.1666C14.5131 2.46376 14.7826 2.73323 14.7826 3.0797V10.471C14.7826 10.8174 14.5131 11.0869 14.1666 11.0869H1.84782C1.50135 11.0869 1.23188 10.8174 1.23188 10.471V3.0797C1.23188 2.73323 1.50135 2.46376 1.84782 2.46376ZM11.0917 3.97474L7.97835 6.96782L5.52421 4.94196L2.51188 7.70887L3.33955 8.61353L5.56271 6.57323L8.03609 8.61353L11.1447 5.63008L12.6893 6.93895L13.4881 5.99579L11.0917 3.97474Z"
    fill={props.fill} />
</svg>

IconStatistic.propTypes = {
  className: PropTypes.string,
  fill: PropTypes.string,
}

IconStatistic.defaultProps = {
  fill: '#3D5056',
}

export default IconStatistic
