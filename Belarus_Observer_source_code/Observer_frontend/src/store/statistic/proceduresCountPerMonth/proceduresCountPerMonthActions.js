import { get }   from '../../../utils/api/apiUtils'
import * as Type from './proceduresCountPerMonthConstants'
import * as API  from '../../../utils/api/apiConstants'


export const getProceduresCountPerMonth = (reqData) => {
  const TYPES = [
    Type.GET_PROCEDURES_COUNT_PER_MONTH_REQUEST,
    Type.GET_PROCEDURES_COUNT_PER_MONTH_SUCCESS,
    Type.GET_PROCEDURES_COUNT_PER_MONTH_FAILURE,
  ]
  return get(API.GET_PROCEDURES_COUNT_PER_MONTH, TYPES, reqData)
}
