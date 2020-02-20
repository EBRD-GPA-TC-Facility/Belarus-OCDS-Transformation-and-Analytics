import { get }   from '../../../utils/api/apiUtils'
import * as Type from './SmallScaleSuppliersContractsAmountConstants'
import * as API  from '../../../utils/api/apiConstants'


export const getSmallScaleSuppliersContractsAmount = (reqData) => {
  const TYPES = [
    Type.GET_SMALL_SCALE_SUPPLIERS_CONTRACTS_AMOUNT_STATE_REQUEST,
    Type.GET_SMALL_SCALE_SUPPLIERS_CONTRACTS_AMOUNT_STATE_SUCCESS,
    Type.GET_SMALL_SCALE_SUPPLIERS_CONTRACTS_AMOUNT_STATE_FAILURE,
  ]
  return get(API.GET_SMALL_SCALE_SUPPLIERS_CONTRACTS_AMOUNT_STATE, TYPES, reqData)
}
