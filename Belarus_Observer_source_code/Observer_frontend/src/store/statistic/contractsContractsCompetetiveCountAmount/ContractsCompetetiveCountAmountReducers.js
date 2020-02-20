import * as Type from './ContractsCompetetiveCountAmountConstants'


const initialState = {
  ContractsCompetetiveCountAmount: {},
  ContractsCompetetiveCountAmountIsFetching: false,
  ContractsCompetetiveCountAmountErrorMessage: null,
}

const ContractsCompetetiveCountAmountState = (state = initialState, action) => {
  switch (action.type) {
    case Type.GET_CONTRACTS_COMPETETIVE_COUNT_AMOUNT_REQUEST:
      return {
        ...state,
        ContractsCompetetiveCountAmountIsFetching: true,
        ContractsCompetetiveCountAmountErrorMessage: null,
      }

    case Type.GET_CONTRACTS_COMPETETIVE_COUNT_AMOUNT_SUCCESS:
      return {
        ...state,
        ContractsCompetetiveCountAmount: action.payload,
        ContractsCompetetiveCountAmountIsFetching: false,
      }

    case Type.GET_CONTRACTS_COMPETETIVE_COUNT_AMOUNT_FAILURE:
      return {
        ...state,
        ContractsCompetetiveCountAmountIsFetching: false,
        ContractsCompetetiveCountAmountErrorMessage: action.errorMessage,
      }

    case Type.GET_CONTRACTS_COMPETETIVE_COUNT_AMOUNT_CLEAR:
      return {
        ...state,
        ContractsCompetetiveCountAmount: {},
      }

    default:
      return {
        ...state,
      }
  }
}

export default ContractsCompetetiveCountAmountState
