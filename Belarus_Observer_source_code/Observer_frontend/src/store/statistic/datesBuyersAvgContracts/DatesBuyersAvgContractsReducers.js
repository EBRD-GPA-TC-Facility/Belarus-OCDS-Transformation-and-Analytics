import * as Type from './DatesBuyersAvgContractsConstants'


const initialState = {
  datesBuyersAvgContracts: {},
  datesBuyersAvgContractsIsFetching: false,
  datesBuyersAvgContractsErrorMessage: null,
}

const datesBuyersAvgContractsState = (state = initialState, action) => {
  switch (action.type) {
    case Type.GET_DATES_BUYERS_AVG_CONTRACTS_REQUEST:
      return {
        ...state,
        datesBuyersAvgContractsIsFetching: true,
        datesBuyersAvgContractsErrorMessage: null,
      }

    case Type.GET_DATES_BUYERS_AVG_CONTRACTS_SUCCESS:
      return {
        ...state,
        datesBuyersAvgContracts: action.payload,
        datesBuyersAvgContractsIsFetching: false,
      }

    case Type.GET_DATES_BUYERS_AVG_CONTRACTS_FAILURE:
      return {
        ...state,
        datesBuyersAvgContractsIsFetching: false,
        datesBuyersAvgContractsErrorMessage: action.errorMessage,
      }

    case Type.GET_DATES_BUYERS_AVG_CONTRACTS_CLEAR:
      return {
        ...state,
        datesBuyersAvgContracts: {},
      }

    default:
      return {
        ...state,
      }
  }
}

export default datesBuyersAvgContractsState
