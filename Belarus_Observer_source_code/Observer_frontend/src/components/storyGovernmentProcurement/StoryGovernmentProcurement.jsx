import React, { Fragment }    from 'react'
import { bindActionCreators } from 'redux'
import { generate }           from 'shortid'
import _                      from 'lodash'
import { connect }            from 'react-redux'

import ReactHighcharts from 'react-highcharts'
import ReactMaps       from 'react-highcharts/ReactHighmaps'
import HighchartsMore  from 'highcharts/highcharts-more'

import { getStoryGovernmentProcurement } from '../../store/stories/storyGovernmentProcurement/actions'

import {
  BUBBLES_CHART_CONFIG,
  COUNTRY_RANKING_BAR_CHART_CONFIG,
  DISTRIBUTION_OF_SUPPLIER_COUNTRIES_CONFIG,
  POLYGON_CHART_CONFIG,
  SUPPLIER_GEOGRAPHY_MAP_CONFIG,
  TOP_RESIDENT_NON_RESIDENT_OKRBS_MAP_CONFIG,
}                   from './constants'
import Highcharts   from 'highcharts'
import TreemapChart from './TreemapChart'

import {
  HighchartsChart,
  withHighcharts,
  Title,
  XAxis,
  YAxis,
  TreemapSeries,
  Legend,
}                           from 'react-jsx-highcharts'
import './StoryGovernmentProcurement.scss'
import Loader               from '../loader/Loader'
import * as numeral         from 'numeral'
import SlideArrow           from "../slideArrow/SlideArrow"
import PropTypes            from "prop-types"
import { FormattedMessage } from "react-intl"


HighchartsMore(ReactHighcharts.Highcharts)

class StoryGovernmentProcurement extends React.Component {

  static contextTypes = {
    intl: PropTypes.object,
  }

  _isMounted = false

  constructor(props) {
    super(props)
    _.isEmpty(props.governmentProcurement) && this.props.getStoryGovernmentProcurement()
  }

  componentDidMount() {
    this._isMounted = true
  }

  componentWillUnmount() {
    this._isMounted = false
  }

  prepareSupplierGeographyConfig = data => {
    const self = this
    const { intl } = this.context
    let conf = _.cloneDeep(SUPPLIER_GEOGRAPHY_MAP_CONFIG)
    conf.series[ 0 ].data = data.map((item) => {
      return {
        'code': item.key.en,
        'value': item.suppliers.count,
      }
    })
    conf.title.text = intl.formatMessage({ id: 'common.supplierGeography.text' })
    conf.legend.title.text = intl.formatMessage({ id: 'common.numberOfSuppliers.text' })
    conf.tooltip = {
      formatter: function () {
        const obj = _.find(data, (o) => {
          return o.key.en === this.point.code
        })
        const countryName = self.props.lang === 'ru' ? obj.key.ru : this.point.name
        return '<b>' + countryName + '</b><br>' +
          intl.formatMessage({ id: 'common.suppliers.text' }) + ': <b>' + this.point.value + '</b>'
      },
    }
    return conf
  }

  renderSupplierGeographyChart = () => {
    if (_.isEmpty(this.props.governmentProcurement.suppliersCountriesSuppliersCount))
      return <Loader
        theme="light"
        isActive={_.isEmpty(this.props.governmentProcurement.suppliersCountriesSuppliersCount)}
      />
    return <ReactMaps
      key={generate()}
      config={this.prepareSupplierGeographyConfig(this.props.governmentProcurement.suppliersCountriesSuppliersCount)}
      id="world-map-chart"
      ref="world-map-chart"
    />
  }

  prepareBelarusMapDict = data => {
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
    let preparedData = _.cloneDeep(data)
    return {
      ru: _.reduce(preparedData, function (obj, item) {
        obj[ item.key.en ] = item.key.ru
        return obj
      }, {}),
      en: _.reduce(preparedData, function (obj, item) {
        obj[ item.key.en ] = _.find(REGIONS, o => {
          return o.ru === item.key.ru
        }).en
        return obj
      }, {}),
    }
  }

