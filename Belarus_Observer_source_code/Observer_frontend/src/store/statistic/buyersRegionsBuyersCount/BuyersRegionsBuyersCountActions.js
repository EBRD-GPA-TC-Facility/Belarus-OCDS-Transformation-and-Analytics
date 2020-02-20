import { get }   from '../../../utils/api/apiUtils'
import * as Type from './BuyersRegionsBuyersCountConstants'
import * as API  from '../../../utils/api/apiConstants'


export const getBuyersRegionsBuyersCount = (reqData) => {
  const TYPES = [
    Type.GET_BUYERS_REGIONS_BUYERS_COUNT_REQUEST,
    Type.GET_BUYERS_REGIONS_BUYERS_COUNT_SUCCESS,
    Type.GET_BUYERS_REGIONS_BUYERS_COUNT_FAILURE,
  ]
  return get(API.GET_BUYERS_REGIONS_BUYERS_COUNT, TYPES, reqData)
}
