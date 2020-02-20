import React, { Component } from 'react'
import PropTypes            from 'prop-types'
import ReactHighcharts      from "react-highcharts"
import _                    from "lodash"
import { generate }         from "shortid"
import Highcharts           from 'highcharts/highcharts'

import './BuyersAvgContractsCharts.scss'


export default class BuyersAvgContractsCharts extends Component {
  static contextTypes = {
    intl: PropTypes.object,
  }

  static propTypes = {
    data: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object,
    ]),
    title: PropTypes.string,
  }
  static defaultProps = {}

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return !_.isEqual(nextProps.data, this.props.data)
  }

  getChartConfig = props => {
    const { intl } = this.context
    const DEFAULT_CONFIG = {
      chart: {
        height: 400,
      },
      title: { text: '' },
      xAxis: [
        {
          categories: [],
          crosshair: true,
        },
      ],
      yAxis: [
        {
          labels: {
            format: '{value:,.0f}',
            style: {
              color: '#639b65',
            },
          },
          title: {
            text: intl.formatMessage({ id: 'page.statistic.text.009' }),
            style: {
              color: '#639b65',
            },
          },
        },
        {
          gridLineWidth: 0,
          title: {
            text: intl.formatMessage({ id: 'page.statistic.text.010' }),
            style: {
              color: '#64B5F6',
            },
          },
          labels: {
            format: '{value:,.0f}',
            style: {
              color: '#64B5F6',
            },
          },
          opposite: true,
        },
        {
          gridLineWidth: 0,
          format: '{value:,.0f}',
          title: {
            text: intl.formatMessage({ id: 'page.statistic.text.011' }),
            style: {
              color: '#495865',
            },
          },
          labels: {
            style: {
              color: '#495865',
            },
          },
          opposite: true,
        },

      ],
      tooltip: {
        shared: true,
      },
      series: [ {
        name: intl.formatMessage({ id: 'page.statistic.text.009' }),
        type: 'column',
        color: '#81C78480',
        borderColor: '#81C784',
        yAxis: 0,
        tooltip: {
          valueSuffix: '',
        },
        data: [],
      }, {
        name: intl.formatMessage({ id: 'page.statistic.text.010' }),
        type: 'spline',
        color: '#64B5F6',
        yAxis: 1,
        data: [],
        marker: {
          enabled: false,
        },
        dashStyle: 'shortdot',
        tooltip: {
          pointFormat: '<span style="color:{point.color}">●</span> {series.name}: <b>{point.y:,.2f} ' + intl.formatMessage({id: 'page.contractsCustomer.text.1.1'}) + ' </b><br/>',
        },
      }, {
        name: intl.formatMessage({ id: 'page.statistic.text.011' }),
        type: 'spline',
        color: '#495865',
        data: [],
        yAxis: 2,
        tooltip: {
          pointFormat: '<span style="color:{point.color}">●</span> {series.name}: <b>{point.y:,.2f} ' + intl.formatMessage({id: 'common.byn.text'}) + '</b><br/>',
        },
      } ],
      credits: {
        enabled: false,
      },
    }
    const clonedData = _.cloneDeep(props.data)
    let config = _.cloneDeep(DEFAULT_CONFIG)

    config.xAxis[ 0 ].categories = _.map(clonedData.dates, 'date')
    config.series[ 0 ].data = _.map(clonedData.dates, item => {
      return item.buyers.count
    })
    config.series[ 1 ].data = _.map(clonedData.dates, item => {
      return item.contracts.avgCount.perBuyer
    })
    config.series[ 2 ].data = _.map(clonedData.dates, item => {
      return item.contracts.avgAmount.perBuyer
    })

    return config
  }

  render() {
    return <div className="d-flex flex-column chart-mobile-header">
      <h4>{this.props.title}</h4>
      <ReactHighcharts
        key={generate()}
        config={this.getChartConfig(this.props)}
        id={`${this.props.name}${generate()}`}
        ref={`${this.props.name}${generate()}`}
      />
    </div>
  }
}
