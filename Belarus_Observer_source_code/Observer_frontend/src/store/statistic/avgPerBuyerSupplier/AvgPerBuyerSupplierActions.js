import { get }   from '../../../utils/api/apiUtils'
import * as Type from './AvgPerBuyerSupplierConstants'
import * as API  from '../../../utils/api/apiConstants'


export const getAvgPerBuyerSupplier = (reqData) => {
  const TYPES = [
    Type.GET_AVG_PER_BUYER_SUPPLIER_REQUEST,
    Type.GET_AVG_PER_BUYER_SUPPLIER_SUCCESS,
    Type.GET_AVG_PER_BUYER_SUPPLIER_FAILURE,
  ]
  return get(API.GET_AVG_PER_BUYER_SUPPLIER, TYPES, reqData)
}