  prepareTopResidentNonResidentOkrbsConfig = data => {
    const { intl } = this.context
    const self = this
    const conf = _.cloneDeep(TOP_RESIDENT_NON_RESIDENT_OKRBS_MAP_CONFIG)
    conf.title.text = intl.formatMessage({ id: "page.statistic.text.085" })
    conf.series[ 0 ].name = intl.formatMessage({ id: "page.statistic.text.086" })
    conf.series[ 0 ].data = data.map((item) => {
      return [ item.key.en, item.amount ]
    })
    conf.legend.min = this.getMinGovernmentProcurementNonResSupp()
    conf.series[ 0 ].dataLabels = {
      enabled: true,
      formatter: function () {
        return self.props.lang === 'ru' ? self.prepareBelarusMapDict(data).ru[ this.point[ 'hc-key' ] ] : self.prepareBelarusMapDict(data).en[ this.point[ 'hc-key' ] ]
      },
    }
    conf.colorAxis = {
      labels: {
        style: {
          'color': '#FFFFFF',
        },
        formatter: function () {
          return numeral(this.value).format('0 a')
        },
      },
      tickPositioner: function (min, max) {
        return [ min, min + (max - min) * (1 / 3), min + (max - min) * (2 / 3), max ]
      },
    }
    conf.tooltip = {
      formatter: function () {
        const obj = _.find(data, (o) => {
          return o.key.en === this.point.options[ 'hc-key' ]
        })
        const countryName = self.props.lang === 'ru' ? obj.key.ru : this.point.name
        return '<b>' + countryName + '</b><br>' +
          intl.formatMessage({ id: 'common.suppliers.text' }) + ':<b>' + this.point.value + '</b>'
      },
    }
    return conf
  }

  renderTopResidentNonResidentOkrbsMap = () => {
    if (_.isEmpty(this.props.governmentProcurement.topResidentNonResidentOkrbs))
      return <Loader
        theme="light"
        isActive={_.isEmpty(this.props.governmentProcurement.topResidentNonResidentOkrbs)}
      />

    return <ReactMaps
      key={generate()}
      config={this.prepareTopResidentNonResidentOkrbsConfig(this.props.governmentProcurement.topResidentNonResidentOkrbs)}
      id="belarus-story-map-chart"
      ref="belarus-story-map-chart"
    />
  }

  prepareCountryRankingBarChartData = data => {
    const { intl } = this.context
    const self = this
    let conf = _.cloneDeep(COUNTRY_RANKING_BAR_CHART_CONFIG)
    conf.title.text = intl.formatMessage({ id: 'page.statistic.text.080' })
    const getGountryLocale = ruKey => {
      switch (ruKey) {
        case 'Швейцария': {
          return 'Switzerland'
        }
        case 'Эстония': {
          return 'Estonia'
        }
        case "Соединенное Королевство Великобритании и Северной Ирландии": {
          return 'United Kingdom of Great Britain and Northern Ireland'
        }
        case 'Австрия': {
          return 'Austria'
        }
        case 'Латвия': {
          return 'Latvia'
        }
        case 'Германия': {
          return 'Germany'
        }
        case 'Российская Федерация': {
          return 'Russian Federation'
        }
        case 'Соединенные Штаты Америки': {
          return 'USA'
        }
        case 'Италия': {
          return 'Italy'
        }
        case 'Польша': {
          return 'Poland'
        }
        default: {
          return ruKey
        }
      }
    }
    conf.xAxis.categories = data.map((item, i) => {
      return this.props.lang === 'ru' ? item.key.ru : getGountryLocale(item.key.ru)
    })
    conf.tooltip = {
      // useHTML: true,
      formatter: function () {
        const name = self.props.lang === 'ru' ? this.point.name : getGountryLocale(this.point.name)
        return '<span>' + name +
          ': <b>' + numeral(this.point.y).format('0 a') + ' ' + intl.formatMessage({ id: 'common.byn.text' }) + '</b>'
          + '</span>'
      },
    }
    const colors = [ '#AB47BC', '#5C6BC0', '#29B6F6', '#26A69A', '#9CCC65', '#FFEE58', '#FFA726', '#78909C', '#EC407A', '#FFEE58' ]

    conf.series[ 0 ].data = _.map(data, (parent, i) => {
      return { name: parent.key.ru, y: parent.amount, color: colors[ i ] }
    })
    return conf
  }

  renderCountryRankingBarChart = () => {
    if (_.isEmpty(this.props.governmentProcurement.topNonResidentCountries))
      return <Loader
        theme="light"
        isActive={_.isEmpty(this.props.governmentProcurement.topNonResidentCountries)}
      />

    return <ReactHighcharts
      key={generate()}
      config={this.prepareCountryRankingBarChartData(this.props.governmentProcurement.topNonResidentCountries)}
      id="CountryRankingBarChart"
      ref="CountryRankingBarChart"
    />
  }

