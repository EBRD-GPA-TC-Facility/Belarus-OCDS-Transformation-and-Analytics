import { get }   from '../../../utils/api/apiUtils'
import * as Type from './KpiContractsGswCountConstants'
import * as API  from '../../../utils/api/apiConstants'


export const getKpiContractsGswCount = (reqData) => {
  const TYPES = [
    Type.GET_KPI_CONTRACTS_GSW_COUNT_REQUEST,
    Type.GET_KPI_CONTRACTS_GSW_COUNT_SUCCESS,
    Type.GET_KPI_CONTRACTS_GSW_COUNT_FAILURE,
  ]
  return get(API.GET_KPI_CONTRACTS_GSW_COUNT, TYPES, reqData)
}
