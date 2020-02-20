import { get }   from '../../../utils/api/apiUtils'
import * as Type from './OkrbRegionTopAmountConstants'
import * as API  from '../../../utils/api/apiConstants'


export const getOkrbRegionTopAmount = (reqData) => {
  const TYPES = [
    Type.GET_OKRB_REGION_TOP_AMOUNT_REQUEST,
    Type.GET_OKRB_REGION_TOP_AMOUNT_SUCCESS,
    Type.GET_OKRB_REGION_TOP_AMOUNT_FAILURE,
  ]
  return get(API.GET_OKRB_REGION_TOP_AMOUNT, TYPES, reqData)
}
