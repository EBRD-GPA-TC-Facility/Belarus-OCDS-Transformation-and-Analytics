import * as Types from './DashboardConstants'

import {get} from '../../utils/api/apiUtils'
import * as API from '../../utils/api/apiConstants'


export const getProcuringEntitiesDatesCount = () => {
  const TYPES = [
    Types.PROCURING_ENT_DATES_COUNT_REQUEST,
    Types.PROCURING_ENT_DATES_COUNT_SUCCESS,
    Types.PROCURING_ENT_DATES_COUNT_FAILURE
  ]
  return get(API.PROCURING_ENT_DATES_COUNT, TYPES)
}
export const getSuppliersDatesCount = () => {
  const TYPES = [
    Types.SUPPLIERS_DATES_COUNT_REQUEST,
    Types.SUPPLIERS_DATES_COUNT_SUCCESS,
    Types.SUPPLIERS_DATES_COUNT_FAILURE
  ]
  return get(API.SUPPLIERS_DATES_COUNT, TYPES)
}
export const getLotsCompleteDatesCount = () => {
  const TYPES = [
    Types.LOTS_COMPLETE_DATES_COUNT_REQUEST,
    Types.LOTS_COMPLETE_DATES_COUNT_SUCCESS,
    Types.LOTS_ACTIVE_DATES_COUNT_FAILURE
  ]
  return get(API.LOTS_COMPLETE_DATES_COUNT, TYPES)
}
export const getLotsActiveDatesCount = () => {
  const TYPES = [
    Types.LOTS_ACTIVE_DATES_COUNT_REQUEST,
    Types.LOTS_ACTIVE_DATES_COUNT_SUCCESS,
    Types.LOTS_ACTIVE_DATES_COUNT_FAILURE
  ]
  return get(API.LOTS_ACTIVE_DATES_COUNT, TYPES)
}
export const getProcurementsTop = () => {
  const TYPES = [
    Types.PROCEDURES_TOP_REQUEST,
    Types.PROCEDURES_TOP_SUCCESS,
    Types.PROCEDURES_TOP_FAILURE
  ]
  return get(API.PROCEDURES_TOP, TYPES)
}
export const getSingleSourceProcurementsTop = () => {
  const TYPES = [
    Types.PROCEDURES_SINGLE_SOURCE_TOP_REQUEST,
    Types.PROCEDURES_SINGLE_SOURCE_TOP_SUCCESS,
    Types.PROCEDURES_SINGLE_SOURCE_TOP_FAILURE
  ]
  return get(API.PROCEDURES_SINGLE_SOURCE_TOP, TYPES)
}
export const getOkbrTop = () => {
  const TYPES = [
    Types.OKRB_TOP_REQUEST,
    Types.OKRB_TOP_SUCCESS,
    Types.OKRB_TOP_FAILURE
  ]
  return get(API.OKRB_TOP, TYPES)
}

export const getEnquiriesCount = () => {
  const TYPES = [
    Types.ENQUIRIES_COUNT_REQUEST,
    Types.ENQUIRIES_COUNT_SUCCESS,
    Types.ENQUIRIES_COUNT_FAILURE
  ]
  return get(API.ENQUIRIES_COUNT, TYPES)
}

export const getKpiContractsCount = () => {
  const TYPES = [
    Types.KPI_CONTRACTS_COUNT_REQUEST,
    Types.KPI_CONTRACTS_COUNT_SUCCESS,
    Types.KPI_CONTRACTS_COUNT_FAILURE
  ]
  return get(API.KPI_CONTRACTS_COUNT, TYPES)
}

export const getKpiContractsAmount = () => {
  const TYPES = [
    Types.KPI_CONTRACTS_AMOUNT_REQUEST,
    Types.KPI_CONTRACTS_AMOUNT_SUCCESS,
    Types.KPI_CONTRACTS_AMOUNT_FAILURE
  ]
  return get(API.KPI_CONTRACTS_AMOUNT, TYPES)
}

export const getProceduresSuccessfulCount = () => {
  const TYPES = [
    Types.PROCEDURES_SUCCESSFUL_COUNT_REQUEST,
    Types.PROCEDURES_SUCCESSFUL_COUNT_SUCCESS,
    Types.PROCEDURES_SUCCESSFUL_COUNT_FAILURE
  ]
  return get(API.PROCEDURES_SUCCESSFUL_COUNT, TYPES)
}

export const getProceduresAvgPerHour = () => {
  const TYPES = [
    Types.PROCEDURES_AVG_PER_HOUR_REQUEST,
    Types.PROCEDURES_AVG_PER_HOUR_SUCCESS,
    Types.PROCEDURES_AVG_PER_HOUR_FAILURE
  ]
  return get(API.PROCEDURES_AVG_PER_HOUR, TYPES)
}

export const getProceduresCompetetiveEveryN= () => {
  const TYPES = [
    Types.PROCEDURES_COMPETETIVE_EVERY_N_REQUEST,
    Types.PROCEDURES_COMPETETIVE_EVERY_N_SUCCESS,
    Types.PROCEDURES_COMPETETIVE_EVERY_N_FAILURE
  ]
  return get(API.PROCEDURES_COMPETETIVE_EVERY_N, TYPES)
}

export const getContractsCommonInfo= () => {
  const TYPES = [
    Types.CONTRACTS_COMMON_INFO_REQUEST,
    Types.CONTRACTS_COMMON_INFO_SUCCESS,
    Types.CONTRACTS_COMMON_INFO_FAILURE
  ]
  return get(API.CONTRACTS_COMMON_INFO, TYPES)
}
