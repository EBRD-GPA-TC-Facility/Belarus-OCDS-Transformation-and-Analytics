import React     from 'react'
import PropTypes from 'prop-types'

import './ReadMoreTable.sass'


export class ReadMoreTable extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      fullValue: props.value,
      liteValue: props.value.slice(0, props.charLimit-1),
      opened: false,
    }
  }

  static propTypes = {
    value: PropTypes.string.isRequired,
    charLimit: PropTypes.number,
  }

  static defaultProps = {
    value: '',
    charLimit: 100
  }

  handleClickReadMore = () => {
    this.setState({
      opened: !this.state.opened,
    })
  }

  render() {
    if (this.props.value.length > this.props.charLimit)
      return <div
        className="d-flex flex-column hidder-elem"
        onClick={this.handleClickReadMore}
      >
        {this.state.opened && this.state.fullValue}
        {!this.state.opened && <div>{this.state.liteValue}<span className="three-points"> ...</span></div>}
      </div>
    return <div>
      {this.state.fullValue}
    </div>
  }
}
