import React           from 'react'
import PropTypes       from 'prop-types'
import { generate }    from "shortid"
import _               from 'lodash'
import ReactHighcharts from "react-highcharts"

import Card    from "../card/Card"
import Divider from "../divider/Divider"

import { KPI_CHART_CONFIG } from "./constants"

import './GradientChartCard.scss'
import * as numeral         from "numeral"
import { FormattedMessage } from "react-intl"


class GradientChartCard extends React.Component {

  static propTypes = {
    data: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.array,
    ]).isRequired,
    config: PropTypes.object.isRequired,
    isEmpty: PropTypes.bool.isRequired,
    intl: PropTypes.any
  }

  constructor(props) {
    super(props)
    const chartIdString = `mini-chart_${generate()}`
    this.state = {
      chartId: chartIdString,
      config: this.getChartConfig(chartIdString),
    }
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    if (!_.isEqual(nextProps.data, this.props.data)) return true
    return false
  }

  getChartConfig = chartId => {
    const { intl, data, config } = this.props

    let CHART_CONFIG = _.cloneDeep(KPI_CHART_CONFIG)
    CHART_CONFIG.id = chartId

    CHART_CONFIG.config.xAxis.categories = data.dates.map(item => {
      return item.date
    })
    CHART_CONFIG.config.series[ 0 ].data = data.dates.map((item) => {
      return [ item.date, item.avg.perSupplier || item.avg.perProcedure ]
    })
    if (this.props.config.localeId === 'common.home.kpiChart.averageCost.label') {
      CHART_CONFIG.config.series[ 0 ].tooltip.pointFormat = '<span style="color:{point.color}">●</span> <b>{point.y:,.2f} ' + intl.formatMessage({id: 'common.mln.text'}) + '. ' + config.unit + '</b><br/>'
    } else {
      CHART_CONFIG.config.series[ 0 ].tooltip.pointFormat = '<span style="color:{point.color}">●</span> <b>{point.y:,.2f} ' + ' ' + config.unit + '</b><br/>'
    }

    return CHART_CONFIG
  }

  render() {
    const domKey = `card-chart-${generate()}`
    return <div
      className={`col-md-${4}`}
      key={domKey}
      id={domKey}
    >
      <Card
        className="card-chart-wrapper-home"
        cardFluid
      >
        <div className="graph-wrapper-home">
          <ReactHighcharts
            key={generate()}
            config={this.state.config.config}
            id={this.state.chartId}
            ref={this.state.chartId}
          />
        </div>
        <div className="content-wrapper-home">
          <span className={`value-info-home ${this.props.config.colorPreset}`}>
            {
              this.props.config.localeId === 'common.home.kpiChart.averageNumberLots.label'
              || this.props.config.localeId === 'common.home.kpiChart.averageDifferent.label'
                ? Math.round(this.props.data.avg.perSupplier || this.props.data.avg.perProcedure)
                : numeral(this.props.data.avg.perSupplier || this.props.data.avg.perProcedure).format('0.00')
            }
          </span>
          <Divider borderBottom={0} borderLeft={'1px solid #E9EDF2'} marginLeft={15} width={1} />
          <p style={{ marginLeft: '15px', padding: '0' }} className="chart-info-home">
            <FormattedMessage id={this.props.config.localeId} />
          </p>
        </div>
      </Card>
    </div>
  }
}

export default GradientChartCard
