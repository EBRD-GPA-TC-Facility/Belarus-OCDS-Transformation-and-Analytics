import React, { PureComponent } from 'react'
import { bindActionCreators }   from 'redux'
import { connect }              from 'react-redux'

import { generate }    from 'shortid'
import numeral         from 'numeral'
import _               from 'lodash'
import ReactTable      from 'react-table'
import * as classnames from "classnames"
import ReactHighcharts from 'react-highcharts'
import { withRouter }  from "react-router-dom"

import {
  getEnquiriesCount,
  getKpiContractsAmount,
  getKpiContractsCount,
  getLotsActiveDatesCount,
  getLotsCompleteDatesCount,
  getOkbrTop,
  getProceduresAvgPerHour,
  getProceduresCompetetiveEveryN,
  getProceduresSuccessfulCount,
  getProcurementsTop,
  getProcuringEntitiesDatesCount,
  getSingleSourceProcurementsTop,
  getSuppliersDatesCount,
} from '../../../store/dashboard/DashboardActions'

import Card              from '../../card/Card'
import Article           from '../../article/Article'
import Divider           from '../../divider/Divider'
import IconOKBR          from '../../icons/IconOKBR'
import IconQuestion      from '../../icons/IconQuestion'
import CardContentSwitch from '../../cardContentSwitch/CardContentSwitch'
import HighChart         from '../../highchart/HighChart'
import Slider            from 'react-slick'
import GradientChartCard from "../../gradientChartCard/GradientChartCard"

import * as MOCK                                                    from './mockData'
import { ChartConfig, PROCUREMENT_TOP_COLUMNS, CARDS_DESCRIPTIONS } from './mockData'

import {
  getPerProcedureLotsCount,
  getPerProcedureOkrbCount,
  getPerSupplierContractsCount,
} from "../../../store/dashboard/kpiCharts/KpiChartsActions"

import { getCompetitivityDatesAmount }        from "../../../store/dashboard/сompetitivityDatesAmount/CompetitivityDatesAmountActions"
import { StoryRoutes }                        from "../../../routes"
import CardInfo                               from "../../CardInfo/CardInfo"

import './DashboardPage.scss'
import { FormattedMessage }                   from "react-intl"
import PropTypes                              from "prop-types"
import { ReadMoreTable }                      from "../../readmoretable/ReadMoreTable"
import { formatMessage }                      from "react-intl/src/format"
import Loader                                 from "../../loader/Loader"
import { changeLocation, setCurrentLocation } from "../../../store/navigation/NavActions"


export const getDayTranslate = (day) => {
  const days = [
    {
      en: 'Monday',
      ru: 'Понедельник',
    }, {
      en: 'Tuesday',
      ru: 'Вторник',
    }, {
      en: 'Wednesday',
      ru: 'Среда',
    }, {
      en: 'Thursday',
      ru: 'Четверг',
    }, {
      en: 'Friday',
      ru: 'Пятница',
    }, {
      en: 'Saturday',
      ru: 'Суббота',
    }, {
      en: 'Sunday',
      ru: 'Воскресенье',
    },
  ]

  let dayName = _.find(days, o => {
    return o.ru === day
  })

  return dayName.en
}

class Dashboard extends PureComponent {

  constructor(props) {
    super(props)
    const loc = window.location.pathname
    props.setCurrentLocation(loc)
    props.changeLocation(loc, loc)
    _.isEmpty(props.procuringEntitiesDatesCount) && this.props.getProcEntDatesCount()
    _.isEmpty(props.suppliersDatesCount) && this.props.getSuppliersDatesCount()
    _.isEmpty(props.lotsCompleteDatesCount) && this.props.getLotsCompleteDatesCount()
    // _.isEmpty(props.perProcedureLotsCount) && this.props.getLotsActiveDatesCount()
    _.isEmpty(props.perProcedureLotsCount) && this.props.getProcurementsTop()
    _.isEmpty(props.proceduresSingleSourceTop) && this.props.getSingleSourceProcurementsTop()
    _.isEmpty(props.okbrTop) && this.props.getOkbrTop()
    _.isEmpty(props.enquiriesCount) && this.props.getEnquiriesCount()
    _.isEmpty(props.kpiContractsCount) && this.props.getKpiContractsCount()
    _.isEmpty(props.kpiContractsAmount) && this.props.getKpiContractsAmount()
    _.isEmpty(props.perProcedureLotsCount) && this.props.getPerProcedureLotsCount()
    _.isEmpty(props.perProcedureOkrbCount) && this.props.getPerProcedureOkrbCount()
    _.isEmpty(props.perSupplierContractsCount) && this.props.getPerSupplierContractsCount()
    _.isEmpty(props.competitivityDatesAmount) && this.props.getCompetitivityDatesAmount()
    this.state = {
      sliderId: `slider-count-amount-${generate()}`,
    }
  }

  componentDidMount() {
    // this.onMouseMove()
  }

  getProceduresTableColumns = () => {
    const { intl } = this.context
    const TOP_FIVE_PROCUREMENT_COLUMNS = [
      {
        Header: intl.formatMessage({ id: 'common.home.text.0.08' }),
        accessor: 'customer',
        minWidth: 200,
      },
      {
        Header: intl.formatMessage({ id: 'common.home.text.0.09' }),
        accessor: 'provider',
        minWidth: 200,
      },
      {
        Header: intl.formatMessage({ id: 'common.home.text.0.10' }),
        accessor: 'subject',
        Cell: props => <ReadMoreTable value={props.value} />,
        minWidth: 200,
      },
      {
        Header: intl.formatMessage({ id: 'common.home.text.0.11' }),
        accessor: 'amount',
        Cell: props => <div className="column-item-centred"><span>{props.value}</span></div>,
        maxWidth: 150,
      },
    ]
    let columnsConfig = _.clone(TOP_FIVE_PROCUREMENT_COLUMNS)
    const titleIsEmpty = _.find(this.props.proceduresSingleSourceTop, elem => elem.title !== '')
    if (!_.isEmpty(titleIsEmpty)) {
      columnsConfig.unshift({ Header: 'Процедура закупки №', accessor: 'procurementNumber' })
    }
    return columnsConfig
  }

