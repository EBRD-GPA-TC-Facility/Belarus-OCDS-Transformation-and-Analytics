import React     from 'react'
import PropTypes from 'prop-types'


const IconInfo = props => <svg className={props.className}
                               xmlns="http://www.w3.org/2000/svg"
                               viewBox="0 0 24 24"
                               version="1.1"
                               {...props}>
  <g id="surface1">
    <path d="M 12 0 C 5.925781 0 1 4.476563 1 10 C 1 15.523438 5.925781 20 12 20 L 12 24 C 12 24 23 18.640625 23 10 C 23 4.476563 18.074219 0 12 0 Z M 13.222656 15.125 L 10.777344 15.125 L 10.777344 8.160156 L 13.222656 8.160156 Z M 12.003906 6.199219 C 10.679688 6.199219 10.671875 5.222656 10.671875 4.996094 C 10.671875 4.765625 10.671875 3.800781 12.003906 3.800781 C 13.339844 3.800781 13.335938 4.765625 13.335938 4.996094 C 13.335938 5.222656 13.328125 6.199219 12.003906 6.199219 Z "
          fill={props.fill}
    />
  </g>
</svg>

IconInfo.propTypes = {
  className: PropTypes.string,
  fill: PropTypes.string,
}

IconInfo.defaultProps = {
  fill: '#3D5056',
}

export default IconInfo
