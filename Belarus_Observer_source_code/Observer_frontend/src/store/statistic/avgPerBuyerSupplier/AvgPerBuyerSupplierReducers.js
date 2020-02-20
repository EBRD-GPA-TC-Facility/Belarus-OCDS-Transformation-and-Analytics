import * as Type from './AvgPerBuyerSupplierConstants'


const initialState = {
  avgPerBuyerSupplier: {},
  avgPerBuyerSupplierIsFetching: false,
  avgPerBuyerSupplierErrorMessage: null,
}

const avgPerBuyerSupplierState = (state = initialState, action) => {
  switch (action.type) {
    case Type.GET_AVG_PER_BUYER_SUPPLIER_REQUEST:
      return {
        ...state,
        avgPerBuyerSupplierIsFetching: true,
        avgPerBuyerSupplierErrorMessage: null,
      }

    case Type.GET_AVG_PER_BUYER_SUPPLIER_SUCCESS:
      return {
        ...state,
        avgPerBuyerSupplier: action.payload,
        avgPerBuyerSupplierIsFetching: false,
      }

    case Type.GET_AVG_PER_BUYER_SUPPLIER_FAILURE:
      return {
        ...state,
        avgPerBuyerSupplierIsFetching: false,
        avgPerBuyerSupplierErrorMessage: action.errorMessage,
      }

    case Type.GET_AVG_PER_BUYER_SUPPLIER_CLEAR:
      return {
        ...state,
        avgPerBuyerSupplier: {},
      }

    default:
      return {
        ...state,
      }
  }
}

export default avgPerBuyerSupplierState
