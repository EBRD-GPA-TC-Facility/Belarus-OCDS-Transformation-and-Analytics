import { get }   from '../../../utils/api/apiUtils'
import * as Type from './KpiLotsCompletedShareConstants'
import * as API  from '../../../utils/api/apiConstants'


export const getKpiLotsCompletedShare = (reqData) => {
  const TYPES = [
    Type.GET_KPI_LOTS_COMPLETED_SHARE_REQUEST,
    Type.GET_KPI_LOTS_COMPLETED_SHARE_SUCCESS,
    Type.GET_KPI_LOTS_COMPLETED_SHARE_FAILURE,
  ]
  return get(API.GET_KPI_LOTS_COMPLETED_SHARE, TYPES, reqData)
}
