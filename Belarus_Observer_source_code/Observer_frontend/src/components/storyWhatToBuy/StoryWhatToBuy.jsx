import React, { Fragment }    from 'react'
import { connect }            from "react-redux"
import { bindActionCreators } from "redux"
import * as numeral           from "numeral"
import { generate }           from "shortid"
import _                      from 'lodash'

import ReactHighcharts from "react-highcharts"

import {
  getRegionsCompetitivityProcurement,
  getRegionsTopProcurement,
  getLocality,
} from "../../store/stories/buyRegion/actions"

import Loader       from "../loader/Loader"
import DateSelector from "../dateSelector/DateSelector"
import SlideArrow   from "../slideArrow/SlideArrow"

import { FormattedMessage } from "react-intl"
import PropTypes            from "prop-types"

import './StoryWhatToBuy.scss'


class StoryWhatToBuy extends React.Component {

  static contextTypes = {
    intl: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props)
    this.props.getLocality()
    this.props.getRegionsTopProcurement({ year: 'last' })
    this.props.getRegionsCompetitivityProcurement({ year: 'last' })
  }

  // shouldComponentUpdate(nextProps, nextState, nextContext) {
  //   if (!_.isEqual(this.props.regionsCompetitivityProcurement, nextProps.regionsCompetitivityProcurement)) return true
  //   if (!_.isEqual(this.props.regionsTopProcurement, nextProps.regionsTopProcurement)) return true
  //   return false
  // }

  getRegionLocale = (region) => {
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
    let regionName = _.find(REGIONS, o => {
      return o.ru === region
    })
    if (this.props.lang === 'ru') {
      return regionName.ru
    } else {
      return regionName.en
    }
  }

  getStoryChartConfig = (dataMethod, dataTop) => {
    const self = this
    const { intl } = this.context

    let chartConfig = {
      chart: { type: 'bar', padding: 0, backgroundColor: null, height: 500 },
      title: {
        style: {
          color: '#FFF',
        },
      },
      colors: [ '#57D0B3', '#64B5F6' ],
      credits: {
        enabled: false,
      },
      legend: {
        enabled: false,
      },
    }
    const DATA_METHOD = _.cloneDeep(dataMethod)
    const DATA_TOP = _.cloneDeep(dataTop)
    return {
      getMethodConf: () => {
        const categories = DATA_METHOD.map(item => this.getRegionLocale(item.key.ru))
        let concatedData = () => {
          let data = _.map(DATA_METHOD, (item, i) => {
            return {
              keys: {
                key: item.key.en,
                name: self.getRegionLocale(item.key.ru),
              },
              data: DATA_TOP[ item.key.en ],
              contracts: item.contracts,
            }
          })
          return data
        }
        let config = _.cloneDeep(chartConfig)

        config.title.text = intl.formatMessage({ id: 'page.statistic.text.071' })
        config.categories = categories
        config.tooltip = {
          formatter: function () {
            return '<b>' + numeral(Math.abs(this.point.y)).format('0.') + '% ' + this.series.name + ' ' + intl.formatMessage({ id: 'page.statistic.text.072' }) + ' ' + this.point.category + '</b><br/>'
          },
        }
        config.legend = {
          itemStyle: {
            color: '#FFF',
          },
        }
        config.series = [
          {
            name: intl.formatMessage({ id: 'page.statistic.text.074.1' }),
            data: DATA_METHOD.map(item => -item.contracts.competitive.amountShare),
            borderColor: null,
          }, {
            name: intl.formatMessage({ id: 'page.statistic.text.075.1' }),
            data: DATA_METHOD.map(item => item.contracts.uncompetitive.amountShare),
            borderColor: null,
          },
        ]
        config.xAxis = [
          {
            categories: categories,
            reversed: false,
            labels: { step: 1, style: { color: '#FFF' } },
          },
          {
            opposite: true,
            reversed: false,
            categories: categories,
            linkedTo: 0,
            labels: { step: 1, style: { color: '#FFF' } },
          },
        ]
        config.yAxis = {
          title: {
            text: null,
          },
          min: -100,
          max: 100,
          labels: {
            formatter: function () {
              return Math.abs(this.value) + '%'
            },
            style: {
              color: '#FFF',
            },
          },
        }
        config.plotOptions = {
          series: {
            stacking: 'normal',
            events: {
              mouseOut: function (e) {
              },
            },
          },
        }
        config.plotOptions.series.point = {
          events: {
            mouseOver: function (e) {
              let data = _.find(concatedData(), o => {
                return o.keys.name === this.category
              })
              data.data = data.data.map(item => [ item.key.ru, item.amount / 1000000 ])
              self.refs[ 'story-top-chart' ].chart.series[ 0 ].setData(data.data)
              const info = _.find(concatedData(), o => {
                return o.keys.name === e.target.category
              })
              self.refs[ 'story-title' ].innerHTML = this.category
              self.refs[ 'story-info-value-competitive' ].innerHTML = ` ${numeral(info.contracts.competitive.amountShare).format('0.')}% `
              self.refs[ 'story-info-value-uncompetitive' ].innerHTML = ` ${numeral(info.contracts.uncompetitive.amountShare).format('0.')}% `
            },
          },
        }
        return config
      },

      getTopConf: () => {
        let config = _.cloneDeep(chartConfig)
        let locality = this.getStoryLocality()

        config.title.text = intl.formatMessage({ id: 'page.statistic.text.076' })

        config.colors = [ '#E57373' ]
        config.xAxis = {
          type: 'category',
          labels: {
            formatter: function () {
              return this.value
            },
            style: {
              color: '#FFF',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              width: 100,
            },
          },
        }
        config.tooltip = {
          formatter: function () {
            return '<span>' + this.point.name + '</span>' + ': ' + '<span><b>' + numeral(this.y).format('0.0 a') + ' ' + intl.formatMessage({ id: 'common.mln.text' }) + '. ' + intl.formatMessage({ id: 'common.byn.text' }) + '</b></span>'
          },
        }
        config.yAxis = {
          min: 0,
          labels: {
            formatter: function () {
              return numeral(this.value).format('0 a')
            },
            style: {
              color: '#FFF',
            },
          },
          title: {
            text: intl.formatMessage({ id: 'common.mln.text' }) + ' ' + intl.formatMessage({ id: 'common.byn.text' }),
            style: {
              color: '#FFF',
            },
          },
        }
        config.series = [
          {
            name: '',
            data: _.has(DATA_TOP, locality) ? DATA_TOP[ locality ].map(item => [ item.key.ru, item.amount / 1000000 ]) : [],
            borderColor: null,
          },
        ]
        return config
      },
    }
  }

  fetchData = (startDate, endDate, year) => {
    let locality = this.getStoryLocality()
    const self = this

    Promise.all([
      this.props.getRegionsTopProcurement({ year: year || 'last' }),
      this.props.getRegionsCompetitivityProcurement({ year: year || 'last' }),
    ])
      .then(() => {
        let currentLocalityInfo = _.filter(this.props.regionsCompetitivityProcurement, (item) => item.key.en === locality)[ 0 ]
        console.log(currentLocalityInfo)
        let data = _.has(this.props.regionsTopProcurement, locality) ? this.props.regionsTopProcurement[ locality ].map(item => [ item.key.ru, item.amount / 1000000 ]) : []
        self.refs[ 'story-top-chart' ].chart.series[ 0 ].setData(data)
        self.refs[ 'story-title' ].innerHTML = this.getRegionLocale(currentLocalityInfo.key.ru)
        self.refs[ 'story-info-value-competitive' ].innerHTML = ` ${numeral(currentLocalityInfo.contracts.competitive.amountShare).format('0.')}% `
        self.refs[ 'story-info-value-uncompetitive' ].innerHTML = ` ${numeral(currentLocalityInfo.contracts.uncompetitive.amountShare).format('0.')}% `
      })
  }

  handleScrollToFirstBlock = () => {
    document.getElementById('start-page').scrollIntoView({ block: 'start', behavior: 'smooth' })
  }

  getStoryLocality = () => {
    const {
      locality,
      regionsCompetitivityProcurement,
    } = this.props

    return !_.isEmpty(_.filter(regionsCompetitivityProcurement, (item) => item.key.en === locality.region))
      ? locality.region
      : 'Minsk City'
  }

  renderRegionsTotals = () => {
    const {
      regionsCompetitivityProcurement,
    } = this.props

    let locality = this.getStoryLocality()

    let currentLocalityInfo = _.filter(regionsCompetitivityProcurement, (item) => item.key.en === locality)[ 0 ]

    return <div className="row story-what-to-by-header">
      <h5 className="info-title" ref="story-title">{this.getRegionLocale(currentLocalityInfo.key.ru)}</h5>
      <h5>
        <span className="info-value" ref="story-info-value-one">
          <span className='story-info-value-competitive'
                ref="story-info-value-competitive">{numeral(currentLocalityInfo.contracts.competitive.amountShare).format('0.')}%  </span>
          <FormattedMessage id="page.statistic.text.069" />
        </span>
        <span className="info-value" ref="story-info-value-two">
          <span className='story-info-value-uncompetitive'
                ref="story-info-value-uncompetitive"> {numeral(currentLocalityInfo.contracts.uncompetitive.amountShare).format('0.')}% </span>
          <FormattedMessage id="page.statistic.text.070" />
        </span>
      </h5>
    </div>
  }

  render() {
    const {
      locality,
      regionsTopProcurement,
      regionsCompetitivityProcurement,
    } = this.props
    return <div className="StoryWhatToBuy">
      <div className="container">
        {
          _.isEmpty(regionsCompetitivityProcurement) || _.isEmpty(regionsTopProcurement) || _.isEmpty(locality) ?
            <Loader
              theme={"light"}
              isActive={_.isEmpty(regionsCompetitivityProcurement && regionsTopProcurement)}
            /> : <Fragment>
              {this.renderRegionsTotals()}
              <div className="row">
                <div className="col-md-8">
                  <ReactHighcharts
                    key={generate()}
                    config={this.getStoryChartConfig(regionsCompetitivityProcurement, regionsTopProcurement).getMethodConf()}
                    id="story-methods-chart"
                    ref="story-methods-chart"
                  />
                </div>
                <div className="col-md-4">
                  <ReactHighcharts
                    key={generate()}
                    config={this.getStoryChartConfig(regionsCompetitivityProcurement, regionsTopProcurement).getTopConf()}
                    id="story-top-chart"
                    ref="story-top-chart"
                  />
                </div>
              </div>
              <DateSelector onClick={(start, end, year) => this.fetchData(start, end, year)} />
              <div className="row story-desc">
                <div className="col-md-4">
                  <h6><FormattedMessage id="story.whatToBuy.text.1.1" /></h6>
                  <ul>
                    <li><FormattedMessage id="story.whatToBuy.text.1.2" /></li>
                    <li><FormattedMessage id="story.whatToBuy.text.1.3" /></li>
                    <li><FormattedMessage id="story.whatToBuy.text.1.4" /></li>
                  </ul>
                </div>
                <div className="col-md-8">
                  <p><FormattedMessage id="story.whatToBuy.text.2.1" /></p>
                  <p><FormattedMessage id="story.whatToBuy.text.2.2" /></p>
                  <p><FormattedMessage id="story.whatToBuy.text.2.3" /></p>
                  <br />
                  <h6><FormattedMessage id="story.whatToBuy.text.3.1" /></h6>
                  <ul>
                    <li><FormattedMessage id="story.whatToBuy.text.3.2" /></li>
                    <li><FormattedMessage id="story.whatToBuy.text.3.3" /></li>
                    <li><FormattedMessage id="story.whatToBuy.text.3.4" /></li>
                  </ul>
                </div>
              </div>
            </Fragment>
        }
        <div className="row justify-content-center margin-top-30">
          <SlideArrow onClick={this.handleScrollToFirstBlock} />
        </div>
      </div>
    </div>
  }
}

const mapStateToProps = ({
                           buyRegionState,
                           locale,
                         }) => {
  return {
    locality: buyRegionState.locality,
    localityIsFetching: buyRegionState.localityIsFetching,
    regionsTopProcurement: buyRegionState.regionsTopProcurement,
    regionsTopProcurementIsFetching: buyRegionState.regionsTopProcurementIsFetching,
    regionsCompetitivityProcurement: buyRegionState.regionsCompetitivityProcurement,
    regionsCompetitivityProcurementIsFetching: buyRegionState.regionsCompetitivityProcurementIsFetching,
    lang: locale.lang,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getLocality: bindActionCreators(getLocality, dispatch),
    getRegionsCompetitivityProcurement: bindActionCreators(getRegionsCompetitivityProcurement, dispatch),
    getRegionsTopProcurement: bindActionCreators(getRegionsTopProcurement, dispatch),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(StoryWhatToBuy)
