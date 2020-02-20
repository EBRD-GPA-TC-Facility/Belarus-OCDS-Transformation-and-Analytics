import React, { Fragment } from 'react'
import PropTypes           from "prop-types"

import { connect }  from "react-redux"
import _            from 'lodash'
import { generate } from "shortid"

import { bindActionCreators } from "redux"

import {
  getBelarusProductsShare,
  getCountriesOkrbTopAmount,
  getProductCountriesContractItemsAmount,
} from "../../store/stories/buyBelarusian/actions"

import DateSelector from "../dateSelector/DateSelector"
import Loader       from "../loader/Loader"
import SlideArrow   from "../slideArrow/SlideArrow"

import ReactHighmaps        from "react-highcharts/ReactHighmaps"
import ReactHighcharts      from "react-highcharts"
import Highcharts           from 'highcharts/highmaps'
import WorldMapSource       from '../worldMap/WorldMapSource'
import * as numeral         from "numeral"

import './StoryBuyBelarusian.scss'
import { FormattedMessage } from "react-intl"


class StoryBuyBelarusian extends React.Component {

  static contextTypes = {
    intl: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props)
    this.props.getProductCountriesContractItemsAmount({ year: 'last' })
    this.props.getCountriesOkrbTopAmount({ year: 'last' })
    this.props.getBelarusProductsShare({ year: 'last' })
    this.state = {
      pieChartDisplay: true,
    }
  }

  // shouldComponentUpdate(nextProps, nextState, nextContext) {
  //   return !_.isEqual(
  //     !_.isEqual(nextProps.productCountries, this.props.productCountries),
  //     !_.isEqual(nextProps.countriesTop, this.props.countriesTop),
  //     !_.isEqual(nextProps.belarusProductsShare, this.props.belarusProductsShare),
  //   )
  // }

  prepareWorldMapData = data => {
    let preparedData = _.cloneDeep(data)
    return {
      data: () => {
        return preparedData.map((item) => {
          return {
            "code": item.key.en,
            "value": item.amount,
          }
        })
      },
      dictionary: () => {
        if (this.props.lang === 'ru') {
          return preparedData.reduce((obj, item) => (obj[ item.key.en ] = item.key.ru, obj), {})
        }
        return preparedData.reduce((obj, item) => (obj[ item.key.en ] = item.key.en, obj), {})
      },
    }
  }

  getStoryChartConfig = (mapData, pieData) => {
    const self = this

    const clonedMapData = _.cloneDeep(mapData)
    const clonedPieData = _.cloneDeep(pieData)
    const { intl } = this.context
    return {
      getMapConf: () => {
        const countriesDict = this.prepareWorldMapData(clonedMapData).dictionary()
        let config = {
          chart: {
            height: 500,
            map: 'custom/world',
            backgroundColor: null,
          },
          title: {
            useHTML: true,
            text: '<span class="story-info-value">' + numeral(self.props.belarusProductsShare.share).format('0') + '%</span>' + ' ' + intl.formatMessage({ id: 'page.statistic.text.077' }),
            align: 'left',
            style: { 'font-weigth': 'bold', 'color': '#FFF' },
          },
          legend: {
            title: {
              text: '',
              style: {
                color: '#FFF',
              },
            },
          },
          credits: {
            enabled: false,
          },
          tooltip: {
            backgroundColor: 'none',
            borderWidth: 0,
            shadow: false,
            useHTML: true,
            padding: 0,
            headerFormat: '',
            pointFormatter: function () {
              if (_.isEmpty(countriesDict)) return
              return '<span style="color: #FFF" ><span class="f32"><span class="flag ' + this.properties[ 'hc-key' ] + '">' +
                '</span></span> ' + countriesDict[ this[ 'iso-a3' ] ] + '<br>' + '</span>'
            },
            positioner: function () {
              return {
                x: 0,
                y: 250,
              }
            },
          },
          colorAxis: {
            min: 1,
            max: 1000,
            type: 'logarithmic',
            minColor: '#90A4AE',
            maxColor: '#57D0B3',
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
          },
          series: [ {
            point: {
              events: {
                click: function (e) {
                  if (clonedPieData[ e.target.point.code ] === undefined) {
                    self.refs[ 'story-pie-chart' ].chart.series[ 0 ].setData({ name: null, y: 0 })
                  } else {
                    self.refs[ 'story-pie-chart' ].chart.series[ 0 ].setData(clonedPieData[ e.target.point.code ].values.map(
                      item => {
                        return { name: item.key.ru, y: item.amount }
                      },
                    ))
                  }
                },
              },
            },
            events: {
              mouseOut: function () {
              },
            },
            data: this.prepareWorldMapData(clonedMapData).data(),
            joinBy: [ 'iso-a3', 'code' ],
            name: '',
            borderColor: 'rgba(0,0,0,0)',
            borderWidth: 2,
            states: {
              hover: {
                color: 'rgba(255,138,101 ,1)',
              },
            },
            plotOptions: {
              map: {
                mapData: Highcharts.maps[ "custom/world" ] = WorldMapSource,
              },
            },
          },
          ],
        }
        return config
      },
      getPieConf: () => {
        let config = {
          chart: {
            type: 'pie',
            height: 500,
            backgroundColor: null,
          },
          colors: [ '#64B5F6', '#81C784', '#FFB74D', '#90A4AE', '#E57373' ],
          legend: {
            itemStyle: {
              color: '#FFF',
            },
          },
          title: {
            text: intl.formatMessage({ id: 'page.statistic.text.078' }),
            style: {
              color: '#FFF',
            },
          },
          credits: {
            enabled: false,
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
          tooltip: {
            headerFormat: '',
            formatter: function () {
              return '<b>' + this.point.name + ': </b><br> ' + intl.formatMessage({ id: 'page.statistic.text.079' }) + ': ' + numeral(this.point.y).format('0.00 a') + ' ' + intl.formatMessage({ id: 'common.byn.text' }) + ' <br>' + intl.formatMessage({ id: 'page.statistic.text.066' }) + ': ' + Math.round(this.point.percentage) + '%'
            },
          },
          series: [ {
            name: 'TOP-5 Предметов Закупок',
            borderColor: 'rgba(0,0,0,0)',
            borderWidth: 2,
          } ],
        }

        config.series[ 0 ].data = clonedPieData[ Object.keys(clonedPieData)[ 0 ] ].values.map(item => {
          return {
            name: item.key.ru,
            y: item.amount,
          }
        })

        return config
      },
    }
  }

  fetchData = (startDate, endDate, year) => {
    this.props.getCountriesOkrbTopAmount({ year: year || 'last' })
    this.props.getProductCountriesContractItemsAmount({ year: year || 'last' })
    this.props.getBelarusProductsShare({ year: year || 'last' })
  }

  handleScrollToFirstBlock = () => {
    document.getElementById('start-page').scrollIntoView({ block: 'start', behavior: 'smooth' })
  }

  render() {
    const {
      productCountries,
      belarusProductsShare,
      countriesTop,
    } = this.props
    return (
      <div className="StoryBuyBelarusian">
        <div className="container">
          {
            _.isEmpty(productCountries) || _.isEmpty(countriesTop) || _.isEmpty(belarusProductsShare) ?
              <Loader
                theme={"light"}
                isActive={_.isEmpty(productCountries && countriesTop)}
              /> : <Fragment>
                <div className="row">
                  <div className="col-md-8">
                    <ReactHighmaps
                      key={generate()}
                      config={this.getStoryChartConfig(productCountries, countriesTop).getMapConf()}
                      id="story-map-chart"
                      ref="story-map-chart"
                    />
                  </div>
                  <div className="col-md-4">
                    <div className={this.state.pieChartDisplay ? '' : 'invisible'}>
                      <ReactHighcharts
                        key={generate()}
                        config={this.getStoryChartConfig(productCountries, countriesTop).getPieConf()}
                        id="story-pie-chart"
                        ref="story-pie-chart"
                      />
                    </div>
                  </div>
                </div>
                <p style={{
                  color: "#ffffff",
                  textAlign: "right",
                  fontSize: '12px',
                }}><FormattedMessage id="common.footer.info.label" /> www.icetrade.by</p>
                <DateSelector onClick={(start, end, year) => this.fetchData(start, end, year)} />
                <div className="row justify-content-center margin-top-30">
                  <SlideArrow onClick={this.handleScrollToFirstBlock} />
                </div>
              </Fragment>
          }
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({
                           buyBelarusianState,
                           locale,
                         }) => {
  return {
    productCountries: buyBelarusianState.productCountriesContractItemsAmount,
    productCountriesIsFetching: buyBelarusianState.productCountriesContractItemsAmountIsFetching,
    countriesTop: buyBelarusianState.countriesOkrbTopAmount,
    countriesTopIsFetching: buyBelarusianState.countriesOkrbTopAmountIsFetching,
    belarusProductsShare: buyBelarusianState.belarusProductsShare,
    lang: locale.lang,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getProductCountriesContractItemsAmount: bindActionCreators(getProductCountriesContractItemsAmount, dispatch),
    getCountriesOkrbTopAmount: bindActionCreators(getCountriesOkrbTopAmount, dispatch),
    getBelarusProductsShare: bindActionCreators(getBelarusProductsShare, dispatch),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(StoryBuyBelarusian)
