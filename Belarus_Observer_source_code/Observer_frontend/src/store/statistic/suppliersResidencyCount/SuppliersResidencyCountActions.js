import { get }   from '../../../utils/api/apiUtils'
import * as Type from './SuppliersResidencyCountConstants'
import * as API  from '../../../utils/api/apiConstants'


export const getSuppliersResidencyCount = (reqData) => {
  const TYPES = [
    Type.GET_SUPPLIERS_RESIDENCY_COUNT_REQUEST,
    Type.GET_SUPPLIERS_RESIDENCY_COUNT_SUCCESS,
    Type.GET_SUPPLIERS_RESIDENCY_COUNT_FAILURE,
  ]
  return get(API.GET_SUPPLIERS_RESIDENCY_COUNT, TYPES, reqData)
}