  renderMiniKPIValue = (value, colorClass) => {
    return <div className={classnames('mini-kpi-value', colorClass)}>
      {value}
    </div>
  }

  renderMiniKPIs = () => {
    const {
      procuringEntitiesDatesCount,
      suppliersDatesCount,
      lotsCompleteDatesCount,
    } = this.props
    if (_.isEmpty(procuringEntitiesDatesCount && suppliersDatesCount && lotsCompleteDatesCount)) return <Loader
      isActive={_.isEmpty(procuringEntitiesDatesCount && suppliersDatesCount && lotsCompleteDatesCount)}
    />
    return <React.Fragment>
      <Card className="col-md-4 home-cards" cardClass="d-flex flex-row mini-kpi h-100">
        {this.renderMiniKPIValue(procuringEntitiesDatesCount.count, 'color-madang')}
        <Divider borderBottom={0} borderLeft={'1px solid #E9EDF2'} marginLeft={15} width={1} />
        <span className="margin-left-15"><FormattedMessage id="common.home.kpi.numberOfCustomers.label" /></span>
      </Card>
      <Card className="col-md-4 home-cards" cardClass="d-flex flex-row mini-kpi h-100">
        {this.renderMiniKPIValue(suppliersDatesCount.count, 'color-perano')}
        <Divider borderBottom={0} borderLeft={'1px solid #E9EDF2'} marginLeft={15} width={1} />
        <span className="margin-left-15"><FormattedMessage id="common.home.kpi.numberOfSuppliers.label" /></span>
      </Card>
      <Card className="col-md-4 home-cards" cardClass="d-flex flex-row mini-kpi h-100">
        {this.renderMiniKPIValue(lotsCompleteDatesCount.count, 'color-madang')}
        <Divider borderBottom={0} borderLeft={'1px solid #E9EDF2'} marginLeft={15} width={1} />
        <span className="margin-left-15"><FormattedMessage id="common.home.kpi.numberOfSuccessfullyLots.label" /></span>
      </Card>
    </React.Fragment>
  }

  renderMiniCharts = () => {
    const {
      perProcedureLotsCount,
      perProcedureOkrbCount,
      perSupplierContractsCount,
    } = this.props
    const { intl } = this.context
    const MINI_CHART_CONFIG = [
      {
        name: 'Среднее количество лотов в процедуре (шт.)',
        unit: intl.formatMessage({ id: 'common.psc.text' }),
        colorPreset: 'c-preset-blue-mono',
        localeId: 'common.home.kpiChart.averageNumberLots.label',
      },
      {
        name: 'Среднее количество различных предметов закупок в процедуре (шт.)',
        unit: intl.formatMessage({ id: 'common.psc.text' }),
        colorPreset: 'c-preset-blue-mono',
        localeId: 'common.home.kpiChart.averageDifferent.label',
      },
      {
        name: 'Средняя стоимость договоров на заказчика (млн.бел.руб. (BYN))',
        unit: intl.formatMessage({ id: 'common.byn.text' }),
        colorPreset: 'c-preset-blue-mono',
        localeId: 'common.home.kpiChart.averageCost.label',
      },
    ]
    return <React.Fragment>
      {
        !_.isEmpty(perProcedureLotsCount) &&
        <GradientChartCard
          data={perProcedureLotsCount}
          config={MINI_CHART_CONFIG[ 0 ]}
          isEmpty={_.isEmpty(perProcedureLotsCount)}
          intl={intl}
        />
      }
      {
        !_.isEmpty(perProcedureOkrbCount) &&
        <GradientChartCard
          data={perProcedureOkrbCount}
          config={MINI_CHART_CONFIG[ 1 ]}
          isEmpty={_.isEmpty(perProcedureOkrbCount)}
          intl={intl}
        />
      }
      {
        !_.isEmpty(perSupplierContractsCount) &&
        <GradientChartCard
          data={perSupplierContractsCount}
          config={MINI_CHART_CONFIG[ 2 ]}
          isEmpty={_.isEmpty(perSupplierContractsCount)}
          intl={intl}
        />
      }
    </React.Fragment>
  }

  getProceduresTableData = (data) => {
    return _.map(data, (item) => {
      return {
        procurementNumber: item.title,
        customer: item.buyer,
        provider: item.supplier,
        subject: item.description,
        amount: item.amount,
      }
    })
  }

