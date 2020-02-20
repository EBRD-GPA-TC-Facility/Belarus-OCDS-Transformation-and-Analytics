import React from 'react'

import ReactHighcharts        from "react-highcharts"
import Parallel               from 'highcharts/modules/parallel-coordinates'
import Highcharts             from 'highcharts'
import { connect }            from "react-redux"
import { generate }           from 'shortid'
import _                      from 'lodash'
import { bindActionCreators } from "redux"

import { getContractsCommonInfo } from "../../store/dashboard/DashboardActions"

import './PageChart.scss'
import SlideArrow                 from "../slideArrow/SlideArrow"
import PropTypes                  from "prop-types"
import { getDayTranslate }        from "../pages/dashboard/DashboardPage"
import Loader                     from "../loader/Loader"


Parallel(Highcharts)

class PageChart extends React.Component {

  constructor(props) {
    super(props)
    this.props.getContractsCommonInfo()
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return !_.isEqual(nextProps.contractsCommonInfo, this.props.contractsCommonInfo)
  }

  getWeekDays = ({ days, dates }) => {
    const { lang } = this.props
    let concated = _.zip(dates, days)
    let res = []
    _.forEach(concated, item => {
      res.push(`<span>${item[ 0 ]}<br />${lang === 'ru' ? item[ 1 ] : getDayTranslate(item[ 1 ])}</span>`)
    })
    return res
  }

  getSeries = () => {
    const { contractsCommonInfo } = this.props
    const series = contractsCommonInfo.info
    return series.map(item => {
      return {
        data: [
          item.dayNumber,
          item.tenderCount,
          item.tendersCompetitiveShare,
          item.contractsCount,
          item.contractsAmount,
          item.contractBudgetShare,
        ],
        boostThreshold: 1,
        turboThreshold: 1,
        lineWidth: 2,
        name: this.getWeekDays(contractsCommonInfo)[ item.dayNumber ],
      }
    })
  }

  handleScrollToFirstBlock = () => {
    document.getElementById('start-page').scrollIntoView({ block: 'start', behavior: 'smooth' })
  }

  render() {
    const { contractsCommonInfo } = this.props
    if (_.isEmpty(contractsCommonInfo)) return <div className="page-chart">
      <div className="container page-chart__wrapper d-flex">
        <div style={{'align-self': 'center', 'width': '100%'}}>
          <Loader isActive={_.isEmpty(contractsCommonInfo)} theme="light" />
        </div>
      </div>
    </div>

    let series = this.getSeries()
    const { intl } = this.context

    const title = intl.formatMessage({ id: "page.dashboard.text.1.3" })
    let config = {
      chart: {
        backgroundColor: null,
        type: 'spline',
        width: null,
        height: 500,
        parallelCoordinates: true,
        parallelAxes: {
          lineWidth: 1.5,
          gridlinesWidth: 0,
        },
      },
      title: {
        text: `<span style="color: #FFFFFF; font-size: 1.5rem; font-family: 'Montserrat', sans-serif;">` + title + `<br/></span>`,
      },
      credits: {
        enabled: false,
      },
      plotOptions: {
        column: {
          stacking: 'percent',
        },
        series: {
          animation: {
            duration: 4000,
          },
          marker: {
            enabled: false,
            states: {
              hover: {
                enabled: false,
              },
            },
          },
          states: {
            hover: {
              halo: {
                size: 0,
              },
            },
          },
          events: {
            mouseOver: function () {
              this.group.toFront()
            },
          },
        },
      },
      tooltip: {
        formatter: function () {
          return this.key === 'Дни недели' || this.key === 'Days'
            ? '<span style="color:' + this.color + '>\u25CF</span><span><b>' + this.series.name + '</b></span>'
            : '<span style="color:' + this.color + '>\u25CF</span><span><b>' + this.series.name + '</b></span> <br>' + this.key + ': <b>' + this.formattedValue + '</b><br/>'
        },
      },

      xAxis: {
        categories: [
          intl.formatMessage({ id: "page.dashboard.text.01" }),
          intl.formatMessage({ id: "page.dashboard.text.02" }),
          intl.formatMessage({ id: "page.dashboard.text.03" }),
          intl.formatMessage({ id: "page.dashboard.text.04" }),
          intl.formatMessage({ id: "page.dashboard.text.05" }),
          intl.formatMessage({ id: "page.dashboard.text.06" }),
        ],
        opposite: false,
        labels: {
          style: {
            color: '#FFFFFF',
          },
        },
        offset: 10,
        minPadding: 0,
        maxPadding: 0,
      },
      yAxis: [
        {
          lineColor: '#66666650',
          labels: {
            style: { 'color': '#FFFFFF', 'text-align': 'right', 'padding-right': '10px' },
            padding: 10,
            align: 'right',
            useHTML: true,
            zIndex: 1,
          },
          categories: this.getWeekDays(this.props.contractsCommonInfo),
        },
        {
          lineColor: '#66666650',
          min: 0,
          tooltipValueFormat: '{value:,.f} ' + intl.formatMessage({ id: 'common.psc.text' }),
          labels: { format: '{value:,.f}', style: { 'color': '#FFFFFF' } },
        },
        {
          lineColor: '#66666650',
          tickPositions: [ 0, 20, 40, 60, 80, 100 ],
          tooltipValueFormat: '{value:.0f} %',
          labels: { format: '{value:.0f} %', style: { 'color': '#FFFFFF' } },
        },
        {
          min: 0,
          lineColor: '#66666650',
          tooltipValueFormat: '{value:,.f} ' + intl.formatMessage({ id: 'common.psc.text' }),
          labels: { format: '{value:.f} ', style: { 'color': '#FFFFFF' } },
        },
        {
          min: 0,
          lineColor: '#66666650',
          tooltipValueFormat: '{value:,.2f} (BYN)',
          labels: { format: '{value:,.f} ', style: { 'color': '#FFFFFF' } },
        },
        {
          min: 0,
          lineColor: '#66666650',
          tickPositions: [ 0, 20, 40, 60, 80, 100 ],
          tooltipValueFormat: '{value:,.0f} %',
          labels: { format: '{value:,.f} %', style: { 'color': '#FFFFFF' } },
        } ],
      colors: [ '#BBDEFB' ],
      series: series,
    }
    return (
      <div className="page-chart">
        <div className="container-fluid page-chart__wrapper">
          <ReactHighcharts
            key={generate()}
            config={config}
            id="contracts-common-info-chart"
            ref="contracts-common-info-chart"
          />
        </div>
        <div className="row justify-content-center margin-top-30">
          <SlideArrow onClick={this.handleScrollToFirstBlock} />
        </div>
      </div>
    )
  }
}

function MapStateToProps({
                           dashboard,
                           locale,
                         }) {
  return {
    contractsCommonInfo: dashboard.contractsCommonInfo,
    lang: locale.lang,
  }
}

function MapDispatchToProps(dispatch) {
  return {
    getContractsCommonInfo: bindActionCreators(getContractsCommonInfo, dispatch),
  }
}

PageChart.contextTypes = {
  intl: PropTypes.object.isRequired,
}

export default connect(
  MapStateToProps,
  MapDispatchToProps,
)(PageChart)
