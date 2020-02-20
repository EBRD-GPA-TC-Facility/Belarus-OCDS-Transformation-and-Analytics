import React     from 'react'
import PropTypes from 'prop-types'


const IconChart = props => <svg className={props.className}
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 30 30"
                                {...props}>
  <path
    d="M 22 4 C 21.448 4 21 4.448 21 5 L 21 26 L 27 26 L 27 5 C 27 4.448 26.552 4 26 4 L 22 4 z M 4 8 C 3.448 8 3 8.448 3 9 L 3 26 L 9 26 L 9 9 C 9 8.448 8.552 8 8 8 L 4 8 z M 13 12 C 12.448 12 12 12.448 12 13 L 12 26 L 18 26 L 18 13 C 18 12.448 17.552 12 17 12 L 13 12 z"
    fill={props.fill}
  />
</svg>

IconChart.propTypes = {
  className: PropTypes.string,
  fill: PropTypes.string,
}

IconChart.defaultProps = {
  fill: '#3D5056',
}

export default IconChart
