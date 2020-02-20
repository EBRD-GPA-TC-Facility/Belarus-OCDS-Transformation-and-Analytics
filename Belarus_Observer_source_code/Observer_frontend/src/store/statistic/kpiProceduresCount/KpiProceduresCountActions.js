import { get }   from '../../../utils/api/apiUtils'
import * as Type from './KpiProceduresCountConstants'
import * as API  from '../../../utils/api/apiConstants'


export const getKpiProceduresCount = (reqData) => {
  const TYPES = [
    Type.GET_KPI_PROCEDURES_COUNT_REQUEST,
    Type.GET_KPI_PROCEDURES_COUNT_SUCCESS,
    Type.GET_KPI_PROCEDURES_COUNT_FAILURE,
  ]
  return get(API.GET_KPI_PROCEDURES_COUNT, TYPES, reqData)
}
