import React, { Fragment, PureComponent } from 'react'
import Highcharts                         from 'highcharts/highcharts'

import { connect }            from "react-redux"
import { bindActionCreators } from "redux"
import _                      from "lodash"

import Slider                       from "react-slick"
import Card                         from "../../card/Card"
import ChartGradMini                from "../../chartGradMini/ChartGradMini"
import BuyersAvgContractsCharts     from "../../buyersAvgContractsCharts/BuyersAvgContractsCharts"
import KpiBuyersSuppliersCountChart from "../../kpiBuyersSuppliersCount/KpiBuyersSuppliersCountChart"

import { ReadMoreTable }                   from "../../readmoretable/ReadMoreTable"
import { generate }                        from "shortid"
import { CARDS_DESCRIPTIONS, ChartConfig } from "../dashboard/mockData"
import CardInfo                            from "../../CardInfo/CardInfo"
import Divider                             from "../../divider/Divider"
import ReactTable                          from "react-table"
import * as numeral                        from "numeral"
import * as classnames                     from "classnames"
import BuyersRegionsSlide                  from "../../buyersRegionsSlide/BuyersRegionsSlide"
import CardContentSwitch                   from "../../cardContentSwitch/CardContentSwitch"
import ReactHighcharts                     from "react-highcharts"
import BelarusMap                          from "../../belarusMap/BelarusMap"
import WorldMap                            from "../../worldMap/WorldMap"
import SuppliersResidencyPieChart          from "../../suppliersResidencyPieChart/SuppliersResidencyPieChart"
import BuyersCapitalBuyersPieChart         from "../../buyersCapitalBuyersPieChart/BuyersCapitalBuyersPieChart"
import Loader                              from "../../loader/Loader"
import * as ReactDOM                       from "react-dom"

import {
  getAverages,
  getBuyersSuppliers,
  getClassAvgPerTopByContAmountRegTopCountAmountOKRB,
  getContComCountAmountDatesCompeCountAmountSuppSABAShare,
  getKPIsProcCContAContCPerSBSCount, getKPIsShareCompleteLotsLotsForSmallScaleBusinessGSWCount,
} from "../../../store/statisticMerge/actions"

import PropTypes                              from "prop-types"
import { FormattedMessage }                   from "react-intl"
import DropdownMenu                           from "../../dropdown/Dropdown"
import moment                                 from "moment"

import './StatisticPage.scss'
import { changeLocation, setCurrentLocation } from "../../../store/navigation/NavActions"


class StatisticPage extends PureComponent {

  static contextTypes = {
    intl: PropTypes.object,
  }

  constructor(props) {
    super(props)
    const loc = window.location.pathname
    props.setCurrentLocation(loc)
    props.changeLocation(loc, loc)
    this.state = {
      yearSelected: 'last',
    }
    this.props.getAverages()
    this.props.getBuyersSuppliers()
    this.props.getClassAvgPerTopByContAmountRegTopCountAmountOKRB()
    this.props.getContComCountAmountDatesCompeCountAmountSuppSABAShare()
    this.props.getKPIsProcCContAContCPerSBSCount()
    this.props.getKPIsShareCompleteLotsLotsForSmallScaleBusinessGSWCount()
  }

  componentDidMount() {
    ReactDOM.findDOMNode(this).scrollIntoView()
    ReactDOM.findDOMNode(this).scrollTop = 0
    window.scrollTo(0, 0)
  }

  renderChartGradMini = (data, title, name, valueKey, isFetching) => {
    if (isFetching) return <Loader isActive={isFetching} />
    if (_.isEmpty(data && data.dates)) return <div>No Data</div>

    return <ChartGradMini
      data={data}
      title={title}
      name={name}
      valueKey={valueKey}
    />
  }

  renderDatesBuyersAvgContractsChart = (data, title, isFetching) => {
    if (_.isEmpty(data)) return <Loader isActive={isFetching} />
    return <BuyersAvgContractsCharts
      data={data}
      title={title}
    />
  }

  renderKpiBuyersSuppliersCountChart = (data, title, isFetching) => {
    if (_.isEmpty(data)) return <Loader isActive={isFetching} />
    return <KpiBuyersSuppliersCountChart
      data={data}
      title={title}
    />
  }

  getClassificationTopTableColumns = () => {
    const { intl } = this.context
    return [
      {
        Header: intl.formatMessage({ id: 'page.statistic.text.058' }),
        accessor: 'description',
        headerClassName: 'table-header',
        Cell: props => <ReadMoreTable charLimit={20} value={props.value} />,
      },
      {
        Header: intl.formatMessage({ id: 'page.statistic.text.059' }),
        accessor: 'id',
        headerClassName: 'table-header',
      },
      {
        Header: intl.formatMessage({ id: 'page.statistic.text.060' }),
        accessor: 'count',
        headerClassName: 'table-header',
      },
      {
        Header: intl.formatMessage({ id: 'page.statistic.text.061' }),
        accessor: 'amount',
        headerClassName: 'table-header',
      },
    ]
  }
  getClassificationTopTableData = data => {
    return _.map(data, item => {
      return {
        id: item.id,
        description: item.description,
        count: item.contract.count,
        amount: _.round(item.contract.amount / 1000000, 2).toLocaleString('ru'),
      }
    })
  }

  getBuyersCompetitiveTableColumns = () => {
    const { intl } = this.context
    return [
      {
        Header: intl.formatMessage({ id: 'page.statistic.text.062' }),
        accessor: 'name',
        Cell: props => <ReadMoreTable charLimit={20} value={props.value} />,
        headerClassName: 'table-header',
      },
      {
        Header: intl.formatMessage({ id: 'page.statistic.text.063' }),
        accessor: 'region',
        headerClassName: 'table-header',
      },
      {
        Header: intl.formatMessage({ id: 'page.statistic.text.060' }),
        accessor: 'count',
        headerClassName: 'table-header',
      },
      {
        Header: intl.formatMessage({ id: 'page.statistic.text.061' }),
        accessor: 'amount',
        headerClassName: 'table-header',
      },
    ]
  }
  getBuyersCompetitiveTableData = data => {
    return _.map(data, (item) => {
      return {
        name: item.name,
        region: item.region,
        count: item.contract.count,
        amount: _.round(item.contract.amount / 1000000, 2).toLocaleString('ru'),
      }
    })
  }

