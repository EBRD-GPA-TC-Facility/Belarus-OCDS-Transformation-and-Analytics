import { isDate } from './dateUtils'

export const SORT_TYPE = {
  asc: 'asc',
  desc: 'desc',
  none: 'none',
}

const isNumber = (value) => {
  return typeof value === 'number' || value instanceof Number
}

const isString = (value) => {
  return typeof value === 'string' || value instanceof String
}

const isBoolean = (value) => {
  return typeof value === 'boolean' || value instanceof Boolean
}

const isNullOrUndefine = (value) => {
  return typeof value === 'undefined' || value === null
}

export const sortAsc = (data, key) => {
  return data.sort((a, b) => {
    let value1 = a[key]
    let value2 = b[key]

    if (isNumber(value1) && isNumber(value2)) {
      return value1 - value2
    } else if (isDate(value1) && isDate(value2)) {
      return new Date(value1) - new Date(value2)
    } else if (isString(value1) && isString(value2)) {
      value1 = value1.toLowerCase()
      value2 = value2.toLowerCase()

      if (value1 < value2) return -1
      else if (value1 > value2) return 1
      return 0
    } else if (isBoolean(value1) && isBoolean(value2)) {
      return (value1 === value2) ? 0 : value1 ? -1 : 1
    } else if (isNullOrUndefine(value1)) {
      return -1
    } else if (isNullOrUndefine(value2)) {
      return 1
    }
    return 0
  })
}

export const sortDesc = (data, key) => {
  return data.sort((a, b) => {
    let value1 = a[key]
    let value2 = b[key]

    if (isNumber(value1) && isNumber(value2)) {
      return value2 - value1
    } else if (isDate(value1) && isDate(value2)) {
      return new Date(value2) - new Date(value1)
    } else if (isString(value1) && isString(value2)) {
      value1 = value1.toLowerCase()
      value2 = value2.toLowerCase()

      if (value1 < value2) return 1
      else if (value1 > value2) return -1
      return 0
    } else if (isBoolean(value1) && isBoolean(value2)) {
      return (value2 === value1) ? 0 : value2 ? -1 : 1
    } else if (isNullOrUndefine(value1)) {
      return 1
    } else if (isNullOrUndefine(value2)) {
      return -1
    }
    return 0
  })
}

export const sortData = (data, key, sortType) => {
  if (sortType === SORT_TYPE.asc) {
    return sortAsc(data, key)
  } else if (sortType === SORT_TYPE.desc) {
    return sortDesc(data, key)
  }

  return data
}

