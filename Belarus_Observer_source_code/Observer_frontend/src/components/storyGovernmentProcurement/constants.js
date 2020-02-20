import Highcharts       from 'highcharts/highmaps'
import WorldMapSource   from '../worldMap/WorldMapSource'
import belarusMapSource from '../belarusMap/belarusMapSource'
import * as numeral     from "numeral"


export const TOP_RESIDENT_NON_RESIDENT_OKRBS_MAP_CONFIG = {
  chart: {
    map: 'countries/by/by-all',
    backgroundColor: null,
  },
  title: {
    text: 'География распределения международных поставщиков по регионам заказчика',
    // align: 'left',
    style: { 'font-weigth': 'bold', 'color': '#FFF' },
  },
  colorAxis: {
    min: 0,

  },
  legend: {
    layout: 'vertical',
    align: 'left',
    verticalAlign: 'middle',
  },
  credits: {
    enabled: false,
  },
  series: [ {
    name: 'География распределения',
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
        mapData: Highcharts.maps[ 'countries/by/by-all' ] = belarusMapSource,
      },
    },
  } ],
}

export const SUPPLIER_GEOGRAPHY_MAP_CONFIG = {
  chart: {
    map: 'custom/world',
    backgroundColor: null,
  },
  title: {
    text: '',
    // align: 'left',
    style: { 'font-weigth': 'bold', 'color': '#FFF' },
  },
  legend: {
    title: {
      text: '',
      style: {
        color: (Highcharts.theme && Highcharts.theme.textColor) || '#FFFFFF',
      },
    },
  },
  colorAxis: {
    min: 1,
    labels: {
      style: {
        'color': '#FFFFFF',
      },
      formatter: function () {
        return numeral(this.value).format('0 a')
      },
    },
    type: 'logarithmic',
    minColor: '#90A4AE',
    maxColor: '#57D0B3',
  },
  credits: {
    enabled: false,
  },
  series: [ {
    joinBy: [ 'iso-a3', 'code' ],
    name: 'Количество поставщиков',
    states: {
      hover: {
        color: 'rgba(255,138,101 ,1)',
      },
    },
    plotOptions: {
      map: {
        mapData: Highcharts.maps[ 'custom/world' ] = WorldMapSource,
      },
    },
    borderColor: 'rgba(0,0,0,0)',
    borderWidth: 2,
  } ],
}

export const COUNTRY_RANKING_BAR_CHART_CONFIG = {
  chart: {
    height: 600,
    type: 'bar',
    backgroundColor: null,
  },
  title: {
    text: 'ТОП-10 стран поставщиков нерезидентов',
    style: { 'font-weigth': 'bold', 'color': '#FFF' },
  },
  yAxis: {
    min: 0,
    title: '',
    labels: {
      formatter: function () {
        return numeral(this.value).format('0 a')
      },
      style: { 'color': '#FFFFFF' },
    },
  },
  tooltip: {
    useHTML: true,
    formatter: function () {
      return '<span>' + this.point.name +
        ': <b>' + numeral(this.point.y).format('0 a') + ' бел. руб. (BYN)</b>'
        + '</span>'
    },
  },
  xAxis: {
    tickInterval: 1,
    categories: [],
    labels: {
      style: { 'color': '#FFFFFF', 'width': '120px' },
    },
  },
  series: [
    {},
  ],
  legend: {
    enabled: false,
  },
  plotOptions: {
    column: {
      dataLabels: {
        enabled: false,
        color: 'grey',
      },
    },
  },
  credits: {
    enabled: false,
  },
}