  prepareDistributionOfSupplierCountriesConfig = data => {
    const { intl } = this.context
    let conf = _.cloneDeep(DISTRIBUTION_OF_SUPPLIER_COUNTRIES_CONFIG)
    conf.title.text = intl.formatMessage({ id: 'page.statistic.text.081' })
    conf.tooltip = {
      formatter: function () {
        return '<b>' + this.point.name + ': </b><br> ' + intl.formatMessage({ id: 'page.statistic.text.065' }) + ': <b>' + numeral(this.point.y).format('0 a') + ' ' + intl.formatMessage({ id: 'common.byn.text' }) + '</b><br> ' + intl.formatMessage({ id: 'page.statistic.text.066' }) + ': <b>' + numeral(this.point.percentage).format('0') + '%</b>'
      },
    }
    conf.series[ 0 ].data = _.map(data, item => {
      return {
        name: item.key.en === 'top' ? intl.formatMessage({ id: 'page.statistic.text.082' }) : intl.formatMessage({ id: 'page.statistic.text.083' }),
        y: item.amount,
      }
    })
    return conf
  }

  renderDistributionOfSupplierCountries = () => {
    if (_.isEmpty(this.props.governmentProcurement.contractsOfTopAndNonTopNonResidentCountries))
      return <Loader
        theme="light"
        isActive={_.isEmpty(this.props.governmentProcurement.contractsOfTopAndNonTopNonResidentCountries)}
      />

    return <ReactHighcharts
      key={generate()}
      config={this.prepareDistributionOfSupplierCountriesConfig(this.props.governmentProcurement.contractsOfTopAndNonTopNonResidentCountries)}
      id="DistributionOfSupplierCountriesChart"
      ref="DistributionOfSupplierCountriesChart"
    />
  }

  prepareBubblesChartConfig = data => {
    const TEXT = [
      {
        ru: 'СНГ',
        en: 'CIS countries',
      },
      {
        ru: 'Евразийский экономический союз',
        en: 'Eurasian Economic Union',
      },
      {
        ru: 'Соседи',
        en: 'Neighbors',
      },
      {
        ru: 'Европейский союз',
        en: 'European Union',
      },
      {
        ru: 'Североамериканская зона свободной торговли (NAFTA)',
        en: 'North American Free Trade Zone (NAFTA)',
      },
      {
        ru: 'Азиатско-Тихоокеанское экономическое сотрудничество (АТЭС)',
        en: 'Asia-Pacific Economic Cooperation (APEC)',
      },
    ]
    const { intl } = this.context
    let conf = _.cloneDeep(BUBBLES_CHART_CONFIG)
    const colors = [ '#ef5350', '#AB47BC', '#5C6BC0', '#29B6F6', '#26A69A', '#9CCC65', '#FFEE58', '#FFA726' ]
    conf.xAxis.title.text = intl.formatMessage({ id: 'page.dashboard.text.05' })
    conf.yAxis.title.text = intl.formatMessage({ id: 'page.statistic.text.060' })
    conf.tooltip = {
      // useHTML: true,
      formatter: function () {
        return '<dl>' +
          '<dt><b><h5>' + this.point.name + '</h5></b></dt><br>' +
          '<dd>' + intl.formatMessage({ id: 'page.statistic.text.060' }) + ': <b>' + this.point.y + ' ' + intl.formatMessage({ id: 'common.mln.text' }) + '</b></dd><br>' +
          '<dd>' + intl.formatMessage({ id: 'page.dashboard.text.05' }) + ': <b>' + numeral(this.point.x).format(`0 a`) + ' ' + intl.formatMessage({ id: 'common.byn.text' }) + '</b></dd><br>' +
          '<dd>' + intl.formatMessage({ id: 'common.numberOfSuppliers.text' }) + ': <b>' + this.point.z + '</b></dd>' +
          '</dl>'
      },
    }

    const getLocale = (item) => {
      let obj = _.find(TEXT, o => {
        return o.ru === item.key.ru
      })
      if (this.props.lang === 'ru') {
        return obj.ru
      } else {
        return obj.en
      }
    }

    conf.series = data.map((item, i) => {
      return {
        name: getLocale(item),
        data: [
          {
            x: parseInt(item.contracts.amount),
            y: parseInt(item.contracts.count),
            z: parseInt(item.suppliers.count),
            name: getLocale(item),
            color: colors[ i ],
          },
        ],
      }
    })
    return conf
  }

