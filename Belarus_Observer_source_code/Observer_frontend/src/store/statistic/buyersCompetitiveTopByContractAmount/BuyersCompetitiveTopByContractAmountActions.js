import { get }   from '../../../utils/api/apiUtils'
import * as Type from './BuyersCompetitiveTopByContractAmountConstants'
import * as API  from '../../../utils/api/apiConstants'


export const getBuyersCompetitiveTopByContractAmount = (reqData) => {
  const TYPES = [
    Type.GET_BUYERS_COMPETITIVE_TOP_BY_CONTRACT_AMOUNT_REQUEST,
    Type.GET_BUYERS_COMPETITIVE_TOP_BY_CONTRACT_AMOUNT_SUCCESS,
    Type.GET_BUYERS_COMPETITIVE_TOP_BY_CONTRACT_AMOUNT_FAILURE,
  ]
  return get(API.GET_BUYERS_COMPETITIVE_TOP_BY_CONTRACT_AMOUNT, TYPES, reqData)
}
