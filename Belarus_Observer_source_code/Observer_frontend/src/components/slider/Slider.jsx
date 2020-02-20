import React, { PureComponent } from 'react'
import PropTypes                from 'prop-types'

import './Slider.scss'
import { generate }             from 'shortid'


class Slider extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      activeIndex: 1,
    }
  }

  handlePrevSlide = () => {
    this.setState({
                    activeIndex: this.state.activeIndex - 1,
                  })
    if (this.state.activeIndex === 1) {
      this.setState({
                      activeIndex: this.state.activeIndex + this.props.content.length - 1,
                    })
    }
  }

  handleNextSlide = () => {
    this.setState({
                    activeIndex: this.state.activeIndex + 1,
                  })
    if (this.state.activeIndex === this.props.content.length) {
      this.setState({
                      activeIndex: this.state.activeIndex - this.props.content.length + 1,
                      left: 0,
                    })
    }
  }

  handleClickIndicator = (e) => {
    this.setState({
                    activeIndex: parseInt(e.target.textContent),
                  })
  }

  render() {
    return (
      <div className="slider">
        <div className="slider-wrapper">
          <button className="prev-button" onClick={this.handlePrevSlide} />
          <div className="slider-content">
            {
              this.props.content.map((item, i) => {
                return (
                  <div key={generate()}
                       className={i + 1 === this.state.activeIndex ? 'slider-item' : 'hide'}>{item}</div>
                )
              })
            }
          </div>
          <button className="next-button" onClick={this.handleNextSlide} />
        </div>
        <div className="indicators-wrapper">
          {/*<ul className="indicators">*/}
            {/*{this.props.content.map((item, index) => {*/}
              {/*return (*/}
                {/*<li className={index + 1 === this.state.activeIndex ? 'active-indicator' : ''}*/}
                    {/*key={generate()}*/}
                    {/*onClick={this.handleClickIndicator}>*/}
                  {/*{index + 1}*/}
                {/*</li>*/}
              {/*)*/}
            {/*})*/}
            {/*}*/}
          {/*</ul>*/}
        </div>
      </div>
    )
  }
}

Slider.propTypes = {
  content: PropTypes.array,
}

Slider.defaultProps = {}

export default Slider
