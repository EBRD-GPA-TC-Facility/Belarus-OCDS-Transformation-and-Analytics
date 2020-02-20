import { get }   from '../../../utils/api/apiUtils'
import * as Type from './DatesContractsCompetitiveCountAmountConstants'
import * as API  from '../../../utils/api/apiConstants'


export const getDatesContractsCompetitiveCountAmount = (reqData) => {
  const TYPES = [
    Type.GET_DATES_CONTRACTS_COMPETITIVE_COUNT_AMOUNT_REQUEST,
    Type.GET_DATES_CONTRACTS_COMPETITIVE_COUNT_AMOUNT_SUCCESS,
    Type.GET_DATES_CONTRACTS_COMPETITIVE_COUNT_AMOUNT_FAILURE,
  ]
  return get(API.GET_DATES_CONTRACTS_COMPETITIVE_COUNT_AMOUNT, TYPES, reqData)
}
