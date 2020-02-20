import * as Type from './SuppliersRegionsSuppliersCountConstants'


const initialState = {
  suppliersRegionsSuppliersCount: {},
  suppliersRegionsSuppliersCountIsFetching: false,
  suppliersRegionsSuppliersCountErrorMessage: null,
}

const suppliersRegionsSuppliersCountState = (state = initialState, action) => {
  switch (action.type) {
    case Type.GET_SUPPLIERS_REGIONS_SUPPLIERS_COUNT_REQUEST:
      return {
        ...state,
        suppliersRegionsSuppliersCountIsFetching: true,
        suppliersRegionsSuppliersCountErrorMessage: null,
      }

    case Type.GET_SUPPLIERS_REGIONS_SUPPLIERS_COUNT_SUCCESS:
      return {
        ...state,
        suppliersRegionsSuppliersCount: action.payload,
        suppliersRegionsSuppliersCountIsFetching: false,
      }

    case Type.GET_SUPPLIERS_REGIONS_SUPPLIERS_COUNT_FAILURE:
      return {
        ...state,
        suppliersRegionsSuppliersCountIsFetching: false,
        suppliersRegionsSuppliersCountErrorMessage: action.errorMessage,
      }

    case Type.GET_SUPPLIERS_REGIONS_SUPPLIERS_COUNT_CLEAR:
      return {
        ...state,
        suppliersRegionsSuppliersCount: {},
      }

    default:
      return {
        ...state,
      }
  }
}

export default suppliersRegionsSuppliersCountState