  renderBubblesChart = () => {
    if (_.isEmpty(this.props.governmentProcurement.countriesContractsAmountCountSuppliers))
      return <Loader
        theme="light"
        isActive={_.isEmpty(this.props.governmentProcurement.countriesContractsAmountCountSuppliers)}
      />
    return <ReactHighcharts
      key={generate()}
      config={this.prepareBubblesChartConfig(this.props.governmentProcurement.countriesContractsAmountCountSuppliers)}
      id="TopFiveItemsOfPurchaseChart"
      ref="TopFiveItemsOfPurchaseChart"
    />
  }

  preparePolygonChartConfig = data => {
    const { intl } = this.context

    let config = _.cloneDeep(POLYGON_CHART_CONFIG)
    config.title.text = intl.formatMessage({ id: "page.statistic.text.084" })
    const primaryColors = [ '#aeccaf', '#a3d6ff', '#f5acac', '#ffd699', '#7E57C280' ]
    let parrents = _.map(data, (item, i) => {
        return {
          id: 'value' + i,
          name: item.key.ru,
          color: primaryColors[ i ],
        }
      },
    )
    let cildrensResident = _.map(data, (item, i) => {
      return {
        name: intl.formatMessage({ id: "common.story.residents.label" }),
        parent: 'value' + i,
        value: item.resident.amount,
      }
    })
    let cildrensNonResidents = _.map(data, (item, i) => {

      return {
        name: intl.formatMessage({ id: "common.story.nonresidents.label" }),
        parent: 'value' + i,
        value: item.nonResident.amount,
      }
    })
    config.series[ 0 ].data.push(...parrents, ...cildrensResident, ...cildrensNonResidents)
    config.tooltip = {
      formatter: function () {
        return '<b>' + this.point.name + ': </b><span>' + numeral(this.point.value).format('0.00a') + ' ' + intl.formatMessage({ id: "common.byn.text" }) + '</span>'
      },
    }
    return config
  }

  renderPolygonChart = () => {
    if (_.isEmpty(this.props.governmentProcurement.residentNonResidentOkrbs)) return <Loader
      theme="light"
      isActive={_.isEmpty(this.props.governmentProcurement.residentNonResidentOkrbs)}
    />
    return <ReactHighcharts
      key={generate()}
      config={this.preparePolygonChartConfig(this.props.governmentProcurement.residentNonResidentOkrbs)}
      id="PolygonChart"
      ref="PolygonChart"
    />
  }

  handleScrollToFirstBlock = () => {
    document.getElementById('start-page').scrollIntoView({ block: 'start', behavior: 'smooth' })
  }

  getMinGovernmentProcurementNonResSupp = () => {
    const data = this.props.governmentProcurement.topResidentNonResidentOkrbs
    let min = _.minBy(data, (o) => {
      return o.amount
    })
    return min
  }

