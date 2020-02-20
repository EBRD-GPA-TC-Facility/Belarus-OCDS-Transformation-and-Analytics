import { get }   from '../../../utils/api/apiUtils'
import * as Type from './KpiContractsAmountConstants'
import * as API  from '../../../utils/api/apiConstants'


export const getKpiContractsAmount = (reqData) => {
  const TYPES = [
    Type.GET_KPI_CONTRACTS_AMOUNT_REQUEST,
    Type.GET_KPI_CONTRACTS_AMOUNT_SUCCESS,
    Type.GET_KPI_CONTRACTS_AMOUNT_FAILURE,
  ]
  return get(API.GET_KPI_CONTRACTS_AMOUNT, TYPES, reqData)
}
