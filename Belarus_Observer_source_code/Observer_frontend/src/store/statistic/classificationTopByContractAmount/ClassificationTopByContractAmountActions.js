import { get }   from '../../../utils/api/apiUtils'
import * as Type from './ClassificationTopByContractAmountConstants'
import * as API  from '../../../utils/api/apiConstants'


export const getClassificationTopByContractAmount = (reqData) => {
  const TYPES = [
    Type.GET_CLASSIFICATION_TOP_BY_CONTRACT_AMOUNT_REQUEST,
    Type.GET_CLASSIFICATION_TOP_BY_CONTRACT_AMOUNT_SUCCESS,
    Type.GET_CLASSIFICATION_TOP_BY_CONTRACT_AMOUNT_FAILURE,
  ]
  return get(API.GET_CLASSIFICATION_TOP_BY_CONTRACT_AMOUNT, TYPES, reqData)
}
