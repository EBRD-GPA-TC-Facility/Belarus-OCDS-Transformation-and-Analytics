import { get }   from '../../../utils/api/apiUtils'
import * as Type from './SuppliersRegionsSuppliersCountConstants'
import * as API  from '../../../utils/api/apiConstants'


export const getSuppliersRegionsSuppliersCount = (reqData) => {
  const TYPES = [
    Type.GET_SUPPLIERS_REGIONS_SUPPLIERS_COUNT_REQUEST,
    Type.GET_SUPPLIERS_REGIONS_SUPPLIERS_COUNT_SUCCESS,
    Type.GET_SUPPLIERS_REGIONS_SUPPLIERS_COUNT_FAILURE,
  ]
  return get(API.GET_SUPPLIERS_REGIONS_SUPPLIERS_COUNT, TYPES, reqData)
}
