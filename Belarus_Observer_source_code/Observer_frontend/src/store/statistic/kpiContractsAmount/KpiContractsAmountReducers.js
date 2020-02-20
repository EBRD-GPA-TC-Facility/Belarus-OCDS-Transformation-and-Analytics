import * as Type from './KpiContractsAmountConstants'


const initialState = {
  kpiContractsAmount: {},
  kpiContractsAmountIsFetching: false,
  kpiContractsAmountErrorMessage: null,
}

const kpiContractsAmountState = (state = initialState, action) => {
  switch (action.type) {
    case Type.GET_KPI_CONTRACTS_AMOUNT_REQUEST:
      return {
        ...state,
        kpiContractsAmountIsFetching: true,
        kpiContractsAmountErrorMessage: null,
      }

    case Type.GET_KPI_CONTRACTS_AMOUNT_SUCCESS:
      return {
        ...state,
        kpiContractsAmount: action.payload,
        kpiContractsAmountIsFetching: false,
      }

    case Type.GET_KPI_CONTRACTS_AMOUNT_FAILURE:
      return {
        ...state,
        kpiContractsAmountIsFetching: false,
        kpiContractsAmountErrorMessage: action.errorMessage,
      }

    case Type.GET_KPI_CONTRACTS_AMOUNT_CLEAR:
      return {
        ...state,
        kpiContractsAmount: {},
      }

    default:
      return {
        ...state,
      }
  }
}

export default kpiContractsAmountState
