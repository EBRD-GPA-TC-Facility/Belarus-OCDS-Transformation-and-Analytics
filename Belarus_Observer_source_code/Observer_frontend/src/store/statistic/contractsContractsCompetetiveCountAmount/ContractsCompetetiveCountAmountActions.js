import { get }                              from '../../../utils/api/apiUtils'
import * as Type                            from './ContractsCompetetiveCountAmountConstants'
import * as API                             from '../../../utils/api/apiConstants'


export const getContractsCompetetiveCountAmount = (reqData) => {
  const TYPES = [
    Type.GET_CONTRACTS_COMPETETIVE_COUNT_AMOUNT_REQUEST,
    Type.GET_CONTRACTS_COMPETETIVE_COUNT_AMOUNT_SUCCESS,
    Type.GET_CONTRACTS_COMPETETIVE_COUNT_AMOUNT_FAILURE,
  ]
  return get(API.GET_CONTRACTS_COMPETETIVE_COUNT_AMOUNT, TYPES, reqData)
}
