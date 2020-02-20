import React from 'react'

import IMG1 from '../../article/imgsMock/shutterstock_1236487849.png'
import IMG2 from '../../article/imgsMock/shutterstock_1130674394.png'
import IMG3 from '../../article/imgsMock/9e18bebc-4285-475d-8916-505c7bb3aa2e.jpg'


export const ARTICLES = [
  {
    title: 'story.whatToBuy.text.title',
    shortText: 'story.whatToBuy.text.2.1',
    img: IMG1,
    link: '/dashboard/what-to-buy-in-your-region',
  },
  {
    title: 'common.story.title.label',
    shortText: 'common.story.text.1.1',
    img: IMG2,
    link: '/dashboard/why-government-procurement-is-important-to-the-country',
  },
  {
    title: 'story.buyBelarusian.text.title',
    shortText: '',
    img: IMG3,
    link: '/dashboard/buy-belarusian',
  },
]

export const PROCUREMENT_TOP_COLUMNS = [
  {
    Header: '',
    accessor: 'info',
    maxWidth: 100,
  },
  {
    Header: '',
    accessor: 'value',
  },
]

export const CARDS_DESCRIPTIONS = {
  topOKRB: {
    description: 'page.description.text.1.2',
    time: 'page.description.text.1.4',
    source: <a href="http://www.icetrade.by/">www.icetrade.by</a>,
  },
  topProcurement: {
    description: 'page.description.text.2.2',
    time: 'page.description.text.1.4',
    source: <a href="http://www.icetrade.by/">www.icetrade.by</a>,
  },
  enquiryNumber: {
    description: 'page.description.text.3.2',
    time: 'page.description.text.1.4',
    source: <a href="http://www.icetrade.by/">www.icetrade.by</a>,
  },
  buyersActivity: {
    description: 'Гистограмма показывает динамику количества заказчиков по месяцам. Дополнительно к этому, пунктирной и сплошной линиями представлена информация о среднем количестве договоров на одного заказчика и средняя сумма договоров на заказчика.',
    time: 'page.description.text.4.4',
    source: <a href="http://www.icetrade.by/">www.icetrade.by</a>
  },
  buyersSuppliersActivity: {
    description: 'Визуализация представляет динамику  количества заказчиков и поставщиков по месяцам.',
    time: 'page.description.text.4.4',
    source: <a href="http://www.icetrade.by/">www.icetrade.by</a>
  },
  gswDistribution: {
    description: 'page.description.text.4.2',
    time: 'page.description.text.4.4',
    source: <a href="http://www.icetrade.by/">www.icetrade.by</a>
  },
  mmBusinessLots: {
    description: 'page.description.text.5.2',
    time: 'page.description.text.4.4',
    source: <a href="http://www.icetrade.by/">www.icetrade.by</a>
  },
  mmBusinessContractsAmount: {
    description: 'page.description.text.6.2',
    time: 'page.description.text.4.4',
    source: <a href="http://www.icetrade.by/">www.icetrade.by</a>
  },
}


export const ChartConfig = {
  config: {
    chart: {
      backgroundColor: null,
      borderWidth: 0,
      height: 320,
    },
    title: {
      text: '',
    },
    xAxis: {
      labels: {
        step: 1,
      },
    },
    yAxis: {
      title: {
        text: null,
      },
    },
    legend: {
      enabled: false,
    },
    series: [ {
      name: '',
      data: [],
    } ],
    credits: {
      enabled: false,
    },
  },
}
