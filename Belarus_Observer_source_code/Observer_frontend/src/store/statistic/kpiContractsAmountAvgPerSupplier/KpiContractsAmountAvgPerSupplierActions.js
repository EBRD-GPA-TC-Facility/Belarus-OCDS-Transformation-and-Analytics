import { get }   from '../../../utils/api/apiUtils'
import * as Type from './KpiContractsAmountAvgPerSupplierConstants'
import * as API  from '../../../utils/api/apiConstants'


export const getKpiContractsAmountAvgPerSupplier = (reqData) => {
  const TYPES = [
    Type.KPI_CONTRACTS_AMOUNT_AVG_PER_SUPPLIER_REQUEST,
    Type.KPI_CONTRACTS_AMOUNT_AVG_PER_SUPPLIER_SUCCESS,
    Type.KPI_CONTRACTS_AMOUNT_AVG_PER_SUPPLIER_FAILURE,
  ]
  return get(API.GET_KPI_CONTRACTS_AMOUNT_AVG_PER_SUPPLIER, TYPES, reqData)
}
