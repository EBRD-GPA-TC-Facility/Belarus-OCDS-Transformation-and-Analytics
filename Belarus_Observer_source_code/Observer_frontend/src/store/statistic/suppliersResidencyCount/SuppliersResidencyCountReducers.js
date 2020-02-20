import * as Type from './SuppliersResidencyCountConstants'


const initialState = {
  suppliersResidencyCount: {},
  suppliersResidencyCountIsFetching: false,
  suppliersResidencyCountErrorMessage: null,
}

const suppliersResidencyCountState = (state = initialState, action) => {
  switch (action.type) {
    case Type.GET_SUPPLIERS_RESIDENCY_COUNT_REQUEST:
      return {
        ...state,
        suppliersResidencyCountIsFetching: true,
        suppliersResidencyCountErrorMessage: null,
      }

    case Type.GET_SUPPLIERS_RESIDENCY_COUNT_SUCCESS:
      return {
        ...state,
        suppliersResidencyCount: action.payload,
        suppliersResidencyCountIsFetching: false,
      }

    case Type.GET_SUPPLIERS_RESIDENCY_COUNT_FAILURE:
      return {
        ...state,
        suppliersResidencyCountIsFetching: false,
        suppliersResidencyCountErrorMessage: action.errorMessage,
      }

    case Type.GET_SUPPLIERS_RESIDENCY_COUNT_CLEAR:
      return {
        ...state,
        suppliersResidencyCount: {},
      }

    default:
      return {
        ...state,
      }
  }
}

export default suppliersResidencyCountState