export const DISTRIBUTION_OF_SUPPLIER_COUNTRIES_CONFIG = {
  chart: {
    backgroundColor: null,
    plotBackgroundColor: null,
    plotBorderWidth: null,
    plotShadow: false,
    type: 'pie',
  },
  title: {
    text: 'Распределение стран поставщиков нерезидентов',
    style: { 'font-weigth': 'bold', 'color': '#FFF' },
  },
  credits: {
    enabled: false,
  },
  colors: [ '#5C6BC080', '#66BB6A80' ],
  tooltip: {
    formatter: function () {
      return '<b>' + this.point.name + ': </b><br> Количество: <b>' + numeral(this.point.y).format('0 a') + ' бел. руб. (BYN)' + '</b><br> Доля: <b>' + numeral(this.point.percentage).format('0') + '%</b>'
    },
  },
  legend: {
    itemStyle: {
      color: '#FFFFFF',
    },
    itemHoverStyle: {
      color: '#FFFFFF80',
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
          color: '#f7f7f7'
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
  series: [ {
    name: 'Capital',
  } ],
}

export const BUBBLES_CHART_CONFIG = {
  chart: {
    type: 'bubble',
    plotBorderWidth: 1,
    zoomType: 'xy',
    backgroundColor: null,
  },
  legend: {
    enabled: false,
  },
  title: {
    text: '',
    align: 'left',
    style: { 'font-weigth': 'bold', 'color': '#FFF' },
  },
  xAxis: {
    gridLineWidth: 1,
    title: {
      text: 'Сумма договоров',
      style: {
        'color': '#FFFFFF',
      },
    },
    labels: {
      formatter: function () {
        return numeral(this.value).format('0 a')
      },
      style: {
        'color': '#FFFFFF',
      },
    },
  },
  tooltip: {
    useHTML: true,
    formatter: function () {
      return '<dl>' +
        '<dt><h6>' + this.point.name + '</h6></dt>' +
        '<dd>Количество договоров: <b>' + this.point.y + ' шт.' + '</b></dd>' +
        '<dd>Сумма договоров: <b>' + numeral(this.point.x).format(`0 a`) + ' бел. руб. (BYN)</b></dd>' +
        '<dd>Количество поставщиков: <b>' + this.point.z + '</b></dd>' +
        '</dl>'
    },
  },
  yAxis: {
    title: {
      text: 'Количество договоров',
      style: {
        'color': '#FFFFFF',
      },
    },
    labels: {
      formatter: function () {
        return numeral(this.value).format('0 a')
      },
      style: {
        'color': '#FFFFFF',
      },
    },
    startOnTick: false,
    endOnTick: false,
  },
  series: [],
  credits: {
    enabled: false,
  },
}

export const TOP_FIVE_ITEMS_OF_PURCHASE_CONFIG = {
  chart: {
    type: 'bar',
    backgroundColor: null,
    height: 300,
  },
  title: {
    text: 'Рейтинг ТОП-5 предметов закупок',
    style: { 'font-weigth': 'bold', 'color': '#FFF' },
  },
  yAxis: {
    min: 0,
    title: '',
    labels: {
      format: '{value:,.f}',
    },
  },
  xAxis: {
    tickInterval: 1,
    categories: [],

  },
  series: [
    {},
  ],
  legend: {
    enabled: false,
  },
  plotOptions: {
    column: {
      // stacking: 'normal',
      dataLabels: {
        enabled: false,
        color: 'grey',
      },
    },
  },
  credits: {
    enabled: false,
  },
}

export const POLYGON_CHART_CONFIG = {
  chart: {
    backgroundColor: null,
  },
  series: [ {
    type: "treemap",
    layoutAlgorithm: 'stripes',
    alternateStartingDirection: true,
    levels: [ {
      level: 1,
      layoutAlgorithm: 'sliceAndDice',
      dataLabels: {
        enabled: true,
        align: 'left',
        verticalAlign: 'top',
        style: {
          fontSize: '15px',
          textOverflow: 'ellipsis',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
        },
      },
    } ],
    data: [],
  } ],
  credits: {
    enabled: false,
  },
  plotOptions: {
    treemap: {
      dataLabels: {
        enabled: true,
        style: {
          textOutline: false
        },
      }
    }
  },
  title: {
    text: 'Распределение ТОП-5 предметов закупок',
    style: { 'font-weigth': 'bold', 'color': '#FFF' },
  },
}

export const BAR_CHART_CONFIG = {
  chart: {
    height: 600,
    type: 'column',
    backgroundColor: null,
  },
  title: {
    text: 'Распределение ТОП-10 предметов закупок',
    style: { 'font-weigth': 'bold', 'color': '#FFF' },
  },
  yAxis: {
    min: 0,
    title: '',
    labels: {
      formatter: function () {
        return numeral(this.value).format('0 a')
      },
      style: { 'color': '#FFFFFF' },
    },
  },
  tooltip: {
    useHTML: true,
    formatter: function () {
      return '<span>' + this.series.name +
        ': <b>' + numeral(this.point.y).format('0 a') + ' бел. руб. (BYN)</b>'
        + '</span>'
    },
  },
  xAxis: {
    tickInterval: 1,
    categories: [],
    labels: {
      style: { 'color': '#FFFFFF', 'width': '120px' },
    },
  },
  series: [
    {},
  ],
  legend: {
    enabled: false,
  },
  plotOptions: {
    series: {
      stacking: 'normal',
    },
    // column: {
    //   dataLabels: {
    //     enabled: false,
    //     color: 'grey',
    //   },
    // },
  },
  credits: {
    enabled: false,
  },
}
