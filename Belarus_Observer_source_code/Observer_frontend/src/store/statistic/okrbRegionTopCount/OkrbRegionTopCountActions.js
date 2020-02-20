import { get }   from '../../../utils/api/apiUtils'
import * as Type from './OkrbRegionTopCountConstants'
import * as API  from '../../../utils/api/apiConstants'


export const getOkrbRegionTopCount = (reqData) => {
  const TYPES = [
    Type.GET_OKRB_REGION_TOP_COUNT_REQUEST,
    Type.GET_OKRB_REGION_TOP_COUNT_SUCCESS,
    Type.GET_OKRB_REGION_TOP_COUNT_FAILURE,
  ]
  return get(API.GET_OKRB_REGION_TOP_COUNT, TYPES, reqData)
}
