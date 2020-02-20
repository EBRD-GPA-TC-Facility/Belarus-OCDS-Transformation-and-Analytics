import { get }   from '../../../utils/api/apiUtils'
import * as Type from './EnquiriesAvgPerProcedureConstants'
import * as API  from '../../../utils/api/apiConstants'


export const getEnquiriesAvgPerProcedure = (reqData) => {
  const TYPES = [
    Type.GET_ENQUIRIES_AVG_PER_PROCEDURE_REQUEST,
    Type.GET_ENQUIRIES_AVG_PER_PROCEDURE_SUCCESS,
    Type.GET_ENQUIRIES_AVG_PER_PROCEDURE_FAILURE,
  ]
  return get(API.GET_ENQUIRIES_AVG_PER_PROCEDURE, TYPES, reqData)
}