  render() {
    const { intl } = this.context
    return (
      <div className="StoryGovernmentProcurement">
        <div className="w-100 banner" />
        <div className="container-fluid">
          <div className="row text-center">
            <div className="col-12">
              <h1><FormattedMessage id="common.story.title.label" /></h1>
            </div>
          </div>
          <Fragment>
            <div className="row justify-content-center margin-top-30">
              <div className="col-md-2 d-none d-md-block d-lg-block">
                <p><FormattedMessage id="common.story.text.0.1" /></p>
              </div>
              <div className="col-sm-12 col-md-6">
                <p><FormattedMessage id="common.story.text.1.1" /></p>
                <p><FormattedMessage id="common.story.text.1.2" /></p>
                <ol>
                  <p><FormattedMessage id="common.story.list.1.title" /></p>
                  <li><FormattedMessage id="common.story.list.1.1" /></li>
                  <li><FormattedMessage id="common.story.list.1.2" /></li>
                  <li><FormattedMessage id="common.story.list.1.3" /></li>
                  <li><FormattedMessage id="common.story.list.1.4" /></li>
                </ol>
                <p><FormattedMessage id="common.story.list.1.description" /></p>
              </div>
              <div className="col-md-2 d-none d-md-block d-lg-block" />
            </div>
            <div className="row justify-content-center margin-top-30">
              <div className="col-sm-12 col-md-6 text-center">
                {this.renderSupplierGeographyChart()}
              </div>
            </div>
          </Fragment>
          <div className="row justify-content-center margin-top-30">
            <div className="col-sm-12 col-md-6">
              <p><FormattedMessage id="common.story.text.2.1" /></p>
            </div>
          </div>
          <div className="row justify-content-center margin-top-30">
            <div className="col-sm-12 col-md-6 text-center">
              {this.renderCountryRankingBarChart()}
            </div>
          </div>
          <div className="row justify-content-center margin-top-30">
            <div className="col-sm-12 col-md-6 text-center">
              {this.renderDistributionOfSupplierCountries()}
            </div>
          </div>
          {/** **/}

          {/** **/}
          <div className="row justify-content-center margin-top-30">
            <div className="col-sm-12 col-md-6">
              <p><FormattedMessage id="common.story.text.3.1" /></p>
              <p><FormattedMessage id="common.story.text.3.2" /></p>
              <p><FormattedMessage id="common.story.text.3.3" /></p>
              <p><FormattedMessage id="common.story.text.3.4" /></p>
              <p><FormattedMessage id="common.story.text.3.5" /></p>
              <p><FormattedMessage id="common.story.text.3.6" /></p>
              <p><FormattedMessage id="common.story.text.3.7" /></p>
            </div>
          </div>
          <div className="row justify-content-center margin-top-30">
            <div className="col-sm-12 col-md-6 text-center">
              {this.renderBubblesChart()}
            </div>
          </div>
          <div className="row justify-content-center margin-top-30">
            <div className="col-sm-12 col-md-6">
              <dl>
                <dt>{intl.formatMessage({ id: 'common.story.table.title.1' })}</dt>
                <dd>{intl.formatMessage({ id: 'common.story.table.values.1' })}</dd>
                <dt>{intl.formatMessage({ id: 'common.story.table.title.2' })}</dt>
                <dd>{intl.formatMessage({ id: 'common.story.table.values.2' })}</dd>
                <dt>{intl.formatMessage({ id: 'common.story.table.title.3' })}</dt>
                <dd>{intl.formatMessage({ id: 'common.story.table.values.3' })}</dd>
                <dt>{intl.formatMessage({ id: 'common.story.table.title.4' })}</dt>
                <dd>{intl.formatMessage({ id: 'common.story.table.values.4' })}</dd>
                <dt>{intl.formatMessage({ id: 'common.story.table.title.5' })}</dt>
                <dd>{intl.formatMessage({ id: 'common.story.table.values.5' })}</dd>
                <dt>{intl.formatMessage({ id: 'common.story.table.title.6' })}</dt>
                <dd>{intl.formatMessage({ id: 'common.story.table.values.6' })}</dd>
              </dl>
            </div>
          </div>
          <div className="row justify-content-center margin-top-30">
            <div className="col-sm-12 col-md-6">
              <p><FormattedMessage id="common.story.text.4.1" /></p>
            </div>
          </div>
          <div className="row justify-content-center margin-top-30">
            <div className="col-md-2 d-none d-md-block d-lg-block">
              <p><FormattedMessage id="common.story.text.0.2" /></p>
            </div>
            <div className="col-sm-12 col-md-6">
              {this.renderPolygonChart()}
            </div>
            <div className="col-md-2 d-none d-md-block d-lg-block" />
          </div>

          <div className="row justify-content-center margin-top-30">
            <div className="col-sm-12 col-md-6">
              <p><FormattedMessage id="common.story.text.5.1" /></p>
            </div>
          </div>
          <div className="row justify-content-center margin-top-30">
            <div className="col-sm-12 col-md-6 text-center">
              {this.renderTopResidentNonResidentOkrbsMap()}
            </div>
          </div>
          <div className="row justify-content-center margin-top-30">
            <div className="col-sm-12 col-md-6">
              <p><FormattedMessage id="common.story.text.6.1" /></p>
              <ol>
                <li><FormattedMessage id="common.story.text.6.2" /></li>
                <li><FormattedMessage id="common.story.text.6.3" /></li>
                <li><FormattedMessage id="common.story.text.6.4" /></li>
              </ol>
            </div>
          </div>
          <div className="row justify-content-center margin-top-30">
            <SlideArrow onClick={this.handleScrollToFirstBlock} />
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ governmentProcurementState, locale }) => {
  return {
    governmentProcurement: governmentProcurementState.governmentProcurement,
    lang: locale.lang,
  }
}
const mapDispatchToProps = dispatch => {
  return {
    getStoryGovernmentProcurement: bindActionCreators(getStoryGovernmentProcurement, dispatch),
  }
}

StoryGovernmentProcurement.contextTypes = {
  intl: PropTypes.object.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(StoryGovernmentProcurement)
