import {RSAA} from 'redux-api-middleware'
import {BASE_URL} from './apiConstants'
import _ from 'lodash'

function toQueryString(obj) {
  const parts = []
  for (let i in obj) {
    if (obj.hasOwnProperty(i)) {
      parts.push(encodeURIComponent(i) + "=" + encodeURIComponent(obj[i]));
    }
  }
  return parts.join("&");
}

export const get = (endpointRoute, types, reqData) => {
  let requestData = toQueryString(reqData)
  return {
    [RSAA]: {
      endpoint: _.startsWith(endpointRoute, "http://")
        ? endpointRoute
        : BASE_URL + endpointRoute + (reqData ? `?${requestData}` : ''),
      method: 'GET',
      types: types,
    },
  }
}