  renderClassificationTopByContractTable = () => {
    return <Fragment>
      <h4 className="table-title">
        <FormattedMessage id="common.home.switchDefault.subjectMatters.label" />
      </h4>
      <Divider marginTop={30} />
      <ReactTable
        defaultPageSize={5}
        data={this.getClassificationTopTableData(this.props.classificationTopByContractAmount)}
        columns={this.getClassificationTopTableColumns()}
        showPagination={false}
        sortable={false}
        resizable={false}
        minRows={0}
      />
    </Fragment>
  }

  renderBuyersCompetitiveTopByContractTable = () => {
    return <Fragment>
      <h4 className="table-title">
        <FormattedMessage id="page.statistic.text.057" />
      </h4>
      <Divider marginTop={30} />
      <ReactTable
        defaultPageSize={5}
        data={this.getBuyersCompetitiveTableData(this.props.buyersCompetitiveTopByContractAmount)}
        columns={this.getBuyersCompetitiveTableColumns()}
        showPagination={false}
        sortable={false}
        resizable={false}
        minRows={0}
      />
    </Fragment>
  }

  renderRegionTopCards = (data, type) => {
    const REGIONS = [
      {
        ru: 'г. Минск',
        en: 'Minsk',
      },
      {
        ru: 'Брестская обл.',
        en: 'Brest region',
      },
      {
        ru: 'Витебская обл.',
        en: 'Vitebsk region',
      },
      {
        ru: 'Гомельская обл.',
        en: 'Gomel region',
      },
      {
        ru: 'Гродненская обл.',
        en: 'Grodno region',
      },
      {
        ru: 'Минская обл.',
        en: 'Minsk region',
      },
      {
        ru: 'Могилевская обл.',
        en: 'Mogilev region',
      },
    ]
    const getLocale = (region) => {
      if (this.props.lang === 'ru') {
        return region
      } else {
        return _.find(REGIONS, o => {
          return o.ru === region
        }).en
      }
    }

    if (_.isEmpty(data)) return
    return _.map(data, item => {
      return <Card key={generate()} className="col">
        <BuyersRegionsSlide
          type={type}
          description={item.description}
          region={getLocale(item.region)}
        />
      </Card>
    })
  }

  getGswAreaStackedChartSeries = (data) => {
    const COLORS = [
      '#64B5F6',
      '#81C784',
      '#E57373',
    ]

    const getItemKey = (inf) => {
      if (this.props.lang === 'ru') {
        return inf
      } else {
        if (inf === 'Товары') {
          return 'Goods'
        } else {
          return 'Services/works'
        }
      }
    }

    let series = {}
    _.forEach(data.dates[ 0 ].gsw, item => {
      series[ item.key.en ] = []
    })

    _.forEach(data.dates, item => {
      _.forEach(item.gsw, value => {
        series[ value.key.en ].push(value.count)
      })
    })

    return _.map(Object.keys(series), (seriesName, index) => {
        return {
          name: getItemKey(seriesName),
          data: series[ seriesName ],
          lineWidth: 3,
          color: COLORS[ index ],
          lineColor: {
            color: COLORS[ index ],
            linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
            stops: [
              [ 0, COLORS[ index ] ],
              [ 1, `${COLORS[ index ]}70` ],
            ],
          },
          fillColor: {
            linearGradient: [ 100, 0, 0, 300 ],
            stops: [
              [ 0, `${COLORS[ index ]}50` ],
              [ 1, `${COLORS[ index ]}00` ],
            ],
          },
        }
      },
    )
  }

  getGswAreaStackedCategories = data => {
    let cat = data.map(item => {
      return item.date
    })
    return cat
  }

  renderGswAreaStackedChart = ({ dates }, isFetching) => {
    const { intl } = this.context
    if (_.isEmpty(dates)) return <Loader isActive={isFetching} />
    let GradientChartConfig = _.cloneDeep(ChartConfig)
    const chartId = `arealine-chart-${generate()}`
    GradientChartConfig.id = chartId

    GradientChartConfig.config = {
      chart: {
        type: 'area',
        height: 400,
      },
      title: {
        text: intl.formatMessage({ id: 'page.statistic.text.019' }),
        align: 'left',
        style: { 'font-weigth': 'bold' },
      },
      credits: {
        enabled: false,
      },
      series: this.getGswAreaStackedChartSeries(this.props.kpiContractsGswCount),
      tooltip: {
        pointFormat: '{series.name}: {point.y:,f} ' + intl.formatMessage({ id: 'common.psc.text' }),
      },
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
      xAxis: {
        categories: this.getGswAreaStackedCategories(dates),
        title: {
          text: intl.formatMessage({ id: 'page.statistic.text.064' }),
        },
      },
      yAxis: {
        title: {
          text: intl.formatMessage({ id: 'page.dashboard.text.04' }),
        },
        labels: {
          formatter: function () {
            return this.value
          },
        },
      },
    }
    return <ReactHighcharts
      key={generate()}
      config={GradientChartConfig.config}
      id="buyers-suppliers-count-pie-chart"
      ref="buyers-suppliers-count-pie-chart"
    />
  }

  getSmallScaleBarChart = () => {
    const { smallScaleSuppliersContractsAmount } = this.props
    const { intl } = this.context
    let smallScaleConfig = _.cloneDeep(ChartConfig)

    smallScaleConfig.id = 'enquiries-count-chart_2'
    smallScaleConfig.config.chart.type = 'column'
    smallScaleConfig.config.title = {
      text: intl.formatMessage({ id: 'page.statistic.text.026' }),
      align: 'left',
      style: { 'font-weigth': 'bold' },
    }
    const getItemKey = (inf) => {
      if (this.props.lang === 'ru') {
        return inf
      } else {
        if (inf === 'Микро') {
          return 'Micro'
        } else if (inf === 'Малые') {
          return 'Small'
        } else {
          return 'Medium'
        }
      }
    }
    smallScaleConfig.config.chart.height = 400
    smallScaleConfig.config.xAxis.categories = smallScaleSuppliersContractsAmount.map(item => {
      return getItemKey(item.key.ru)
    })
    smallScaleConfig.config.xAxis.title = {
      text: "",
    }
    smallScaleConfig.config.colors = [ '#64B5F690' ]
    smallScaleConfig.config.yAxis.title = {
      text: intl.formatMessage({ id: 'common.home.kpiChart.averageCost.label' }),
    }
    smallScaleConfig.config.tooltip = {
      formatter: function () {
        return '<b>' + this.point.name + ': </b>' + Math.round(this.point.y) + ' ' + intl.formatMessage({ id: 'common.mln.text' }) + '. ' + intl.formatMessage({ id: 'common.byn.text' }) + '<br/>'
      },
    }
    smallScaleConfig.config.series[ 0 ].name = ''
    smallScaleConfig.config.series[ 0 ].data = smallScaleSuppliersContractsAmount.map(item => {
      return [ getItemKey(item.key.ru), item.amount / 1000000 ]
    })
    return smallScaleConfig
  }

