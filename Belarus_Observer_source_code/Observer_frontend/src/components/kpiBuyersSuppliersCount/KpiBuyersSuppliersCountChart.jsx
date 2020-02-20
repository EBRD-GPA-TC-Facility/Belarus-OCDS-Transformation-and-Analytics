import React, { Component } from 'react'
import PropType             from 'prop-types'
import ReactHighcharts      from "react-highcharts"
import { generate }         from "shortid"
import _                    from "lodash"
import Highcharts           from "highcharts"
import * as numeral         from "numeral"


const DEFAULT_CART_CONFIG = {
  chart: {
    height: 200,
  },
  title: {
    align: 'left',
    margin: 0,
    x: 30,
  },
  credits: {
    enabled: false,
  },
  legend: {
    enabled: false,
  },
  xAxis: {
    crosshair: true,
  },
  yAxis: {
    title: {
      text: null,
    },
    labels: {
      formatter: function () {
        return numeral(this.value).format('0 a')
      },
    },
  },
  series: [
    {
      data: [],
      type: "areaspline",
    },
  ],
}

export default class KpiBuyersSuppliersCountChart extends Component {

  static contextTypes = {
    intl: PropType.object,
  }

  static propTypes = {
    data: PropType.oneOfType([
      PropType.object,
      PropType.array,
    ]),
    title: PropType.string,
  }

  state = {
    buyersId: `buyers-count-l`,
    suppliersId: `suppliers-count-l`,
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return !_.isEqual(nextProps.data, this.props.data)
  }

  prepareChartConfig = props => {
    const { intl } = this.context
    const clonedData = _.cloneDeep(props.data)
    let config = _.cloneDeep(DEFAULT_CART_CONFIG)
    config.xAxis.categories = _.map(clonedData.dates, 'date')
    return {
      getBuyerConfig: () => {
        config.title.text = intl.formatMessage({id: 'page.statistic.text.006'})
          config.series[ 0 ].color = "#81C78480"
        config.series[ 0 ].name = intl.formatMessage({id: 'page.statistic.text.006'})
        config.series[ 0 ].data = _.map(clonedData.dates, item => {
          return item.buyers.count
        })
        return config
      },
      getSupplierConfig: () => {
        config.title.text = intl.formatMessage({id: 'page.statistic.text.007'})
        config.series[ 0 ].color = "#64B5F680"
        config.series[ 0 ].name = intl.formatMessage({id: 'page.statistic.text.007'})
        config.series[ 0 ].data = _.map(clonedData.dates, item => {
          return item.suppliers.count
        })
        return config
      },
    }
  }

  handleMouseMove = (e) => {
    let event1 = this.refs[ this.state.suppliersId ].chart.pointer.normalize(e) // Find coordinates within the chart
    let point1 = this.refs[ this.state.suppliersId ].chart.series[ 0 ].searchPoint(event1, true) // Get the hovered point
    if (point1) {
      point1.onMouseOver() // Show the hover marker
      this.refs[ this.state.suppliersId ].chart.tooltip.refresh(point1) // Show the tooltip
      this.refs[ this.state.suppliersId ].chart.xAxis[ 0 ].drawCrosshair(e, point1) // Show the crosshair
    }

    let event2 = this.refs[ this.state.buyersId ].chart.pointer.normalize(e) // Find coordinates within the chart
    let point2 = this.refs[ this.state.buyersId ].chart.series[ 0 ].searchPoint(event2, true) // Get the hovered point
    if (point2) {
      point2.onMouseOver() // Show the hover marker
      this.refs[ this.state.buyersId ].chart.tooltip.refresh(point2) // Show the tooltip
      this.refs[ this.state.buyersId ].chart.xAxis[ 0 ].drawCrosshair(e, point2) // Show the crosshair
    }
  }

  render() {
    return <div className="chart-mobile-header">
      <h4>{this.props.title}</h4>
      <div onMouseMove={this.handleMouseMove}>
        <ReactHighcharts
          key={generate()}
          config={this.prepareChartConfig(this.props).getBuyerConfig()}
          id={this.state.buyersId}
          ref={this.state.buyersId}
        />
      </div>
      <div onMouseMove={this.handleMouseMove}>
        <ReactHighcharts
          key={generate()}
          config={this.prepareChartConfig(this.props).getSupplierConfig()}
          id={this.state.suppliersId}
          ref={this.state.suppliersId}
        />
      </div>
    </div>
  }
}
