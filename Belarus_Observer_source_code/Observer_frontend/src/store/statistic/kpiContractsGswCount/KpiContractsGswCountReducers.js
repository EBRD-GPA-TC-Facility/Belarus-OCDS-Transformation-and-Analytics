import * as Type from './KpiContractsGswCountConstants'


const initialState = {
  kpiContractsGswCount: {},
  kpiContractsGswCountIsFetching: false,
  kpiContractsGswCountErrorMessage: null,
}

const kpiContractsGswCountState = (state = initialState, action) => {
  switch (action.type) {
    case Type.GET_KPI_CONTRACTS_GSW_COUNT_REQUEST:
      return {
        ...state,
        kpiContractsGswCountIsFetching: true,
        kpiContractsGswCountErrorMessage: null,
      }

    case Type.GET_KPI_CONTRACTS_GSW_COUNT_SUCCESS:
      return {
        ...state,
        kpiContractsGswCount: action.payload,
        kpiContractsGswCountIsFetching: false,
      }

    case Type.GET_KPI_CONTRACTS_GSW_COUNT_FAILURE:
      return {
        ...state,
        kpiContractsGswCountIsFetching: false,
        kpiContractsGswCountErrorMessage: action.errorMessage,
      }

    case Type.GET_KPI_CONTRACTS_GSW_COUNT_CLEAR:
      return {
        ...state,
        kpiContractsGswCount: {},
      }

    default:
      return {
        ...state,
      }
  }
}

export default kpiContractsGswCountState
