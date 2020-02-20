export const getChartConfig = () => {
  // let data = this.getContractsCommonInfoQ()
  return {
    chart: {
      type: 'spline',
      parallelCoordinates: true,
      parallelAxes: {
        lineWidth: 2,
      },
      backgroundColor: null,
    },
    legend: {
      enabled: false,
    },
    boost: {
      seriesThreshold: 1000,
      useGPUTranslations: true,
      usePreAllocated: true
    },
    title: {
      text: '',
    },
    plotOptions: {
      series: {
        boostThreshold: 1,
        animation: false,
        marker: {
          enabled: false,
          states: {
            hover: {
              enabled: false,
            },
          },
        },
        states: {
          hover: {
            halo: {
              size: 0,
            },
          },
        },
        events: {
          mouseOver: function () {
            this.group.toFront()
          },
        },
      },
    },
    tooltip: {
      pointFormat: '<span style="color:{point.color}">\u25CF</span>' +
        '{series.name}: <b>{point.formattedValue}</b><br/>',
    },
    xAxis: {
      categories: [
        'Дни недели',
        'Количество позиций договора',
        'Конкурентность',
        'Методы закупок',
        'Тип средств закупки',
        'Сумма договоров',
      ],
      offset: 10,
    },
    yAxis: [
      {
        type: 'datetime',
        tooltipValueFormat: '{value:%Y-%m-%d}', // Дни недели
      },
      {
        min: 0,
        tooltipValueFormat: '{value}', // Количество позиций договора
      },
      {
        categories: data.competitivities, // Конкурентность
      },
      {
        categories: data.procedureTypes, // Методы закупок
      },
      {
        categories: data.funds, // Тип средств закупки
      },
      {
        min: 0, // Сумма договоров
      },
    ],
    colors: [ 'rgba(11, 200, 200, 0.1)' ],
    series: data.contractsData,
  }
}
