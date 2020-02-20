import React, { Component } from 'react'
import PropTypes            from 'prop-types'
import ReactHighmaps        from "react-highcharts/ReactHighmaps"
import { generate }         from "shortid"
import _                    from 'lodash'

import Highcharts     from 'highcharts/highmaps'
import WorldMapSource from './WorldMapSource'

import './flags.css'


export default class WorldMap extends Component {

  static contextTypes = {
    intl: PropTypes.object.isRequired,
  }

  static propTypes = {
    data: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object,
    ]),
    countriesDict: PropTypes.object,
    lang: PropTypes.string,
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return !_.isEqual(nextProps.data, this.props.data)
  }

  render() {
    const { intl } = this.context
    const { countriesDict } = this.props
    const self = this
    let mapConfig = {
      chart: {
        height: 590,
        map: 'custom/world',
      },
      title: {
        text: intl.formatMessage({id: 'common.supplierGeography.text'}),
        align: 'left',
        style: { 'font-weigth': 'bold' },
      },
      legend: {
        title: {
          text: intl.formatMessage({ id: 'common.numberOfSuppliers.text' }),
          style: {
            color: (Highcharts.theme && Highcharts.theme.textColor) || 'black',
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
        pointFormatter: function () {
          const countryName = self.props.lang === 'ru' ? countriesDict[ this[ 'iso-a3' ] ] : this.code
          return '<span class="f32"><span class="flag ' + this.properties[ 'hc-key' ] + '">' +
            '</span></span> ' + countryName + '<br>' +
            '<span style="font-size:15px">' + this.value + ' ' + intl.formatMessage({id: 'page.statistic.text.068'}) + '</span>'
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
        labels: {
          format: '{value:,.0f}',
        },
      },
      series: [ {
        data: this.props.data,
        joinBy: [ 'iso-a3', 'code' ],
        name: intl.formatMessage({id: 'common.supplierGeography.text'}),
        states: {
          color: 'rgba(13,71,161 ,1)',
          hover: {
            color: 'rgba(25,118,210 ,1)',
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

    return <ReactHighmaps
      config={mapConfig}
      key={generate()}
      id="belarus-map"
      ref="belarus-map"
    />
  }
}
