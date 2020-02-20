import { get }   from '../../../utils/api/apiUtils'
import * as Type from './ProcedureTypesContractsAmountConstants'
import * as API  from '../../../utils/api/apiConstants'


export const getProcedureTypesContractsAmount = (reqData) => {
  const TYPES = [
    Type.GET_PROCEDURE_TYPES_CONTRACTS_AMOUNT_STATE_REQUEST,
    Type.GET_PROCEDURE_TYPES_CONTRACTS_AMOUNT_STATE_SUCCESS,
    Type.GET_PROCEDURE_TYPES_CONTRACTS_AMOUNT_STATE_FAILURE,
  ]
  return get(API.GET_PROCEDURE_TYPES_CONTRACTS_AMOUNT_STATE, TYPES, reqData)
}
