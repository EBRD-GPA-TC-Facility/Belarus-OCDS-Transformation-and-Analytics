import React, { Component } from 'react'
import PropTypes            from 'prop-types'
import ReactHighcharts      from "react-highcharts"
import * as _               from 'lodash'
import * as numeral         from "numeral"


export default class SuppliersResidencyPieChart extends Component {

  static contextTypes = {
    intl: PropTypes.object.isRequired,
  }

  static propTypes = {
    lang: PropTypes.string,
    data: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object,
    ]),
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
        if (inf === 'Нерезиденты') {
          return 'Non-resident suppliers'
        } else {
          return 'Resident suppliers'
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
        text: intl.formatMessage({id: 'page.statistic.text.033'}),
        align: 'left',
        style: { 'font-weigth': 'bold' },
      },
      tooltip: {
        formatter: function () {
          return '<b>' + this.point.name + ': </b><br>' + intl.formatMessage({ id: 'page.statistic.text.065.1' }) + ': ' + numeral(this.point.y).format('0') + ' ' + ' <br>' + intl.formatMessage({ id: 'page.statistic.text.066' }) + ': ' + numeral(this.point.percentage).format('0') + '%'
        },
      },
      credits: {
        enabled: false,
      },
      colors: ['#E5737380', '#64B5F680'],
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            format: '<b>{point.percentage:.0f} %</b>',
            distance: -35,
            style: {
              textOutline: false,
              color: '#212121'
            },
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
        name: 'Residency',
      } ],
    }

    config.series[ 0 ].data = _.map(data, item => {
      return {
        name: getItemKey(item.key.ru),
        y: item.count,
      }
    })

    return config
  }

  render() {
    return <ReactHighcharts
      config={this.getChartConfig(this.props.data)}
    />
  }
}
