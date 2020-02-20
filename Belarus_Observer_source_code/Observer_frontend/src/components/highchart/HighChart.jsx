import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Highcharts from 'highcharts'

export default class HighChart extends Component {

  componentDidMount(props, state) {
    const container = React.createElement('div', { id: this.props.id });
    ReactDOM.render(container, ReactDOM.findDOMNode(this), () => {
      const config = this.props.config
      if (this.props.type === 'polar') {
        config.chart.height = this.refs['chart-container'].offsetWidth
      }
      this.chart = Highcharts.chart(this.props.id, config)
    })
  }

  componentWillUnmount() {
    this.chart.destroy()
  }

  resize = fullscreen => {
    const container = this.refs['chart-container']
    setTimeout(() => this.chart.setSize(
      null,
      (fullscreen ? container.offsetHeight : this.props.config.chart.height),
      false
    ), 1)
  }

  update = () => {
    setTimeout(() => this.chart = Highcharts.chart(
      this.props.id,
      Object.assign({}, this.props.config, {
          chart: Object.assign({},
            this.props.config.chart, {
              height: this.chart.chartHeight
            })
        }
      )
    ), 1)
  }

  render() {
    return <div className="chart-container" ref="chart-container" style={{width: '100%', height:'100%' }}/>
  }
}

HighChart.defaultProps = {
  type: 'default'
}
