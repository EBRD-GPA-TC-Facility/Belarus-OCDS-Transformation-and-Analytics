import { get }                                     from '../../../utils/api/apiUtils'
import * as Type                                   from './topTenSuppliersConstants'
import * as API                                    from '../../../utils/api/apiConstants'

export const getTopTenSuppliersByContractCount = (reqData) => {
  const TYPES = [
    Type.GET_TOP_TEN_SUPPLIERS_BY_CONTRACT_COUNT_REQUEST,
    Type.GET_TOP_TEN_SUPPLIERS_BY_CONTRACT_COUNT_SUCCESS,
    Type.GET_TOP_TEN_SUPPLIERS_BY_CONTRACT_COUNT_FAILURE,
  ]
  return get(API.GET_TOP_TEN_SUPPLIERS_BY_CONTRACT_COUNT, TYPES, reqData)
}

export const getTopTenSuppliersByContractAmount = (reqData) => {
  const TYPES = [
    Type.GET_TOP_TEN_SUPPLIERS_BY_CONTRACT_AMOUNT_REQUEST,
    Type.GET_TOP_TEN_SUPPLIERS_BY_CONTRACT_AMOUNT_SUCCESS,
    Type.GET_TOP_TEN_SUPPLIERS_BY_CONTRACT_AMOUNT_FAILURE,
  ]
  return get(API.GET_TOP_TEN_SUPPLIERS_BY_CONTRACT_AMOUNT, TYPES, reqData)
}
