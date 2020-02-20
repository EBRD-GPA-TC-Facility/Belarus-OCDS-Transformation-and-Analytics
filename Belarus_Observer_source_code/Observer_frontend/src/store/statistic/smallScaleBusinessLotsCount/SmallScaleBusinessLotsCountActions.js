import { get }   from '../../../utils/api/apiUtils'
import * as Type from './SmallScaleBusinessLotsCountConstants'
import * as API  from '../../../utils/api/apiConstants'


export const getSmallScaleBusinessLotsCount = (reqData) => {
  const TYPES = [
    Type.GET_SMALL_SCALE_BUSINESS_LOTS_COUNT_REQUEST,
    Type.GET_SMALL_SCALE_BUSINESS_LOTS_COUNT_SUCCESS,
    Type.GET_SMALL_SCALE_BUSINESS_LOTS_COUNT_FAILURE,
  ]
  return get(API.GET_SMALL_SCALE_BUSINESS_LOTS_COUNT, TYPES, reqData)
}
