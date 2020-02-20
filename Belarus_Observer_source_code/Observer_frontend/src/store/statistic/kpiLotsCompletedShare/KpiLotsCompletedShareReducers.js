import * as Type from './KpiLotsCompletedShareConstants'


const initialState = {
  kpiLotsCompletedShare: {},
  kpiLotsCompletedShareIsFetching: false,
  kpiLotsCompletedShareErrorMessage: null,
}

const kpiLotsCompletedShareState = (state = initialState, action) => {
  switch (action.type) {
    case Type.GET_KPI_LOTS_COMPLETED_SHARE_REQUEST:
      return {
        ...state,
        kpiLotsCompletedShareIsFetching: true,
        kpiLotsCompletedShareErrorMessage: null,
      }

    case Type.GET_KPI_LOTS_COMPLETED_SHARE_SUCCESS:
      return {
        ...state,
        kpiLotsCompletedShare: action.payload,
        kpiLotsCompletedShareIsFetching: false,
      }

    case Type.GET_KPI_LOTS_COMPLETED_SHARE_FAILURE:
      return {
        ...state,
        kpiLotsCompletedShareIsFetching: false,
        kpiLotsCompletedShareErrorMessage: action.errorMessage,
      }

    case Type.GET_KPI_LOTS_COMPLETED_SHARE_CLEAR:
      return {
        ...state,
        kpiLotsCompletedShare: {},
      }

    default:
      return {
        ...state,
      }
  }
}

export default kpiLotsCompletedShareState