  numberWithSpaces = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")
  }

  getProceduresTopTableData = data => {
    const { intl } = this.context
    return [
      {
        info: intl.formatMessage({ id: "common.home.text.0.01" }),
        value: data.description,
      }, {
        info: intl.formatMessage({ id: "common.home.text.0.02" }),
        value: data.title,
      }, {
        info: intl.formatMessage({ id: "common.home.text.0.03" }),
        value: data.procurementMethod,
      }, {
        info: intl.formatMessage({ id: "common.home.text.0.04" }),
        value: data.procuringEntity,
      }, {
        info: intl.formatMessage({ id: "common.home.text.0.05" }),
        value: this.numberWithSpaces(data.amount),
      },
    ]
  }

  renderKpiContractsChart = (data, key, format, xAxisKey) => {
    if (_.isEmpty(data)) return
    const { intl } = this.context
    let GradientChartConfig = _.cloneDeep(ChartConfig)
    const chartId = `slide-chart-${key}_${generate()}`
    GradientChartConfig.id = chartId

    GradientChartConfig.config = {
      chart: {
        type: 'areaspline',
      },
      title: {
        text: '',
      },
      credits: {
        enabled: false,
      },
      series: [
        {
          showInLegend: false,
          name: '',
          lineWidth: 3,
          lineColor: {
            color: '#64B5F6',
            linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
            stops: [
              [ 0, '#64B5F6' ],
              [ 1, '#64B5F680' ],
            ],
          },
          data: data.dates.map(item => {
            return [ item.date, item[ key ] ]
          }),
          fillColor: {
            linearGradient: [ 100, 0, 0, 300 ],
            stops: [
              [ 0, '#64B5F650' ],
              [ 1, '#64B5F600' ],
            ],
          },
        },
      ],
      plotOptions: {
        series: {
          pointPlacement: 0,
          pointStart: 0,
          marker: {
            radius: 0,
            states: {
              hover: {
                radius: 8,
                lineWidth: 5,
                lineWidthPlus: 10,
              },
            },
          },
        },
      },
      tooltip: {
        formatter: function () {
          return '<span style="font-size: 10px"><b>' + intl.formatMessage({ id: 'common.date.text' }) + ':</b> ' + this.key + '</span><br/> <span style="font-size: 10px"><b>' + xAxisKey + ': </b>' + this.point.y.toLocaleString('ru') + intl.formatMessage({ id: 'common.psc.text' }) + '</span><br/>'
        },
        valueDecimals: format ? 2 : 0,
      },
      xAxis: {
        min: 0,
        step: 1,
        startOnTick: true,
        endOnTick: true,
        tickInterval: 1,
        categories: data.dates.map(item => {
          return `<span>${item.date}<br /><span class="d-none d-md-block d-lg-block">${this.props.lang === 'ru' ? item.day : getDayTranslate(item.day)}</span></span>`
        }),
        title: {
          text: "",
        },
      },
      yAxis: {
        labels: {
          formatter: function () {
            return numeral(this.value).format('0 a')
          },
        },
        title: {
          text: xAxisKey,
        },
      },
    }

    return <ReactHighcharts
      key={generate()}
      config={GradientChartConfig.config}
      id={chartId}
      ref={chartId}
    />
  }

  renderOkbrInfo = () => {
    const { okbrTop } = this.props
    if (_.isEmpty(okbrTop)) return
    const value = okbrTop[ 0 ]
    return <div className="swith-card-content">
      <IconOKBR />
      <div className="swith-card-content-title"><FormattedMessage id="common.home.switchDefault.mostPurchased.label" />
      </div>
      <div className="swith-card-content-value">{value.key.ru}</div>
    </div>
  }

  renderProceduresTopInfo = () => {
    const { proceduresTop } = this.props
    if (_.isEmpty(proceduresTop)) return

    return <div className="swith-card-content">
      <svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" viewBox="0 0 70 70" fill="none">
        <path
          d="M35 0.0078125C33.793 0.0078125 32.582 0.464843 31.668 1.37891L28.8711 4.17969L25.207 2.66406C22.8164 1.67187 20.0469 2.82031 19.0586 5.21484L17.543 8.87109H13.5781C10.9922 8.87109 8.87109 10.9922 8.87109 13.582V17.543L5.21484 19.0586C2.82031 20.0469 1.67188 22.8203 2.66406 25.2109L4.17969 28.8711L1.375 31.6719C-0.453125 33.5 -0.453125 36.5 1.375 38.332L4.17969 41.1289L2.66406 44.793C1.67188 47.1836 2.82031 49.9531 5.21484 50.9414L8.87109 52.457V56.4219C8.87109 59.0078 10.9922 61.1289 13.5781 61.1289H17.543L19.0586 64.7852C20.0469 67.1797 22.8164 68.3281 25.207 67.3359L28.8711 65.8242L31.668 68.625C33.5 70.4531 36.5 70.4531 38.3281 68.625L41.1289 65.8242L44.7891 67.3359C47.1797 68.3281 49.9531 67.1797 50.9414 64.7852L52.457 61.1289H56.418C59.0078 61.1289 61.1289 59.0078 61.1289 56.4219V52.457L64.7852 50.9414C67.1797 49.9531 68.3281 47.1797 67.3359 44.7891L65.8203 41.1289L68.6211 38.3281C70.4492 36.5 70.4492 33.5 68.6211 31.6719L65.8203 28.8711L67.332 25.2109C68.3242 22.8203 67.1758 20.0469 64.7852 19.0586L61.125 17.543V13.582C61.125 10.9922 59.0078 8.87109 56.418 8.87109H52.457L50.9414 5.21484C49.9531 2.82031 47.1797 1.67187 44.7891 2.66406L41.1289 4.17969L38.3281 1.37891C37.4141 0.464843 36.207 0.0078125 35 0.0078125ZM35 1.99219C35.6914 1.99219 36.3828 2.25781 36.918 2.79297L40.6602 6.53906L45.5547 4.51172C46.9492 3.93359 48.5195 4.58594 49.0938 5.98047L51.1211 10.8711H56.418C57.9258 10.8711 59.125 12.0742 59.125 13.582V18.8789L64.0195 20.9062C65.4141 21.4805 66.0625 23.0508 65.4844 24.4453L63.4609 29.3398L67.2031 33.082H67.207C68.2734 34.1484 68.2734 35.8477 67.207 36.918L63.4609 40.6602L65.4883 45.5547C66.0664 46.9492 65.4141 48.5195 64.0195 49.0938L59.1289 51.1211V56.4219C59.1289 57.9297 57.9258 59.1289 56.418 59.1289H51.1211L49.0938 64.0195C48.5195 65.4141 46.9492 66.0664 45.5547 65.4883L40.6602 63.4648L36.918 67.207C35.8477 68.2734 34.1523 68.2734 33.082 67.207L29.3398 63.4648L24.4453 65.4883C23.0508 66.0664 21.4805 65.4141 20.9062 64.0195L18.875 59.1289H13.5781C12.0703 59.1289 10.8711 57.9297 10.8711 56.4219V51.125L5.98047 49.0938C4.58594 48.5195 3.93359 46.9492 4.51172 45.5547L6.53516 40.6602L2.79297 36.918C1.72656 35.8477 1.72656 34.1523 2.79297 33.082L6.53516 29.3398L4.51172 24.4453C3.93359 23.0508 4.58594 21.4805 5.98047 20.9062L10.8711 18.8789V13.582C10.8711 12.0742 12.0703 10.8711 13.5781 10.8711H18.875L20.9062 5.98047C21.4805 4.58594 23.0508 3.93359 24.4453 4.51172L29.3398 6.53906L33.082 2.79297C33.6172 2.25781 34.3086 1.99219 35 1.99219ZM35 4C34.4492 4 34 4.44922 34 5C34 5.55078 34.4492 6 35 6C35.5508 6 36 5.55078 36 5C36 4.44922 35.5508 4 35 4ZM23.5273 6.28125C23.3945 6.28125 23.2617 6.30859 23.1367 6.35937C22.625 6.57031 22.3828 7.15625 22.5938 7.66797C22.8086 8.17578 23.3906 8.41797 23.9023 8.20703C24.4141 7.99609 24.6563 7.41016 24.4414 6.90234C24.2891 6.53125 23.9297 6.28516 23.5273 6.28125ZM46.5039 6.28125C46.0898 6.27344 45.7148 6.51953 45.5586 6.90234C45.3437 7.41016 45.5859 7.99609 46.0977 8.20703C46.6094 8.41797 47.1914 8.17578 47.4062 7.66797C47.6172 7.15625 47.375 6.57031 46.8633 6.35937C46.75 6.3125 46.6289 6.28516 46.5039 6.28125ZM35 9C34.4492 9 34 9.44922 34 10C34 10.5508 34.4492 11 35 11C35.5508 11 36 10.5508 36 10C36 9.44922 35.5508 9 35 9ZM30.125 9.48047C30.0586 9.48047 29.9922 9.48828 29.9258 9.5C29.3867 9.60938 29.0352 10.1328 29.1406 10.6758C29.25 11.2188 29.7773 11.5703 30.3164 11.4609C30.8594 11.3516 31.2109 10.8281 31.1055 10.2852C31.0117 9.82031 30.6016 9.48437 30.125 9.48047ZM39.9023 9.48047C39.4141 9.46875 38.9922 9.80859 38.8945 10.2852C38.7891 10.8281 39.1406 11.3516 39.6836 11.4609C40.2227 11.5703 40.75 11.2188 40.8594 10.6758C40.9648 10.1328 40.6133 9.60938 40.0742 9.5C40.0156 9.48828 39.9609 9.48047 39.9023 9.48047ZM25.4414 10.9023C25.3086 10.9023 25.1758 10.9258 25.0508 10.9805C24.5391 11.1914 24.2969 11.7734 24.5117 12.2852C24.7227 12.7969 25.3047 13.0391 25.8164 12.8281C26.3281 12.6133 26.5703 12.0313 26.3594 11.5195C26.2031 11.1484 25.8438 10.9062 25.4414 10.9023ZM44.5898 10.9023C44.1758 10.8945 43.8008 11.1367 43.6406 11.5195C43.4297 12.0313 43.6719 12.6133 44.1836 12.8281C44.6953 13.0391 45.2773 12.7969 45.4883 12.2852C45.7031 11.7734 45.4609 11.1914 44.9492 10.9805C44.8359 10.9297 44.7109 10.9062 44.5898 10.9023ZM13.8008 12.7852C13.5313 12.7852 13.2695 12.8906 13.0781 13.0781C12.6914 13.4688 12.6914 14.1055 13.0781 14.4961C13.4688 14.8828 14.1055 14.8828 14.4961 14.4961C14.8828 14.1055 14.8828 13.4688 14.4961 13.0781C14.3086 12.8945 14.0625 12.7891 13.8008 12.7852ZM56.2266 12.7852C55.957 12.7852 55.6953 12.8906 55.5039 13.0781C55.1172 13.4688 55.1172 14.1055 55.5039 14.4961C55.8945 14.8828 56.5312 14.8828 56.9219 14.4961C57.3086 14.1055 57.3086 13.4688 56.9219 13.0781C56.7344 12.8945 56.4883 12.7891 56.2266 12.7852ZM48.9062 13.2109C48.5664 13.2031 48.2461 13.3711 48.0586 13.6562C47.75 14.1172 47.875 14.7383 48.332 15.043C48.793 15.3477 49.4141 15.2266 49.7188 14.7656C50.0273 14.3047 49.9023 13.6875 49.4453 13.3789C49.2852 13.2734 49.0977 13.2148 48.9062 13.2109ZM21.125 13.2148C20.9219 13.2109 20.7227 13.2695 20.5586 13.3789C20.0977 13.6875 19.9727 14.3086 20.2812 14.7656C20.5859 15.2266 21.207 15.3516 21.668 15.043C22.125 14.7383 22.25 14.1172 21.9414 13.6562C21.7617 13.3828 21.4531 13.2148 21.125 13.2148ZM17.3359 16.3242C17.0664 16.3164 16.8047 16.4219 16.6133 16.6133C16.2227 17.0039 16.2227 17.6406 16.6133 18.0312C16.8008 18.2188 17.0547 18.3242 17.3203 18.3242C17.5859 18.3242 17.8398 18.2188 18.0312 18.0312C18.418 17.6406 18.418 17.0039 18.0312 16.6133C17.8438 16.4297 17.5977 16.3242 17.3359 16.3242ZM52.6914 16.3242C52.4219 16.3203 52.1602 16.4258 51.9688 16.6133C51.582 17.0039 51.582 17.6406 51.9688 18.0312C52.3594 18.418 52.9961 18.418 53.3867 18.0312C53.7734 17.6406 53.7734 17.0039 53.3867 16.6133C53.1992 16.4297 52.9531 16.3242 52.6914 16.3242ZM55.7969 20.1094C55.5938 20.1055 55.3984 20.1641 55.2305 20.2773C54.7734 20.5859 54.6484 21.2031 54.9531 21.6641C55.2617 22.1211 55.8828 22.2461 56.3438 21.9375C56.8008 21.6328 56.9258 21.0117 56.6211 20.5508C56.4336 20.2773 56.1289 20.1133 55.7969 20.1094ZM14.2344 20.1094C13.8906 20.1055 13.5703 20.2734 13.3828 20.5547C13.0742 21.0156 13.1992 21.6328 13.6562 21.9414C14.1172 22.25 14.7383 22.125 15.0469 21.668C15.3516 21.207 15.2266 20.5859 14.7695 20.2812C14.6094 20.1719 14.4258 20.1133 14.2344 20.1094ZM33.6719 24.6523C33.5703 25.2031 33.3516 25.6719 33.0117 26.0547C32.6719 26.4375 32.2656 26.75 31.7891 26.9883C31.3125 27.2344 30.7773 27.4062 30.1875 27.5117C29.5977 27.6133 28.9922 27.668 28.3711 27.668V30.0078H32.8438V42.8477H36.0938V24.6523H33.6719ZM7.30469 22.5156C6.89063 22.5078 6.51562 22.7539 6.35938 23.1367C6.14844 23.6445 6.39062 24.2305 6.90234 24.4414C7.41016 24.6523 7.99609 24.4102 8.20703 23.9023C8.41797 23.3906 8.17578 22.8047 7.66797 22.5938C7.55078 22.5469 7.42969 22.5195 7.30469 22.5156ZM62.7227 22.5156C62.5898 22.5156 62.457 22.543 62.332 22.5938C61.8242 22.8047 61.582 23.3906 61.793 23.9023C62.0039 24.4102 62.5898 24.6523 63.0977 24.4414C63.6094 24.2305 63.8516 23.6445 63.6406 23.1367C63.4883 22.7617 63.125 22.5195 62.7227 22.5156ZM58.1055 24.4336C57.9687 24.4297 57.8398 24.457 57.7148 24.5078C57.2031 24.7187 56.9609 25.3047 57.1719 25.8125C57.3867 26.3242 57.9687 26.5664 58.4805 26.3555C58.9922 26.1445 59.2344 25.5586 59.0195 25.0469C58.8672 24.6758 58.5039 24.4336 58.1055 24.4336ZM11.9258 24.4336C11.5156 24.4258 11.1406 24.668 10.9805 25.0469C10.7695 25.5586 11.0117 26.1445 11.5195 26.3555C12.0313 26.5664 12.6172 26.3242 12.8281 25.8125C13.0391 25.3047 12.7969 24.7187 12.2852 24.5078C12.1719 24.4609 12.0508 24.4375 11.9258 24.4336ZM10.5039 29.125C10.0195 29.1094 9.59375 29.4492 9.5 29.9258C9.39062 30.4688 9.74219 30.9961 10.2852 31.1055C10.5469 31.1562 10.8164 31.1016 11.0352 30.9531C11.2578 30.8047 11.4102 30.5781 11.4609 30.3164C11.5703 29.7734 11.2188 29.25 10.6758 29.1406C10.6211 29.1289 10.5625 29.125 10.5039 29.125ZM59.5273 29.125C59.457 29.1211 59.3906 29.1289 59.3281 29.1406C58.7852 29.25 58.4336 29.7773 58.543 30.3164C58.6484 30.8594 59.1758 31.2109 59.7188 31.1055C60.2578 30.9961 60.6094 30.4688 60.5 29.9258C60.4102 29.4609 60 29.125 59.5273 29.125ZM5 34C4.44922 34 4 34.4492 4 35C4 35.5508 4.44922 36 5 36C5.55078 36 6 35.5508 6 35C6 34.4492 5.55078 34 5 34ZM10 34C9.44922 34 9 34.4492 9 35C9 35.5508 9.44922 36 10 36C10.5508 36 11 35.5508 11 35C11 34.4492 10.5508 34 10 34ZM60 34C59.4492 34 59 34.4492 59 35C59 35.5508 59.4492 36 60 36C60.5508 36 61 35.5508 61 35C61 34.4492 60.5508 34 60 34ZM65 34C64.4492 34 64 34.4492 64 35C64 35.5508 64.4492 36 65 36C65.5508 36 66 35.5508 66 35C66 34.4492 65.5508 34 65 34ZM10.4844 38.875C10.418 38.875 10.3516 38.8828 10.2852 38.8945C9.74219 39.0039 9.39062 39.5312 9.5 40.0742C9.60938 40.6133 10.1328 40.9648 10.6758 40.8594C11.2188 40.75 11.5703 40.2227 11.4609 39.6836C11.3672 39.2148 10.9609 38.8789 10.4844 38.875ZM59.5469 38.875C59.0586 38.8633 58.6367 39.2031 58.543 39.6836C58.4336 40.2227 58.7852 40.75 59.3281 40.8594C59.8672 40.9648 60.3945 40.6133 60.5 40.0742C60.5547 39.8125 60.5 39.543 60.3555 39.3203C60.207 39.1016 59.9766 38.9453 59.7188 38.8945C59.6602 38.8828 59.6055 38.8789 59.5469 38.875ZM7.29297 45.4805C7.16016 45.4805 7.02734 45.5039 6.90234 45.5586C6.39062 45.7695 6.14844 46.3516 6.35938 46.8633C6.57422 47.375 7.15625 47.6172 7.66797 47.4062C8.17969 47.1914 8.42188 46.6094 8.20703 46.0977C8.05469 45.7266 7.69531 45.4844 7.29297 45.4805ZM62.7383 45.4805C62.3242 45.4727 61.9492 45.7148 61.793 46.0977C61.582 46.6094 61.8242 47.1914 62.332 47.4062C62.5781 47.5039 62.8555 47.5039 63.1016 47.4023C63.3437 47.3008 63.5391 47.1055 63.6406 46.8594C63.8516 46.3516 63.6094 45.7656 63.0977 45.5547C62.9844 45.5078 62.8633 45.4844 62.7383 45.4805ZM13.8008 55.2148C13.5313 55.207 13.2695 55.3125 13.0781 55.5039C12.6875 55.8945 12.6875 56.5312 13.0781 56.9219C13.4688 57.3086 14.1016 57.3086 14.4922 56.9219C14.8828 56.5312 14.8828 55.8945 14.4922 55.5039C14.3086 55.3203 14.0625 55.2187 13.8008 55.2148ZM56.2266 55.2148C55.957 55.2109 55.6953 55.3164 55.5039 55.5039C55.1172 55.8945 55.1172 56.5312 55.5039 56.9219C55.8945 57.3086 56.5312 57.3086 56.9219 56.9219C57.3086 56.5312 57.3086 55.8945 56.9219 55.5039C56.7344 55.3203 56.4883 55.2148 56.2266 55.2148ZM25.4531 57.0938C25.043 57.0859 24.668 57.332 24.5117 57.7148C24.2969 58.2227 24.5391 58.8086 25.0508 59.0195C25.5625 59.2305 26.1445 58.9883 26.3594 58.4805C26.5703 57.9687 26.3281 57.3828 25.8164 57.1719C25.7031 57.125 25.5781 57.0977 25.4531 57.0938ZM44.5781 57.0938C44.4414 57.0938 44.3086 57.1211 44.1875 57.1719C43.6758 57.3828 43.4336 57.9687 43.6445 58.4805C43.8555 58.9883 44.4414 59.2305 44.9531 59.0195C45.4609 58.8086 45.7031 58.2227 45.4922 57.7148C45.3398 57.3437 44.9766 57.0977 44.5781 57.0938ZM30.1523 58.5195C29.6641 58.5078 29.2383 58.8477 29.1406 59.3242C29.0898 59.5859 29.1445 59.8555 29.293 60.0742C29.4414 60.2969 29.668 60.4492 29.9297 60.5C30.4727 60.6094 30.9961 60.2578 31.1055 59.7148C31.1562 59.4531 31.1016 59.1836 30.957 58.9648C30.8086 58.7422 30.5781 58.5898 30.3164 58.5391C30.2617 58.5273 30.207 58.5195 30.1523 58.5195ZM39.8828 58.5195C39.8164 58.5195 39.75 58.5273 39.6836 58.5391C39.4219 58.5898 39.1953 58.7422 39.0469 58.9648C38.8984 59.1836 38.8438 59.4531 38.8945 59.7148C38.9492 59.9766 39.1016 60.207 39.3203 60.3516C39.543 60.5 39.8125 60.5547 40.0742 60.5C40.6172 60.3945 40.9688 59.8672 40.8594 59.3281C40.7656 58.8594 40.3594 58.5234 39.8828 58.5195ZM35 59C34.4492 59 34 59.4492 34 60C34 60.5508 34.4492 61 35 61C35.5508 61 36 60.5508 36 60C36 59.4492 35.5508 59 35 59ZM46.4883 61.7148C46.3555 61.7148 46.2227 61.7383 46.0977 61.793C45.5898 62.0039 45.3477 62.5859 45.5586 63.0977C45.7695 63.6055 46.3555 63.8477 46.8633 63.6406C47.1094 63.5391 47.3047 63.3438 47.4062 63.0977C47.5078 62.8516 47.5078 62.5781 47.4062 62.332C47.2539 61.9609 46.8906 61.7187 46.4883 61.7148ZM23.543 61.7188C23.1289 61.707 22.7539 61.9531 22.5938 62.332C22.4961 62.5781 22.4961 62.8555 22.5977 63.1016C22.6992 63.3437 22.8945 63.5391 23.1406 63.6406C23.6484 63.8516 24.2344 63.6094 24.4453 63.0977C24.5469 62.8555 24.5469 62.5781 24.4453 62.332C24.3437 62.0898 24.1484 61.8945 23.9023 61.793C23.7891 61.7461 23.668 61.7188 23.543 61.7188ZM35 64C34.4492 64 34 64.4492 34 65C34 65.5508 34.4492 66 35 66C35.5508 66 36 65.5508 36 65C36 64.4492 35.5508 64 35 64Z"
          fill="#039BE5" />
        <path fillRule="evenodd" clipRule="evenodd"
              d="M34.6931 45.239L44.3772 51.9737L53.4398 52.4585L53.333 54.4556L43.7023 53.9404L34.6931 47.6751L25.6838 53.9404L16.0531 54.4556L15.9463 52.4585L25.009 51.9737L34.6931 45.239Z"
              fill="#039BE5" />
      </svg>
      <div className="swith-card-content-title"><FormattedMessage id="common.home.switchDefault.purchaseWeek.label" />
      </div>
      <div className="swith-card-content-value">{numeral(proceduresTop.amount).format('0.0 a')}<br />
        <span className="currency-value"><FormattedMessage id="common.byn.text" /></span>
      </div>
    </div>
  }

  renderEnquiriesCountInfo = () => {
    const { enquiriesCount } = this.props
    if (_.isEmpty(enquiriesCount)) return

    return <div className="swith-card-content">
      <IconQuestion />
      <div className="swith-card-content-title"><FormattedMessage id="common.home.switchDefault.askedQuestions.label" />
      </div>
      <div className="swith-card-content-value">{enquiriesCount.count}</div>
    </div>
  }

  renderOkbrChart = () => {
    const { okbrTop } = this.props
    if (_.isEmpty(okbrTop)) return

    const { intl } = this.context
    let OkbrChartConfig = _.cloneDeep(ChartConfig)

    OkbrChartConfig.id = 'max-buy-chart_1'
    OkbrChartConfig.config.colors = [ '#64B5F6' ]
    OkbrChartConfig.config.xAxis = {
      tickInterval: 1,
      categories: okbrTop.map((item, i) => {
        return i + 1
      }),
      title: { text: intl.formatMessage({ id: "common.home.switchDefault.subjectMatters.label" }) },
    }
    OkbrChartConfig.config.credits = {
      enabled: false,
    }
    OkbrChartConfig.config.yAxis = {
      title: {
        text: intl.formatMessage({ id: 'common.byn.text' }),
      },
      labels: {
        formatter: function () {
          return numeral(this.value).format('0 a')
        },
      },
    }
    OkbrChartConfig.config.chart.type = 'bar'
    OkbrChartConfig.config.series[ 0 ].name = ''
    OkbrChartConfig.config.series[ 0 ].tooltip = {
      pointFormat: '<span style="color:{point.color}">●</span> <b>{point.y:,.2f} ' + intl.formatMessage({ id: 'common.byn.text' }) + '</b><br/>',
    }
    OkbrChartConfig.config.series[ 0 ].data = okbrTop.map((item) => {
      return [ item.key.ru, item.amount ]
    })

    return <HighChart
      key={generate()}
      config={OkbrChartConfig.config}
      id="max-buy-chart_1"
      ref="max-buy-chart_1"
    />
  }

  getDayNameByDate = (date) => {
    const d = new Date(date)
    const days = [
      {
        en: 'Monday',
        ru: 'Понедельник',
      }, {
        en: 'Tuesday',
        ru: 'Вторник',
      }, {
        en: 'Wednesday',
        ru: 'Среда',
      }, {
        en: 'Thursday',
        ru: 'Четверг',
      }, {
        en: 'Friday',
        ru: 'Пятница',
      }, {
        en: 'Saturday',
        ru: 'Суббота',
      }, {
        en: 'Sunday',
        ru: 'Воскресенье',
      },
    ]

    let dayNameRu = days[ d.getDay() ].ru
    let dayNameEn = days[ d.getDay() ].en
    if (this.props.lang === 'ru') {
      return dayNameRu
    } else {
      return dayNameEn
    }
  }

  renderEnquiriesCountChart = () => {
    const { intl } = this.context
    const { enquiriesCount } = this.props
    if (_.isEmpty(enquiriesCount)) return

    let EnquiriesCountConfig = _.cloneDeep(ChartConfig)

    EnquiriesCountConfig.id = 'enquiries-count-chart_2'
    EnquiriesCountConfig.config.chart.type = 'column'
    EnquiriesCountConfig.config.xAxis.categories = enquiriesCount.dates.map(item => {
      return '<span style="text-overflow: ellipsis; overflow: hidden; white-space: nowrap;">' + item.date + '<br>' + this.getDayNameByDate(item.date) + '</span>'
    })
    EnquiriesCountConfig.config.xAxis.labels = {
      rotation: -90,
      style: { "height": "30px" },
    }
    EnquiriesCountConfig.config.colors = [ '#64B5F6' ]
    EnquiriesCountConfig.config.yAxis.title = {
      text: intl.formatMessage({ id: 'common.home.text.0.06' }),
    }
    EnquiriesCountConfig.config.series[ 0 ].tooltip = {
      pointFormat: '<span style="color:{point.color}">●</span>' + intl.formatMessage({ id: 'common.home.text.0.06' }) + ' <b>{point.y} ' + intl.formatMessage({ id: 'common.psc.text' }) + '</b><br/>',
    }
    EnquiriesCountConfig.config.series[ 0 ].name = ''
    EnquiriesCountConfig.config.series[ 0 ].data = enquiriesCount.dates.map(item => {
      return [ item.date, item.count ]
    })

    return <HighChart
      key={generate()}
      config={EnquiriesCountConfig.config}
      id="enquiries-count-chart_2"
      ref="enquiries-count-chart_2"
    />
  }

  renderProceduresTopFull = () => {
    const { proceduresTop } = this.props
    if (_.isEmpty(proceduresTop)) return

    return <ReactTable
      defaultPageSize={5}
      data={this.getProceduresTopTableData(this.props.proceduresTop)}
      columns={PROCUREMENT_TOP_COLUMNS}
      showPagination={false}
      sortable={false}
      resizable={false}
      minRows={0}
    />
  }

  renderSwitchCards = () => <div
    className="row margin-top-30 d-flex"
    id="bottom-cards-wrapper"
  >
    <CardContentSwitch
      childrenChart={this.renderOkbrChart()}
      childrenInfo={<CardInfo info={CARDS_DESCRIPTIONS.topOKRB} />}
      defaultChildren={this.renderOkbrInfo()}
      onSwitchCard
    />
    <CardContentSwitch
      childrenChart={<div style={{ overflowY: 'auto' }}>{this.renderProceduresTopFull()}</div>}
      childrenInfo={<CardInfo info={CARDS_DESCRIPTIONS.topProcurement} />}
      defaultChildren={this.renderProceduresTopInfo()}
      onSwitchCard
    />
    <CardContentSwitch
      childrenChart={this.renderEnquiriesCountChart()}
      childrenInfo={<CardInfo info={CARDS_DESCRIPTIONS.enquiryNumber} />}
      defaultChildren={this.renderEnquiriesCountInfo()}
      onSwitchCard
    />
  </div>

  renderCompetitivityDatesAmountChart = data => {
    if (_.isEmpty(data)) return
    const { intl } = this.context
    const CHART_CONFIG = {
      chart: {
        type: 'areaspline',
      },
      credits: {
        enabled: false,
      },
      title: {
        text: '',
      },
      xAxis: {
        categories: data.dates.map(item => {
          return `<span>${item.date}<br /><span class="d-none d-md-block d-lg-block">${this.props.lang === 'ru' ? item.day : getDayTranslate(item.day)}</span></span>`
        }),
        title: {
          text: '',
        },
      },
      yAxis: {
        title: {
          text: intl.formatMessage({ id: 'common.byn.text' }),
        },
        labels: {
          formatter: function () {
            return numeral(this.value).format('0 a')
          },
        },
      },
      series: [
        {
          name: intl.formatMessage({ id: 'common.competitive.text' }),
          color: '#64B5F6',
          lineWidth: 3,
          lineColor: {
            linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
            stops: [
              [ 0, '#64B5F6' ],
              [ 1, '#64B5F680' ],
            ],
          },
          fillColor: {
            linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
            stops: [
              [ 0, '#64B5F650' ],
              [ 1, '#64B5F600' ],
            ],
          },
          data: _.map(data.dates, 'competitiveAmount'),
        },
        {
          name: intl.formatMessage({ id: 'common.noncompetitive.text' }),
          lineWidth: 3,
          color: '#81C784',
          lineColor: {
            linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
            stops: [
              [ 0, '#81C784' ],
              [ 1, '#81C78470' ],
            ],
          },
          fillColor: {
            linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
            stops: [
              [ 0, '#81C78450' ],
              [ 1, '#81C78400' ],
            ],
          },
          data: _.map(data.dates, 'uncompetitiveAmount'),
        },
      ],
      tooltip: {
        pointFormat: '{series.name}: <b>{point.y:,.2f} ' + intl.formatMessage({ id: 'common.byn.text' }) + '</b><br/>',
        valueSuffix: ' cm',
        shared: true,
      },
      plotOptions: {
        series: {
          pointPlacement: 0,
          marker: {
            radius: 0,
            states: {
              hover: {
                radius: 8,
                lineWidth: 5,
                lineWidthPlus: 10,
              },
            },
          },
        },
      },
    }

    return <ReactHighcharts
      key={generate()}
      config={CHART_CONFIG}
      id="competitivityDatesAmountChart"
    />
  }

  renderChartSlider = () => {
    const {
      kpiContractsCount,
      competitivityDatesAmount,
    } = this.props

    const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
    }

    const { intl } = this.context

    return <div className="row margin-top-30 card-slider">
      <div className="col-md-12 left-side-wrapper">
        <Card cardClass="chart-slider-wrapper" marging={'30px 40px'} onMouseMove={this.onMouseMove}
              id={this.state.sliderId}>
          <Slider {...settings}>
            <div className="slider-chart">
              <div className="d-flex flex-row chart-mobile-header">
                <h5 className="align-self-center chart-mobile-title">
                  <FormattedMessage id="common.home.chartSlider.numberOfContracts.label" />
                </h5>
                <h4 className="chart-mobile-value" style={{ marginLeft: 'auto', color: '#4FC3F7' }}>
                  {kpiContractsCount && kpiContractsCount.count && kpiContractsCount.count.toLocaleString('ru') + ' ' + intl.formatMessage({ id: "common.psc.text" })}
                </h4>
              </div>
              {
                this.renderKpiContractsChart(
                  kpiContractsCount,
                  'count',
                  false,
                  intl.formatMessage({ id: 'page.dashboard.text.04' }),
                )
              }
            </div>
            <div className="slider-chart ">
              <div className="d-flex flex-row chart-mobile-header">
                <h5 className="align-self-center">
                  <FormattedMessage id="common.home.chartSlider.distribution.label" />
                </h5>
                <h4 className="chart-mobile-value" style={{ marginLeft: 'auto', color: '#4FC3F7' }}>
                  {competitivityDatesAmount && competitivityDatesAmount.share && numeral(competitivityDatesAmount.share).format('0') + '%'}
                </h4>
              </div>
              {this.renderCompetitivityDatesAmountChart(competitivityDatesAmount)}
            </div>
          </Slider>
        </Card>
      </div>
    </div>
  }

  renderArticles = () => {
    let info = _.cloneDeep(MOCK.ARTICLES)
    return info.map(article => {
      return <Card key={generate()} className="col-md-4 mobile-top-margin">
        <Article
          onClick={this.handleScrollToStory}
          key={generate()}
          title={article.title}
          shortText={article.shortText}
          image={article.img}
          link={article.link}
        />
      </Card>
    })
  }

  handleScrollToStory = () => {
    document.getElementById('page-story').scrollIntoView({ block: 'start', behavior: 'smooth' })
  }

  render() {
    return (
      <div className="Dashboard">
        <div id="page-story" />
        <StoryRoutes />
        <div className="container" id="start-page">
          <div className="row margin-top-30">
            {this.renderMiniKPIs()}
          </div>
          <div className="row mini-chart-cards-wrapper margin-top-30">
            {this.renderMiniCharts()}
          </div>
          {this.renderChartSlider()}
          {this.renderSwitchCards()}
          <div className="row d-flex margin-top-30 articles-wrapper">
            {this.renderArticles()}
          </div>
          <div className="row margin-top-30">
            <div className="col-md-12">
              <Card
                cardFluid
                className="top-five-wrapper"
              >
                <h4 className="table-title">
                  <FormattedMessage id="common.home.text.0.07" />
                </h4>
                <Divider marginTop={30} />
                <ReactTable
                  defaultPageSize={10}
                  data={this.getProceduresTableData(this.props.proceduresSingleSourceTop)}
                  columns={this.getProceduresTableColumns()}
                  showPagination={false}
                  sortable={false}
                  resizable={false}
                  minRows={0}
                />
              </Card>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({
                           dashboard,
                           kpiChart,
                           competitivityDatesAmount,
                           locale,
                         }) => {
  return {
    procuringEntitiesDatesCount: dashboard.procuringEntitiesDatesCount,
    suppliersDatesCount: dashboard.suppliersDatesCount,
    lotsCompleteDatesCount: dashboard.lotsCompleteDatesCount,

    perProcedureLotsCount: kpiChart.perProcedureLotsCount,
    perProcedureOkrbCount: kpiChart.perProcedureOkrbCount,
    perSupplierContractsCount: kpiChart.perSupplierContractsCount,

    competitivityDatesAmount: competitivityDatesAmount.competitivityDatesAmount,

    proceduresSuccessfulCount: dashboard.proceduresSuccessfulCount,
    proceduresAvgPerHour: dashboard.proceduresAvgPerHour,
    proceduresCompetetiveEveryN: dashboard.proceduresCompetetiveEveryN,

    lotsActiveDatesCount: dashboard.lotsActiveDatesCount,
    proceduresTop: dashboard.proceduresTop,
    proceduresSingleSourceTop: dashboard.proceduresSingleSourceTop,
    okbrTop: dashboard.okbrTop,
    enquiriesCount: dashboard.enquiriesCount,
    kpiContractsCount: dashboard.kpiContractsCount,
    kpiContractsAmount: dashboard.kpiContractsAmount,
    lang: locale.lang,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getProcEntDatesCount: bindActionCreators(getProcuringEntitiesDatesCount, dispatch),
    getSuppliersDatesCount: bindActionCreators(getSuppliersDatesCount, dispatch),
    getLotsCompleteDatesCount: bindActionCreators(getLotsCompleteDatesCount, dispatch),
    getLotsActiveDatesCount: bindActionCreators(getLotsActiveDatesCount, dispatch),

    getPerProcedureLotsCount: bindActionCreators(getPerProcedureLotsCount, dispatch),
    getPerSupplierContractsCount: bindActionCreators(getPerSupplierContractsCount, dispatch),
    getPerProcedureOkrbCount: bindActionCreators(getPerProcedureOkrbCount, dispatch),

    getSingleSourceProcurementsTop: bindActionCreators(getSingleSourceProcurementsTop, dispatch),

    getProceduresSuccessfulCount: bindActionCreators(getProceduresSuccessfulCount, dispatch),
    getProceduresAvgPerHour: bindActionCreators(getProceduresAvgPerHour, dispatch),
    getProceduresCompetetiveEveryN: bindActionCreators(getProceduresCompetetiveEveryN, dispatch),

    getKpiContractsCount: bindActionCreators(getKpiContractsCount, dispatch),
    getKpiContractsAmount: bindActionCreators(getKpiContractsAmount, dispatch),

    getOkbrTop: bindActionCreators(getOkbrTop, dispatch),
    getProcurementsTop: bindActionCreators(getProcurementsTop, dispatch),
    getEnquiriesCount: bindActionCreators(getEnquiriesCount, dispatch),

    getCompetitivityDatesAmount: bindActionCreators(getCompetitivityDatesAmount, dispatch),

    changeLocation: bindActionCreators(changeLocation, dispatch),
    setCurrentLocation: bindActionCreators(setCurrentLocation, dispatch),
  }
}

Dashboard.contextTypes = {
  intl: PropTypes.object.isRequired,
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(Dashboard))
