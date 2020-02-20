import * as Type from './KpiBuyersSuppliersCountConstants'


const initialState = {
  kpiBuyersSuppliersCount: {},
  kpiBuyersSuppliersCountIsFetching: false,
  kpiBuyersSuppliersCountErrorMessage: null,
}

const kpiBuyersSuppliersCountState = (state = initialState, action) => {
  switch (action.type) {
    case Type.GET_KPI_BUYERS_SUPPLIERS_COUNT_REQUEST:
      return {
        ...state,
        kpiBuyersSuppliersCountIsFetching: true,
        kpiBuyersSuppliersCountErrorMessage: null,
      }

    case Type.GET_KPI_BUYERS_SUPPLIERS_COUNT_SUCCESS:
      return {
        ...state,
        kpiBuyersSuppliersCount: action.payload,
        kpiBuyersSuppliersCountIsFetching: false,
      }

    case Type.GET_KPI_BUYERS_SUPPLIERS_COUNT_FAILURE:
      return {
        ...state,
        kpiBuyersSuppliersCountIsFetching: false,
        kpiBuyersSuppliersCountErrorMessage: action.errorMessage,
      }

    case Type.GET_KPI_BUYERS_SUPPLIERS_COUNT_CLEAR:
      return {
        ...state,
        kpiBuyersSuppliersCount: {},
      }

    default:
      return {
        ...state,
      }
  }
}

export default kpiBuyersSuppliersCountState