  renderSmallScaleBarChart = () => {
    const {
      smallScaleSuppliersContractsAmount,
    } = this.props
    if (this.props.buyersSuppliersIsFetching) return <Loader
      isActive={this.props.buyersSuppliersIsFetching}
    />

    if (_.isEmpty(smallScaleSuppliersContractsAmount) || _.isEmpty(smallScaleSuppliersContractsAmount[ 0 ])) return <div>No
      data</div>

    return <ReactHighcharts
      key={generate()}
      config={this.getSmallScaleBarChart().config}
      id="enquiries-count-chart_2"
      ref="enquiries-count-chart_2"
    />
  }

  renderSmallScalePieChart = (data, title, isFetching) => {
    const { intl } = this.context
    if (isFetching) return <Loader isActive={isFetching} />
    const getItemKey = (inf) => {
      if (this.props.lang === 'ru') {
        return inf
      } else {
        if (inf === 'Микро') {
          return 'Micro'
        } else if (inf === 'Малые') {
          return 'Small'
        } else {
          return 'Medium'
        }
      }
    }
    if (_.isEmpty(data) || _.isEmpty(data[ 0 ])) return <div>No data</div>
    let config = {
      chart: {
        height: 400,
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie',
      },
      title: {
        text: intl.formatMessage({ id: 'page.statistic.text.026' }),
        align: 'left',
        style: { 'font-weigth': 'bold' },
      },
      credits: {
        enabled: false,
      },
      colors: [ '#64B5F680', '#81C78480', '#E5737390' ],
      tooltip: {
        formatter: function () {
          return '<b>' + this.point.name + ': </b><br>' + intl.formatMessage({ id: 'page.statistic.text.067' }) + ': ' + numeral(this.point.y).format('0.00') + ' ' + intl.formatMessage({ id: 'common.byn.text' }) + ' <br>' + intl.formatMessage({ id: 'page.statistic.text.066' }) + ': ' + numeral(this.point.percentage).format('0') + '%'
        },
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            format: '<b>{point.percentage:.0f} %</b>',
            distance: -50,
            style: {
              textOutline: false,
              color: '#212121',
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
      series: [
        {
          name: '',
          colorByPoint: true,
        } ],
    }
    config.series = [
      {
        name: getItemKey(title),
        colorByPoint: true,
        data: _.map(data, item => {
          return {
            name: getItemKey(item.key.ru),
            y: item.amount,
          }
        }),
      },
    ]
    return <Fragment>
      <ReactHighcharts
        key={generate()}
        config={config}
        id="buyers-suppliers-count-pie-chart"
        ref="buyers-suppliers-count-pie-chart"
      />
    </Fragment>
  }

  renderGswPieChart = (data, isFetching) => {
    const { intl } = this.context
    if (_.isEmpty(data)) return <Loader isActive={isFetching} />
    const clonedData = _.cloneDeep(data)
    const getItemKey = (inf) => {
      if (this.props.lang === 'ru') {
        return inf
      } else {
        if (inf === 'Товары') {
          return 'Goods'
        } else {
          return 'Services/works'
        }
      }
    }
    let config = {
      chart: {

        height: 400,
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie',
      },
      title: {
        text: intl.formatMessage({ id: 'page.statistic.text.019' }),
        align: 'left',
        style: { 'font-weigth': 'bold' },
      },
      credits: {
        enabled: false,
      },
      tooltip: {
        formatter: function () {
          return '<b>' + this.point.name + ': </b><br>' + intl.formatMessage({ id: 'page.statistic.text.065' }) + ': ' + numeral(this.point.y).format('0') + ' ' + intl.formatMessage({ id: 'common.psc.text' }) + ' <br>' + intl.formatMessage({ id: 'page.statistic.text.066' }) + ': ' + numeral(this.point.percentage).format('0') + '%'
        },
      },
      plotOptions: {
        pie: {
          colors: [ '#64B5F680', '#81C78480' ],
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            format: '<b>{point.percentage:.0f} %</b>',
            distance: -50,
            style: {
              textOutline: false,
              color: '#212121',
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
    }
    config.series = [
      {
        name: intl.formatMessage({ id: 'page.statistic.text.019' }),
        colorByPoint: true,
        data: _.map(clonedData.gsw, item => {
          return {
            name: getItemKey(item.key.en),
            y: item.count,
          }
        }),
      },
    ]
    return <Fragment>
      <ReactHighcharts
        key={generate()}
        config={config}
        id="buyers-suppliers-count-pie-chart"
        ref="buyers-suppliers-count-pie-chart"
      />
    </Fragment>
  }

  renderSmallScaleLotsCountPieChart = (data, title, isFetching) => {
    const { intl } = this.context
    if (_.isEmpty(data)) return <Loader isActive={isFetching} />
    const clonedData = _.cloneDeep(data)
    const getItemKey = (inf) => {
      if (this.props.lang === 'ru') {
        return inf
      } else {
        if (inf === 'МСП') {
          return 'SMEs'
        } else {
          return 'Other'
        }
      }
    }
    let config = {
      chart: {
        height: 400,
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie',
      },
      colors: [ '#81C78480', '#E5737390' ],
      title: {
        text: title,
        align: 'left',
        style: { 'font-weigth': 'bold' },
      },
      credits: {
        enabled: false,
      },
      tooltip: {
        formatter: function () {
          return '<b>' + this.point.name + ': </b><br>' + intl.formatMessage({ id: 'page.statistic.text.065' }) + ': ' + numeral(this.point.y).format('0') + ' ' + intl.formatMessage({ id: 'common.psc.text' }) + ' <br>' + intl.formatMessage({ id: 'page.statistic.text.066' }) + ': ' + numeral(this.point.percentage).format('0') + '%'
        },
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            format: '<b>{point.percentage:.0f} %</b>',
            distance: -80,
            style: {
              textOutline: false,
              color: '#212121',
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
    }
    config.series = [
      {
        name: intl.formatMessage({ id: 'page.statistic.text.019' }),
        colorByPoint: true,
        data: _.map(clonedData.values, item => {
          return {
            name: getItemKey(item.key.ru),
            y: item.count,
          }
        }),
      },
    ]
    return <ReactHighcharts
      key={generate()}
      config={config}
      id="SmallScaleLotsCountPieChart"
      ref="SmallScaleLotsCountPieChart"
    />
  }

  renderSmallScaleLotsCountBarChart = (data, title, isFetching) => {
    if (_.isEmpty(data)) return <Loader isActive={isFetching} />
    const { intl } = this.context
    let clonedData = _.cloneDeep(data)
    let colors = [ '#81C78480', '#E5737390' ]
    const getItemKey = (inf) => {
      if (this.props.lang === 'ru') {
        return inf
      } else {
        if (inf === 'МСП') {
          return 'SMEs'
        } else {
          return 'Other'
        }
      }
    }
    let config = {
      chart: {
        type: 'column',
        height: 400,
      },
      title: {
        text: title,
        align: 'left',
        style: { 'font-weigth': 'bold' },
      },
      xAxis: {
        categories: _.map(clonedData.dates, item => {
          return item.date
        }),
      },
      yAxis: {
        min: 0,
        title: '',
        labels: {
          format: '{value:,.f}',
        },
      },
      tooltip: {
        formatter: function () {
          return '<b>' + this.x + '</b><br/>' + this.series.name + ': ' + numeral(this.point.y).format('0') + ' ' + intl.formatMessage({ id: 'common.psc.text' }) + '<br/><b>' + intl.formatMessage({ id: 'common.total.text' }) + '</b> ' + numeral(this.point.total).format('0') + ' ' + intl.formatMessage({ id: 'common.psc.text' })
        },
      },
      plotOptions: {
        column: {
          stacking: 'normal',
          dataLabels: {
            enabled: false,
            color: 'grey',
          },
        },
      },
      credits: {
        enabled: false,
      },
      series: _.map(clonedData.values, (parent, i) => {
        return {
          color: colors[ i ],
          name: getItemKey(parent.key.ru),
          data: _.map(clonedData.dates, elm => {
            if (elm.values[ i ] === undefined) return 0
            return elm.values[ i ].count
          }),
        }
      }),
    }

    return <ReactHighcharts
      key={generate()}
      config={config}
      id="SmallScaleLotsCountBarChart"
      ref="SmallScaleLotsCountBarChart"
    />
  }

  prepareBelarusMapData = data => {
    let preparedData = _.cloneDeep(data)
    return preparedData.map((item) => {
      return [ item.key.en, item.buyers.count ]
    })
  }
  prepareBelarusMapDict = data => {
    let preparedData = _.cloneDeep(data)
    return _.reduce(preparedData, function (obj, item) {
      obj[ item.key.en ] = item.key.ru
      return obj
    }, {})
  }

  prepareWorldMapData = data => {
    let preparedData = _.cloneDeep(data)
    return {
      data: () => {
        return preparedData.map((item) => {
          return {
            "code": item.key.en,
            "value": item.suppliers.count,
          }
        })
      },
      dictionary: () => {
        return preparedData.reduce((obj, item) => (obj[ item.key.en ] = item.key.ru, obj), {})
      },
    }
  }

  fetchData = (year) => {
    this.props.getAverages({ year: year.value })
    this.props.getBuyersSuppliers({ year: year.value })
    this.props.getClassAvgPerTopByContAmountRegTopCountAmountOKRB({ year: year.value })
    this.props.getContComCountAmountDatesCompeCountAmountSuppSABAShare({ year: year.value })
    this.props.getKPIsProcCContAContCPerSBSCount({ year: year.value })
    this.props.getKPIsShareCompleteLotsLotsForSmallScaleBusinessGSWCount({ year: year.value })
    this.setState({
      yearSelected: year.value,
    })
  }

  getLastThreeYears = () => {
    let options = []
    const { intl } = this.context
    for (let i = 0; i < 3; i++) {
      options.unshift({
        year: moment().subtract(i, 'year').format('YYYY'),
        startDate: moment().subtract(i + 1, 'year').format(),
        endDate: moment().subtract(i, 'year').format(),
      })
    }
    let res = _.map(options, item => {
      return { value: item.year, label: item.year }
    })
    res.push({ value: 'last', label: intl.formatMessage({ id: 'common.365.text' }) })
    return res
  }

  render() {
    const { intl } = this.context

    return (
      <div className="Statistic container">
        <div className="row">
          <div className="col-md-12">
            <div className="range-selector">
              <DropdownMenu
                type="text"
                menuDirection="bottom"
                placeholder="placeholder"
                selectedOption={this.getLastThreeYears().find(item => item.value === this.state.yearSelected)}
                onSelect={this.fetchData}
                options={this.getLastThreeYears()}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <Card cardFluid className="col-md-3 mobile-top-margin" cardClass="h-100 grad-card-chart-wrapper">
            {
              this.renderChartGradMini(
                this.props.kpiProceduresCount,
                intl.formatMessage({ id: 'page.statistic.text.001' }),
                'kpi-procedures-count',
                'count',
                this.props.kpiProcCcaIsFetching,
              )
            }
          </Card>
          <Card cardFluid className="col-md-3 mobile-top-margin" cardClass="h-100 grad-card-chart-wrapper">
            {
              this.renderChartGradMini(
                this.props.kpiContractsAmount,
                intl.formatMessage({ id: 'page.statistic.text.002' }),
                'kpi-contracts-amount',
                'amount',
                this.props.kpiProcCcaIsFetching,
              )
            }
          </Card>
          <Card cardFluid className="col-md-3 mobile-top-margin" cardClass="h-100 grad-card-chart-wrapper">
            {
              this.renderChartGradMini(
                this.props.kpiContractsAmountAvgPerSupplier,
                intl.formatMessage({ id: 'page.statistic.text.003' }),
                'kpi-contracts-amount-avg-per-supplier',
                'avg',
                this.props.kpiProcCcaIsFetching,
              )
            }
          </Card>
          <Card cardFluid className="col-md-3 mobile-top-margin" cardClass="h-100 grad-card-chart-wrapper">
            {
              this.renderChartGradMini(
                this.props.kpiLotsCompletedShare,
                intl.formatMessage({ id: 'page.statistic.text.004' }),
                'kpi-lots-completed-share',
                'share',
                this.props.kpiShareCompLlfsIsFetching,
              )
            }
          </Card>
        </div>
        <div className="row margin-top-30">
          <div className="col-md-12 slider-wrapper slider-kpis-wrapper p-0">
            <Slider {...{
              className: 'h-100',
              dots: false,
              infinite: true,
              speed: 500,
              slidesToScroll: 1,
            }}>
              <Card className="col h-100" cardClass="slider-chart h-100">
                {this.renderDatesBuyersAvgContractsChart(
                  this.props.datesBuyersAvgContracts,
                  intl.formatMessage({ id: 'page.statistic.text.008' }),
                  this.props.datesBuyersAvgContractsIsFetching,
                )}
              </Card>
              <Card className="col" cardClass="slider-chart">
                {this.renderKpiBuyersSuppliersCountChart(
                  this.props.kpiBuyersSuppliersCount,
                  intl.formatMessage({ id: 'page.statistic.text.005' }),
                  this.props.kpiBuyersSuppliersCountIsFetching,
                )}
              </Card>
            </Slider>
          </div>
        </div>
        <div className="row margin-top-30">
          <Card className="col-md-6" cardClass="d-flex flex-row mini-kpi h-100">
            <div className={classnames('mini-kpi-value', 'color-perano')}>
              {
                _.isEmpty(this.props.buyersSuppliers) ?
                  <Loader isActive={this.props.buyersSuppliersIsFetching} theme={'light'} /> :
                  numeral(this.props.topTenSuppliersByContractCount.share).format('0.') + '%'
              }
            </div>
            <Divider borderBottom={0} borderLeft={'1px solid #E9EDF2'} marginLeft={15} width={1} />
            <span className="margin-left-15"><FormattedMessage id="page.statistic.text.012" /></span>
          </Card>
          <Card className="col-md-6 mobile-top-margin" cardClass="d-flex flex-row mini-kpi h-100">
            <div className={classnames('mini-kpi-value', 'color-perano')}>
              {
                _.isEmpty(this.props.buyersSuppliers) ?
                  <Loader isActive={this.props.buyersSuppliersIsFetching} theme={'light'} /> :
                  numeral(this.props.topTenSuppliersByContractAmount.share).format('0.') + '%'
              }
            </div>
            <Divider borderBottom={0} borderLeft={'1px solid #E9EDF2'} marginLeft={15} width={1} />
            <span className="margin-left-15"><FormattedMessage id="page.statistic.text.014" /></span>
          </Card>
        </div>

        <div className="row  margin-top-30">
          {
            !_.isEmpty(this.props.kpiShareCompLlfs) &&
            <CardContentSwitch
              className="col-md-6 mobile-top-margin"
              cardClass="h-100"
              defaultChildren={this.renderGswAreaStackedChart(
                this.props.kpiContractsGswCount,
                this.props.kpiShareCompLlfsIsFetching,
              )}
              childrenInfo={<CardInfo info={CARDS_DESCRIPTIONS.gswDistribution} />}
              childrenChart={this.renderGswPieChart(
                this.props.kpiContractsGswCount,
                this.props.kpiShareCompLlfsIsFetching,
              )}
            />
          }
          <div className="col-md-6">
            <div className="row mini-kpi-row">
              <Card className="col-md-6 mobile-top-margin" cardClass="d-flex flex-row mini-kpi h-100">
                <div className={classnames('mini-kpi-value', 'color-perano')}>
                  {
                    _.isEmpty(this.props.averages) ?
                      <Loader isActive={this.props.averagesIsFetching} theme={'light'} /> :
                      this.props.enquiriesAvgPerProcedure.avg &&
                      this.props.enquiriesAvgPerProcedure.avg.perProcedure &&
                      numeral(this.props.enquiriesAvgPerProcedure.avg.perProcedure).format('0.0')
                  }
                </div>
                <span className="margin-left-15"><FormattedMessage id="page.statistic.text.015" /></span>
              </Card>
              <Card className="col-md-6 mobile-top-margin" cardClass="d-flex flex-row mini-kpi h-100">
                <div className={classnames('mini-kpi-value', 'color-madang')}>
                  {
                    this.props.avgPerBuyerSupplierIsFetching ?
                      <Loader isActive={this.props.avgPerBuyerSupplierIsFetching} theme={'light'} /> :
                      this.props.avgPerBuyerSupplier &&
                      this.props.avgPerBuyerSupplier.avg &&
                      numeral(this.props.avgPerBuyerSupplier.avg.perBuyer).format('0.')
                  }
                </div>
                <span
                  className="margin-left-15"><FormattedMessage id="page.statistic.text.016" /></span>
              </Card>
            </div>
            <div className="row margin-top-30 mini-kpi-row">
              <Card className="col-md-6 mobile-top-margin" cardClass="d-flex flex-row mini-kpi h-100">
                <div className={classnames('mini-kpi-value', 'color-madang')}>
                  {
                    _.isEmpty(this.props.averages) ?
                      <Loader isActive={this.props.averagesIsFetching} theme={'light'} /> :
                      this.props.proceduresCountPerMonth.avg &&
                      this.props.proceduresCountPerMonth.avg.perMonth &&
                      numeral(this.props.proceduresCountPerMonth.avg.perMonth / 1000).format('0.')
                  }
                </div>
                <span className="margin-left-15"><FormattedMessage id="page.statistic.text.017" /></span>
              </Card>
              <Card className="col-md-6 mobile-top-margin" cardClass="d-flex flex-row mini-kpi h-100">
                <div className={classnames('mini-kpi-value', 'color-perano')}>
                  {
                    _.isEmpty(this.props.contComCount) ?
                      <Loader isActive={this.props.contComCountIsFetching} theme={'light'} /> :
                      numeral(this.props.contractBudgetAmountShare.amountShare).format('0.') + '%'
                  }
                </div>
                <span className="margin-left-15"><FormattedMessage id="page.statistic.text.018" /></span>
              </Card>
            </div>
          </div>
        </div>
        <div className="row margin-top-30">
          <CardContentSwitch
            className="col-md-6 mobile-top-margin"
            cardClass="h-100"
            defaultChildren={this.renderSmallScaleLotsCountPieChart(
              this.props.smallScaleBusinessLotsCount,
              intl.formatMessage({ id: 'page.statistic.text.023' }),
              this.props.smallScaleBusinessLotsCountIsFetching,
            )}
            childrenInfo={<CardInfo info={CARDS_DESCRIPTIONS.mmBusinessLots} />}
            childrenChart={this.renderSmallScaleLotsCountBarChart(
              this.props.smallScaleBusinessLotsCount,
              intl.formatMessage({ id: 'page.statistic.text.022' }),
              this.props.smallScaleBusinessLotsCountIsFetching,
            )}
          />
          <CardContentSwitch
            className="col-md-6 mobile-top-margin"
            cardClass="h-100"
            defaultChildren={this.renderSmallScaleBarChart()}
            childrenInfo={<CardInfo info={CARDS_DESCRIPTIONS.mmBusinessContractsAmount} />}
            childrenChart={this.renderSmallScalePieChart(
              this.props.smallScaleSuppliersContractsAmount,
              'КОЛИЧЕСТВО СУБЪЕКТОВ МСБ - ОРГАНИЗАЦИЙ ПОСТАВЩИКОВ',
              this.props.buyersSuppliersIsFetching,
            )}
          />
        </div>
        <div className="row margin-top-30">
          <div className="col-md-12 slider-wrapper slider-kpis-wrapper slider-mini-kpis-wrapper p-0">
            {
              this.props.okrbRegionTopCountIsFetching ?
                <Loader isActive={this.props.okrbRegionTopCountIsFetching} /> :
                <Slider {...{
                  dots: false,
                  infinite: true,
                  speed: 500,
                  slidesToScroll: 1,
                  slidesToShow: 3,
                  responsive: [
                    {
                      breakpoint: 1024,
                      settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3,
                        infinite: true,
                        dots: true,
                      },
                    },
                    {
                      breakpoint: 600,
                      settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        initialSlide: 1,
                      },
                    },
                  ],
                }}>
                  {
                    this.renderRegionTopCards(this.props.okrbRegionTopCount, 'count')
                  }
                </Slider>
            }
          </div>
        </div>
        <div className="row margin-top-30">
          <div className="col-md-12 slider-wrapper slider-kpis-wrapper slider-mini-kpis-wrapper p-0">
            {
              this.props.okrbRegionTopAmountIsFetching ?
                <Loader isActive={this.props.okrbRegionTopAmountIsFetching} /> :
                <Slider {...{
                  dots: false,
                  infinite: true,
                  speed: 500,
                  slidesToScroll: 1,
                  slidesToShow: 3,
                  responsive: [
                    {
                      breakpoint: 1024,
                      settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3,
                        infinite: true,
                        dots: true,
                      },
                    },
                    {
                      breakpoint: 600,
                      settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        initialSlide: 1,
                      },
                    },
                  ],
                }}>
                  {
                    this.renderRegionTopCards(this.props.okrbRegionTopAmount, 'amount')
                  }
                </Slider>
            }
          </div>
        </div>
        <div className="row margin-top-30">
          <div className="col-md-12 slider-wrapper slider-kpis-wrapper p-0">
            <Slider {...{
              dots: false,
              infinite: true,
              speed: 500,
            }}>
              <div className="d-flex">
                <Card className="col-sm-12 col-md-7" cardClass="h-100">
                  {
                    this.props.buyersRegionsBuyersCountIsFetching ?
                      <Loader isActive={this.props.buyersRegionsBuyersCountIsFetching} /> :
                      !_.isEmpty(this.props.buyersRegionsBuyersCount) &&
                      <BelarusMap data={this.prepareBelarusMapData(this.props.buyersRegionsBuyersCount)}
                                  pureData={this.props.buyersRegionsBuyersCount}
                                  countriesDict={this.prepareBelarusMapDict(this.props.buyersRegionsBuyersCount)}
                                  lang={this.props.lang} />
                  }
                </Card>
                <div className="col-md-5 d-none d-md-block d-lg-block">
                  <div className="row">
                    <Card className="col-sm-12">
                      {
                        this.props.suppliersResidencyCountIsFetching ?
                          <Loader isActive={this.props.suppliersResidencyCountIsFetching} /> :
                          <SuppliersResidencyPieChart data={this.props.suppliersResidencyCount}
                                                      lang={this.props.lang} />
                      }
                    </Card>
                  </div>
                  <div className="row margin-top-30">
                    <Card className="col-sm-12">
                      {
                        this.props.buyersRegionsCapitalCountIsFetching ?
                          <Loader isActive={this.props.buyersRegionsCapitalCountIsFetching} /> :
                          <BuyersCapitalBuyersPieChart data={this.props.buyersRegionsCapitalCount}
                                                       lang={this.props.lang} />
                      }
                    </Card>
                  </div>
                </div>
              </div>
              <Card className="col-md-12" cardClass="h-100">
                {
                  this.props.suppliersRegionsSuppliersCountIsFetching ?
                    <Loader isActive={this.props.suppliersRegionsSuppliersCountIsFetching} /> :
                    !_.isEmpty(this.props.suppliersRegionsSuppliersCount) &&
                    <WorldMap
                      data={this.prepareWorldMapData(this.props.suppliersRegionsSuppliersCount).data()}
                      countriesDict={this.prepareWorldMapData(this.props.suppliersRegionsSuppliersCount).dictionary()}
                      lang={this.props.lang}
                    />
                }
              </Card>
            </Slider>
          </div>
        </div>
        <div className="row margin-top-30">
          <div className="col-md-12 slider-wrapper slider-chart-wrapper p-0">
            <Slider {...{
              dots: false,
              infinite: true,
              speed: 500,
              slidesToScroll: 1,
            }}>
              <Card className="col h-100" cardClass="slider-chart h-100 chart-mobile-header">
                <h4><FormattedMessage id="page.statistic.text.041" /></h4>
                {
                  this.props.ContractsCompetetiveCountAmountIsFetching ?
                    <Loader isActive={this.props.ContractsCompetetiveCountAmountIsFetching} /> :
                    this.props.ContractsCompetetiveCountAmount && this.props.ContractsCompetetiveCountAmount.competitive &&
                    <ReactHighcharts
                      key={generate()}
                      config={{
                        title: {
                          text: '',
                        },
                        xAxis: {
                          categories: _.map(this.props.datesContractsCompetitiveCountAmount, 'date'),
                        },
                        yAxis: {
                          labels: {
                            format: '{value:,.0f}',
                          },
                          title: {
                            text: intl.formatMessage({ id: 'page.statistic.text.042' }),
                          },
                        },
                        labels: {
                          items: [ {
                            style: {
                              left: '50px',
                              top: '18px',
                              color: (Highcharts.theme && Highcharts.theme.textColor) || 'black',
                            },
                          } ],
                        },
                        credits: {
                          enabled: false,
                        },
                        series: [ {
                          tooltip: {
                            pointFormat: '<span style="color:{point.color}">●</span> {series.name}: <b>{point.y:,.0f}) ' + intl.formatMessage({ id: 'common.psc.text' }) + '</b><br/>',
                          },
                          color: '#81C78480',
                          borderColor: '#81C784',
                          type: 'column',
                          name: intl.formatMessage({ id: 'page.statistic.text.043' }),
                          data: _.map(this.props.datesContractsCompetitiveCountAmount, item => {
                            return item.competitive.count
                          }),
                        }, {
                          tooltip: {
                            pointFormat: '<span style="color:{point.color}">●</span> {series.name}: <b>{point.y:,.0f} ' + intl.formatMessage({ id: 'common.psc.text' }) + '</b><br/>',
                          },
                          type: 'column',
                          name: intl.formatMessage({ id: 'page.statistic.text.044' }),
                          color: '#64B5F680',
                          borderColor: '#64B5F6',
                          data: _.map(this.props.datesContractsCompetitiveCountAmount, item => {
                            return item.uncompetitive.count
                          }),
                        },
                          {
                            tooltip: {
                              formatter: function () {
                                return '<b>' + this.point.name + ': </b><br>' + intl.formatMessage({ id: 'page.statistic.text.065' }) + ': ' + numeral(this.point.y).format('0') + ' ' + intl.formatMessage({ id: 'common.psc.text' }) + ' <br>' + intl.formatMessage({ id: 'page.statistic.text.066' }) + ': ' + numeral(this.point.percentage).format('0') + '%'
                              },
                            },
                            type: 'pie',
                            name: intl.formatMessage({ id: 'page.statistic.text.065' }),
                            data: [ {
                              name: intl.formatMessage({ id: 'page.statistic.text.043' }),
                              y: this.props.ContractsCompetetiveCountAmount.competitive.count,
                              color: '#81C78480',
                            }, {
                              name: intl.formatMessage({ id: 'page.statistic.text.044' }),
                              y: this.props.ContractsCompetetiveCountAmount.uncompetitive.count,
                              color: '#64B5F680',
                            } ],
                            center: [ 100, 80 ],
                            size: 100,
                            showInLegend: false,
                            dataLabels: {
                              enabled: true,
                              style: {
                                textOutline: false,
                                color: '#434343',
                              },
                              format: '<b>{point.percentage:.0f} %</b>',
                              distance: -15,
                              filter: {
                                property: 'percentage',
                                operator: '>',
                                value: 4,
                              },
                            },
                          } ],
                      }}
                      id="buyers-suppliers-count-pie-chart"
                      ref="buyers-suppliers-count-pie-chart"
                    />
                }
              </Card>
              {
                this.props.procedureTypesContractsAmountIsFetching ?
                  <Loader isActive={this.props.procedureTypesContractsAmountIsFetching} /> :
                  !_.isEmpty(this.props.procedureTypesContractsAmount) &&
                  <Card className="col h-100" cardClass="slider-chart h-100 chart-mobile-header">
                    <h4><FormattedMessage id="page.statistic.text.040" /></h4>
                    <ReactHighcharts
                      key={generate()}
                      config={{
                        chart: {
                          type: 'area',
                        },
                        colors: [ '#64B5F680', '#81C78480', '#E5737380', '#FFB74D80', '#81908880', '#81908880', '#49586580' ],
                        credits: {
                          enabled: false,
                        },
                        title: {
                          text: '',
                        },
                        subtitle: {
                          text: '',
                        },
                        xAxis: {
                          categories: _.map(this.props.procedureTypesContractsAmount, item => {
                            return item.date
                          }),
                          tickmarkPlacement: 'on',
                          title: {
                            enabled: false,
                          },
                        },
                        yAxis: {
                          title: {
                            text: intl.formatMessage({ id: 'page.statistic.text.046' }),
                          },
                        },
                        tooltip: {
                          pointFormat: '<span style="color:{series.color}">\u25CF</span><span><b>{series.name}</b></span>: {point.y:,.0f} ' + intl.formatMessage({ id: 'common.byn.text' }) + '<br/>',
                          shared: true,
                        },
                        plotOptions: {
                          area: {
                            stacking: 'percent',
                            lineColor: '#ffffff',
                            lineWidth: 1,
                            marker: {
                              lineWidth: 1,
                              lineColor: '#ffffff',
                            },
                          },
                        },
                        series: this.getProcedureTypesSeries(),
                      }}
                      id="buyers-suppliers-count-pie-chart"
                      ref="buyers-suppliers-count-pie-chart"
                    />
                  </Card>
              }
            </Slider>
          </div>
        </div>
        <div className="row margin-top-30">
          <Card cardFluid className="col-md-6" cardClass="h-100">
            {
              this.props.classificationTopByContractAmountIsFetching ?
                <Loader isActive={this.props.classificationTopByContractAmountIsFetching} /> :
                this.renderClassificationTopByContractTable()
            }
          </Card>
          <Card cardFluid className="col-md-6 mobile-top-margin" cardClass="h-100">
            {
              this.props.buyersCompetitiveTopByContractAmountIsFetching ?
                <Loader isActive={this.props.buyersCompetitiveTopByContractAmountIsFetching} /> :
                this.renderBuyersCompetitiveTopByContractTable()
            }
          </Card>
        </div>
      </div>
    )
  }

  getProcedureTypesSeries = () => {
    let series = {}
    const getItemKey = (inf) => {
      if (this.props.lang === 'ru') {
        return inf
      } else {
        if (inf === 'Аукцион') {
          return 'Auction'
        } else if (inf === 'Открытый конкурс') {
          return 'Open tender'
        } else if (inf === 'Открытый конкурс в электронном виде') {
          return 'Electronic open tender'
        } else if (inf === 'Иной вид процедуры закупки') {
          return 'Other types of procedures'
        } else {
          return 'Construction-related procurement'
        }
      }
    }
    _.forEach(this.props.procedureTypesContractsAmount, item => {
      _.forEach(item.values, value => {
        if (!_.includes(_.keys(series), value.key.ru)) {
          series[ value.key.ru ] = []
        }
        series[ value.key.ru ].push(value.amount)
      })
    })
    return _.map(Object.keys(series), seriesName => {
        return { name: getItemKey(seriesName), data: series[ seriesName ] }
      },
    )
  }
}

const mapStateToProps = ({
                           statisticState,
                           locale,
                         }) => {
  return {

    kpiProceduresCount: statisticState.kpiProcCca.kpiProceduresCount,
    kpiContractsAmount: statisticState.kpiProcCca.kpiContractsAmount,
    kpiContractsAmountAvgPerSupplier: statisticState.kpiProcCca.kpiContractsCountPerSupplier,
    kpiLotsCompletedShare: statisticState.kpiShareCompLlfs.kpiShareCompleteLots,

    datesBuyersAvgContracts: statisticState.contComCount.contractsPerBuyerCountAmount,
    kpiBuyersSuppliersCount: statisticState.kpiProcCca.kpiBuyersSuppliersCount,

    topTenSuppliersByContractCount: statisticState.buyersSuppliers.top10SuppliersShareByContractCount,
    topTenSuppliersByContractAmount: statisticState.buyersSuppliers.top10SuppliersShareByContractAmount,

    smallScaleSuppliersContractsAmount: statisticState.buyersSuppliers.suppliersByScaleAmount,
    smallScaleSuppliersContractsAmountIsFetching: statisticState.buyersSuppliers.suppliersByScaleAmount,

    enquiriesAvgPerProcedure: statisticState.averages.enquiriesPerProcedure,
    avgPerBuyerSupplier: statisticState.classAvgPer.classificationAvgPerBuyer,
    proceduresCountPerMonth: statisticState.averages.proceduresCountPerMonth,
    contractBudgetAmountShare: statisticState.contComCount.budgetAmountShare,

    okrbRegionTopAmount: statisticState.classAvgPer.regionsWithTopAmountOKRB,
    okrbRegionTopCount: statisticState.classAvgPer.regionsWithTopCountOKRB,

    buyersRegionsCapitalCount: statisticState.buyersSuppliers.buyersCapitalBuyerCount,
    buyersRegionsBuyersCount: statisticState.buyersSuppliers.buyersRegionBuyerCount,
    suppliersRegionsSuppliersCount: statisticState.buyersSuppliers.suppliersCountriesSuppliersCount,

    classificationTopByContractAmount: statisticState.classAvgPer.topOKRBByContractsAmount,
    buyersCompetitiveTopByContractAmount: statisticState.buyersSuppliers.topCompetitiveBuyersByContractsAmount,

    datesContractsCompetitiveCountAmount: statisticState.contComCount.datesContractsCompetitiveCountAmount,
    procedureTypesContractsAmount: statisticState.contComCount.procedureTypesContractsAmount,

    kpiContractsGswCount: statisticState.kpiShareCompLlfs.kpiGSWCount,
    smallScaleBusinessLotsCount: statisticState.kpiShareCompLlfs.kpiLotsForSmallScaleBusiness,
    suppliersResidencyCount: statisticState.buyersSuppliers.residencyDistribution,
    ContractsCompetetiveCountAmount: statisticState.contComCount.contractsCompetitiveCountAmount,

    kpiProcCca: statisticState.kpiProcCca,
    kpiProcCcaIsFetching: statisticState.kpiProcCcaIsFetching,

    kpiShareCompLlfs: statisticState.kpiShareCompLlfs,
    kpiShareCompLlfsIsFetching: statisticState.kpiShareCompLlfsIsFetching,

    contComCount: statisticState.contComCount,
    contComCountIsFetching: statisticState.contComCountIsFetching,

    buyersSuppliers: statisticState.buyersSuppliers,
    buyersSuppliersIsFetching: statisticState.buyersSuppliersIsFetching,

    averages: statisticState.averages,
    averagesIsFetching: statisticState.averagesIsFetching,

    classAvgPer: statisticState.classAvgPer,
    lang: locale.lang,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    getAverages: bindActionCreators(getAverages, dispatch),
    getBuyersSuppliers: bindActionCreators(getBuyersSuppliers, dispatch),
    getClassAvgPerTopByContAmountRegTopCountAmountOKRB: bindActionCreators(getClassAvgPerTopByContAmountRegTopCountAmountOKRB, dispatch),
    getContComCountAmountDatesCompeCountAmountSuppSABAShare: bindActionCreators(getContComCountAmountDatesCompeCountAmountSuppSABAShare, dispatch),
    getKPIsProcCContAContCPerSBSCount: bindActionCreators(getKPIsProcCContAContCPerSBSCount, dispatch),
    getKPIsShareCompleteLotsLotsForSmallScaleBusinessGSWCount: bindActionCreators(getKPIsShareCompleteLotsLotsForSmallScaleBusinessGSWCount, dispatch),

    changeLocation: bindActionCreators(changeLocation, dispatch),
    setCurrentLocation: bindActionCreators(setCurrentLocation, dispatch),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(StatisticPage)
