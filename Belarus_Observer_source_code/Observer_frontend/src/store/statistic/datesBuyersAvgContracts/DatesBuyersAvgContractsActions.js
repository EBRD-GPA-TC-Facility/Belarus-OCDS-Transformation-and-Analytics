import { get }   from '../../../utils/api/apiUtils'
import * as Type from './DatesBuyersAvgContractsConstants'
import * as API  from '../../../utils/api/apiConstants'


export const getDatesBuyersAvgContracts = (reqData) => {
  const TYPES = [
    Type.GET_DATES_BUYERS_AVG_CONTRACTS_REQUEST,
    Type.GET_DATES_BUYERS_AVG_CONTRACTS_SUCCESS,
    Type.GET_DATES_BUYERS_AVG_CONTRACTS_FAILURE,
  ]
  return get(API.GET_DATES_BUYERS_AVG_CONTRACTS, TYPES, reqData)
}
