import React, { Component } from 'react'
import PropTypes            from 'prop-types'
import ReactHighmaps        from "react-highcharts/ReactHighmaps"
import { generate }         from "shortid"
import Highcharts           from 'highcharts/highmaps'
import belarusMapSource     from './belarusMapSource'

import './BelarusMap.scss'
import * as numeral         from "numeral"
import _                    from "lodash"


export default class BelarusMap extends Component {

  static contextTypes = {
    intl: PropTypes.object.isRequired,
  }

  static propTypes = {
    data: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object,
    ]),
    pureData: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object,
    ]),
    countriesDict: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object,
    ]),
    lang: PropTypes.string
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !JSON.stringify(this.props)===JSON.stringify(nextProps)
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

  render() {
    const { intl } =this.context
    const self = this
    let mapConfig = {
      chart: {
        height: 590,
        map: 'countries/by/by-all',
      },
      title: {
        text: intl.formatMessage({id: 'page.statistic.text.006.1'}),
        align: 'left',
        style: { 'font-weigth': 'bold' },
      },
      colorAxis: {
        labels: {
          formatter: function () {
            return numeral(this.value).format('0 a')
          },
        },
        tickPositioner: function (min, max) {
          return [ min, min + (max - min) * (1 / 3), min + (max - min) * (2 / 3), max ]
        },
      },
      legend: {
        layout: 'vertical',
        align: 'left',
        verticalAlign: 'middle',
      },
      credits: {
        enabled: false,
      },
      tooltip: {
        headerFormat:'',
        pointFormatter: function () {
          if (self.props.lang === 'ru') {
            return '<span><b>' + self.prepareBelarusMapDict(self.props.pureData).ru[ this[ 'hc-key' ] ] + '</b></span> <br> ' + intl.formatMessage({id: 'page.statistic.text.006'}) + ': ' + this.value.toLocaleString('ru')
          } else {
            return '<span><b>' + self.prepareBelarusMapDict(self.props.pureData).en[ this[ 'hc-key' ] ] + '</b></span> <br> ' + intl.formatMessage({id: 'page.statistic.text.006'}) + ': ' + this.value.toLocaleString('ru')
          }
        }
      },
      series: [ {
        data: this.props.data,
        name: '',
        states: {
          hover: {
            color: 'rgba(25,118,210 ,1)',
          },
        },
        plotOptions: {
          map: {
            allAreas: false,
            joinBy: [ 'iso-a2', 'code' ],
            dataLabels: {
              enabled: true,
              color: 'white',
              style: {
                fontWeight: 'bold',
              },
            },
            mapData: Highcharts.maps[ "countries/by/by-all" ] = belarusMapSource,
          },
        },
        dataLabels: {
          enabled: true,
          formatter: function () {
            return self.props.lang === 'ru' ? self.prepareBelarusMapDict(self.props.pureData).ru[ this.point[ 'hc-key' ] ] : self.prepareBelarusMapDict(self.props.pureData).en[ this.point[ 'hc-key' ] ]
          },
        },
      } ],
    }
    return <ReactHighmaps
      config={mapConfig}
      key={generate()}
      id="belarus-map"
      ref="belarus-map"
    />
  }
}
