import * as Type from './DatesContractsCompetitiveCountAmountConstants'


const initialState = {
  datesContractsCompetitiveCountAmount: {},
  datesContractsCompetitiveCountAmountIsFetching: false,
  datesContractsCompetitiveCountAmountErrorMessage: null,
}

const datesContractsCompetitiveCountAmountState = (state = initialState, action) => {
  switch (action.type) {
    case Type.GET_DATES_CONTRACTS_COMPETITIVE_COUNT_AMOUNT_REQUEST:
      return {
        ...state,
        datesContractsCompetitiveCountAmountIsFetching: true,
        datesContractsCompetitiveCountAmountErrorMessage: null,
      }

    case Type.GET_DATES_CONTRACTS_COMPETITIVE_COUNT_AMOUNT_SUCCESS:
      return {
        ...state,
        datesContractsCompetitiveCountAmount: action.payload,
        datesContractsCompetitiveCountAmountIsFetching: false,
      }

    case Type.GET_DATES_CONTRACTS_COMPETITIVE_COUNT_AMOUNT_FAILURE:
      return {
        ...state,
        datesContractsCompetitiveCountAmountIsFetching: false,
        datesContractsCompetitiveCountAmountErrorMessage: action.errorMessage,
      }

    case Type.GET_DATES_CONTRACTS_COMPETITIVE_COUNT_AMOUNT_CLEAR:
      return {
        ...state,
        datesContractsCompetitiveCountAmount: {},
      }

    default:
      return {
        ...state,
      }
  }
}

export default datesContractsCompetitiveCountAmountState
