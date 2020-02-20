import { get }   from '../../../utils/api/apiUtils'
import * as Type from './KpiBuyersSuppliersCountConstants'
import * as API  from '../../../utils/api/apiConstants'


export const getKpiBuyersSuppliersCount = (reqData) => {
  const TYPES = [
    Type.GET_KPI_BUYERS_SUPPLIERS_COUNT_REQUEST,
    Type.GET_KPI_BUYERS_SUPPLIERS_COUNT_SUCCESS,
    Type.GET_KPI_BUYERS_SUPPLIERS_COUNT_FAILURE,
  ]
  return get(API.GET_KPI_BUYERS_SUPPLIERS_COUNT, TYPES, reqData)
}
