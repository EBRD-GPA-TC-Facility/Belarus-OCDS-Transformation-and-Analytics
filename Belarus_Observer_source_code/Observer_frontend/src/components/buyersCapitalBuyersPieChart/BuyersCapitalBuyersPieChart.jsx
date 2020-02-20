import React, { Component } from 'react'
import PropTypes            from 'prop-types'
import ReactHighcharts      from "react-highcharts"
import * as _               from 'lodash'
import Loader               from "../loader/Loader"
import { formatMessage }    from 'react-intl/src/format'


export default class BuyersCapitalBuyersPieChart extends Component {

  static contextTypes = {
    intl: PropTypes.object.isRequired,
  }

  static propTypes = {
    data: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object,
    ]),
    isFetching: PropTypes.bool,
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return !_.isEqual(nextProps.data, this.props.data)
  }

  getChartConfig = data => {
    const {intl} = this.context
    const getItemKey = (inf) => {
      if (this.props.lang === 'ru') {
        return inf
      } else {
        if (inf === 'Столица') {
          return 'Capital'
        } else {
          return 'Other regions'
        }
      }
    }
    let config = {
      chart: {
        height: 250,
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie',
      },
      title: {
        text: intl.formatMessage({id: 'page.statistic.text.037'}),
        align: 'left',
        style: { 'font-weigth': 'bold' },
      },
      credits: {
        enabled: false,
      },
      colors: ['#81C78480', '#64B5F680'],
      tooltip: {
        headerFormat:'',
        pointFormat: '<b>{point.name}: </b><br> ' + intl.formatMessage({id: 'page.statistic.text.065.2'}) + ': {point.y:,.0f} <br> ' + intl.formatMessage({id: 'page.statistic.text.066'}) + ': {point.percentage:.0f}%'
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            style: {
              textOutline: false,
              color: '#212121'
            },
            format: '<b>{point.percentage:.0f} %</b>',
            distance: -25,
            filter: {
              property: 'percentage',
              operator: '>',
              value: 4,
            },
          },
          showInLegend: true,
        },
      },
      series: [ {
        name: 'Capital',
      } ],
    }

    config.series[ 0 ].data = _.map(data, item => {
      return {
        name: getItemKey(item.key.ru),
        y: item.buyers.count,
      }
    })

    return config
  }

  render() {
    if (this.props.isFetching) return <Loader isActive={this.props.isFetching} />
    return <ReactHighcharts
      config={this.getChartConfig(this.props.data)}
    />
  }
}
