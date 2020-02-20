import { get }   from '../../../utils/api/apiUtils'
import * as Type from './BuyersRegionsCapitalCountConstants'
import * as API  from '../../../utils/api/apiConstants'


export const getBuyersRegionsCapitalCount = (reqData) => {
  const TYPES = [
    Type.GET_BUYERS_REGIONS_CAPITAL_COUNT_REQUEST,
    Type.GET_BUYERS_REGIONS_CAPITAL_COUNT_SUCCESS,
    Type.GET_BUYERS_REGIONS_CAPITAL_COUNT_FAILURE,
  ]
  return get(API.GET_BUYERS_REGIONS_CAPITAL_COUNT, TYPES, reqData)
}
