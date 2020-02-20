import React, { Component }                                                             from 'react'
import PropTypes                                                                        from 'prop-types'
import { HighchartsChart, Title, Tooltip, TreemapSeries, withHighcharts, XAxis, YAxis } from "react-jsx-highcharts"
import Highcharts                                                                       from 'highcharts'
import _                                                                                from "lodash"
import { POLYGON_CHART_CONFIG }                                                         from "./constants"
import addTreemapModule
                                                                                        from 'highcharts/modules/treemap'


addTreemapModule(Highcharts)

class TreemapChart extends Component {

  static propTypes = {
    data: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object,
    ]),
  }

  preparePolygonChartConfig = data => {
    let config = _.cloneDeep(POLYGON_CHART_CONFIG)

    let parrents = _.map(data, (item, i) => {
        return {
          id: 'value' + i,
          name: item.key.ru,
        }
      },
    )
    let cildrensResident = _.map(data, (item, i) => {
      return {
        name: 'Резидент',
        parent: 'value' + i,
        value: item.resident.amount,
      }
    })
    let cildrensNonResidents = _.map(data, (item, i) => {
      return {
        name: 'Нерезидент',
        parent: 'value' + i,
        value: item.nonResident.amount,
      }
    })
    config.series[ 0 ].data.push(...parrents, ...cildrensResident, ...cildrensNonResidents)
    return config
  }

  render() {
    const colorAxis = {
      minColor: '#FFFFFF',
      maxColor: Highcharts.getOptions().colors[ 0 ],
    }
    return (
      <HighchartsChart backgroundColor={null} colorAxis={colorAxis}>
        <Title>Распределение ТОП-10 предметов закупок</Title>
        <XAxis />
        <Tooltip {...{
          enabled: true,
          padding: 10,
          hideDelay: 250,
          shape: 'square',
          split: true,
        }} />
        <YAxis>
          <TreemapSeries
            name="treemap"
            allowDrillToNode
            data={this.preparePolygonChartConfig(this.props.data).series[ 0 ].data}
            layoutAlgorithm="stripes"
            alternateStartingDirection={true}
            levels={[
              {
                level: 1,
                layoutAlgorithm: 'sliceAndDice',
                dataLabels: {
                  enabled: true,
                  align: 'left',
                  verticalAlign: 'top',
                  style: {
                    fontSize: '15px',
                    fontWeight: 'bold',
                  },
                },
              },
            ]}
          />
        </YAxis>
      </HighchartsChart>
    )
  }
}

export default withHighcharts(TreemapChart, Highcharts)
