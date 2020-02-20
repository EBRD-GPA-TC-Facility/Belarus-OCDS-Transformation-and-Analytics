import React      from 'react'
import PropTypes  from 'prop-types'
import classnames from 'classnames'

import './Card.scss'


const Card = props => <div className={props.className}>
  <div className={classnames('Card', props.cardFluid && 'padding-none', props.cardClass)}>
    {props.children}
  </div>
</div>

Card.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.array, PropTypes.object, PropTypes.string,
  ]),
  className: PropTypes.string,
  cardClass: PropTypes.string,
  cardFluid: PropTypes.bool,
}

export default Card
