import moment from 'moment'
import _ from 'lodash'
import * as DF from './constants/ DateUtilConstants'

const {
  FiscalYearPrefix: fiscalYearPrefix,
  CalendarYearPrefix: calendarYearPrefix,
  ...dateFormats
} = DF

export const getCurrentDate = (format = DF.YYYY_MM_DD) => {
  return moment().format(format)
}

export const getMomentDate = (dateStr, utcMode = true) => {
  const formats = _.values(dateFormats)

  return utcMode ? moment.utc(dateStr, formats) : moment(dateStr, formats)
}

export const isValidDate = (dateStr, format, strictParsing = true) => {
  return moment(dateStr, format, strictParsing).isValid()
}

export const isDate = (dateStr, strictParsing = true) => {
  return isValidDate(dateStr, DF.MM_DD_YYYY, strictParsing)
    || isValidDate(dateStr, DF.YYYY_MM_DD, strictParsing)
    || isValidDate(dateStr, DF.YYYY_MMM, strictParsing)
}

export const getYear = (dateStr) => {
  return getMomentDate(dateStr).year()
}

export const getMonth = (dateStr) => {
  return getMomentDate(dateStr).month()
}

export const getMonthName = (dateStr) => {
  return getMomentDate(dateStr).format('MMMM')
}

export const getMonthByShortName = (monthName) => {
  return moment.monthsShort(DF.MMM).indexOf(monthName)
}

export const getShortMonthName = (month) => {
  return moment.monthsShort(DF.MMM)[month]
}

export const getMonthNumber = (month) => {
  return moment().month(month).format('M') - 1
}

export const getDayOfMonth = (dateStr) => {
  return getMomentDate(dateStr).date()
}

export const getEndOfMonth = (month) => {
  return moment().month(month).endOf('month').date()
}

export const getAllMonths = (monthsShort = true) => {
  return monthsShort ? moment.monthsShort(DF.MMM) : moment.months()
}

export const isAfter = (firstDate, secondDate) => {
  if (isDate(firstDate) && isDate(secondDate)) {
    return getMomentDate(firstDate).isAfter(getMomentDate(secondDate))
  }
  return null
}

export const isSameOrAfter = (firstDate, secondDate) => {
  if (isDate(firstDate) && isDate(secondDate)) {
    return getMomentDate(firstDate).isSameOrAfter(getMomentDate(secondDate))
  }
  return null
}

export const isSameOrBefore = (firstDate, secondDate) => {
  if (isDate(firstDate) && isDate(secondDate)) {
    return getMomentDate(firstDate).isSameOrBefore(getMomentDate(secondDate))
  }
  return null
}

export const formatDate = (dateStr, format) => {
  return getMomentDate(dateStr).format(format)
}

export const toISOFormat = (dateStr) => {
  return getMomentDate(dateStr).format(DF.YYYY_MM_DD)
}

export const toMonthDayYearFormat = (dateStr, utcMode = true) => {
  return getMomentDate(dateStr, utcMode).format(DF.MM_DD_YYYY)
}

export const toMonthDayFormat = (month, day) => {
  return moment().month(month).date(day).format(DF.MMM_DD)
}

export const generateAvailableYears = (defaultAdditiveYear = 2, defaultYearFrom = 2004) => {
  const currentYear = moment().year() + defaultAdditiveYear
  const years = []
  for (let i = defaultYearFrom; i < currentYear; i++) {
    years.push(i)
  }
  return years.reverse()
}

export const fiscalYearToDateRange = (year) => {
  const fiscalYear = typeof year === 'string' ? (parseInt(year, 10) - 1) : (year - 1)
  const dateFrom = moment(`07/01/${fiscalYear}`, DF.MM_DD_YYYY)
  const dateTo = moment(dateFrom).add(1, 'year').subtract(1, 'day')
  return [dateFrom.format(DF.MM_DD_YYYY), dateTo.format(DF.MM_DD_YYYY)]
}

export const calendarYearToDateRange = (year) => {
  const calendarYear = typeof year === 'string' ? parseInt(year, 10) : year - 1
  const dateFrom = moment(`01/01/${calendarYear}`, DF.MM_DD_YYYY)
  const dateTo = moment(dateFrom).add(1, 'year').subtract(1, 'day')
  return [dateFrom.format(DF.MM_DD_YYYY), dateTo.format(DF.MM_DD_YYYY)]
}

export const isFiscalYear = (dateRange) => {
  if (typeof dateRange === 'string') {
    return _.startsWith(dateRange, fiscalYearPrefix)
  }
  return false
}

export const isCalendarYear = (dateRange) => {
  if (typeof dateRange === 'string') {
    return _.startsWith(dateRange, calendarYearPrefix)
  }
  return false
}

export const parseYearFromLabel = (dateRangeLabel) => {
  if (typeof dateRangeLabel === 'string') {
    const yearLabelRegex = /(\w|\s)*([\d][\d])/g
    if (dateRangeLabel.match(yearLabelRegex)) {
      const groups = yearLabelRegex.exec(dateRangeLabel)
      if (groups.length === 3) {
        return parseInt('20' + groups[2], 10)
      }
    }
  }
  return null
}

export const getDateRangeDates = (startDate, endDate) => {
  let dates = []
  let dateFrom = getMomentDate(startDate)
  const dateTo = getMomentDate(endDate)

  while (dateFrom <= dateTo) {
    dates.push(toMonthDayYearFormat(dateFrom))
    dateFrom = dateFrom.add(1, 'days')
  }

  return dates
}

export const getDateRangeYears = (startDate, endDate) => {
  let years = []
  let dateFromYear = getYear(startDate)
  const dateToYear = getYear(endDate)

  while (dateFromYear <= dateToYear) {
    years.push(dateFromYear++)
  }

  return years
}

export const getDateRangeSubtractFromNow = (daysToSubtract = 60) => {
  let dateTo = getCurrentDate()
  let dateFrom = getMomentDate(dateTo).subtract(daysToSubtract, 'days')

  return {
    date_from: toISOFormat(dateFrom),
    date_to: toISOFormat(dateTo),
    label: `${toISOFormat(dateFrom)} - ${toISOFormat(dateTo)}`,
  }
}

export const getDiffDaysBetweenTwoDate = (dateTo, dateFrom) => {
  let a = moment(dateTo)
  let b = moment(dateFrom)
  return a.diff(b, 'days')
}
