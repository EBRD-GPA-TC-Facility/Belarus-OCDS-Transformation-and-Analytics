import { get }   from '../../../utils/api/apiUtils'
import * as Type from './ContractBudgetAmountShareConstants'
import * as API  from '../../../utils/api/apiConstants'


export const getContractBudgetAmountShare = (reqData) => {
  const TYPES = [
    Type.GET_CONTRACT_BUDGET_AMOUNT_SHARE_REQUEST,
    Type.GET_CONTRACT_BUDGET_AMOUNT_SHARE_SUCCESS,
    Type.GET_CONTRACT_BUDGET_AMOUNT_SHARE_FAILURE,
  ]
  return get(API.GET_CONTRACT_BUDGET_AMOUNT_SHARE, TYPES, reqData)
}
