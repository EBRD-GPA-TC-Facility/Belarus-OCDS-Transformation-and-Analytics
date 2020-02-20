import * as Types from "./KpiChartsConstants"
import * as API   from "../../../utils/api/apiConstants"

import { get }    from "../../../utils/api/apiUtils"


export const getPerProcedureLotsCount = () => {
  const TYPES = [
    Types.PER_PROCEDURE_LOTS_COUNT_REQUEST,
    Types.PER_PROCEDURE_LOTS_COUNT_SUCCESS,
    Types.PER_PROCEDURE_LOTS_COUNT_FAILURE
  ]
  return get(API.PER_PROCEDURE_LOTS_COUNT, TYPES)
}
export const getPerProcedureOkrbCount  = () => {
  const TYPES = [
    Types.PER_PROCEDURE_OKRB_COUNT_REQUEST,
    Types.PER_PROCEDURE_OKRB_COUNT_SUCCESS,
    Types.PER_PROCEDURE_OKRB_COUNT_FAILURE
  ]
  return get(API.PER_PROCEDURE_OKRB_COUNT, TYPES)
}
export const getPerSupplierContractsCount = () => {
  const TYPES = [
    Types.PER_SUPPLIER_CONTRACTS_COUNT_REQUEST,
    Types.PER_SUPPLIER_CONTRACTS_COUNT_SUCCESS,
    Types.PER_SUPPLIER_CONTRACTS_COUNT_FAILURE
  ]
  return get(API.PER_SUPPLIER_CONTRACTS_COUNT, TYPES)
}
