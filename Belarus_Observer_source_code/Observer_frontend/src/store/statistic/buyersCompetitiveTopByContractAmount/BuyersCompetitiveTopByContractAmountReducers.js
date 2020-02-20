import * as Type from './BuyersCompetitiveTopByContractAmountConstants'


const initialState = {
  buyersCompetitiveTopByContractAmount: {},
  buyersCompetitiveTopByContractAmountIsFetching: false,
  buyersCompetitiveTopByContractAmountErrorMessage: null,
}

const buyersCompetitiveTopByContractAmountState = (state = initialState, action) => {
  switch (action.type) {
    case Type.GET_BUYERS_COMPETITIVE_TOP_BY_CONTRACT_AMOUNT_REQUEST:
      return {
        ...state,
        buyersCompetitiveTopByContractAmountIsFetching: true,
        buyersCompetitiveTopByContractAmountErrorMessage: null,
      }

    case Type.GET_BUYERS_COMPETITIVE_TOP_BY_CONTRACT_AMOUNT_SUCCESS:
      return {
        ...state,
        buyersCompetitiveTopByContractAmount: action.payload,
        buyersCompetitiveTopByContractAmountIsFetching: false,
      }

    case Type.GET_BUYERS_COMPETITIVE_TOP_BY_CONTRACT_AMOUNT_FAILURE:
      return {
        ...state,
        buyersCompetitiveTopByContractAmountIsFetching: false,
        buyersCompetitiveTopByContractAmountErrorMessage: action.errorMessage,
      }

    case Type.GET_BUYERS_COMPETITIVE_TOP_BY_CONTRACT_AMOUNT_CLEAR:
      return {
        ...state,
        buyersCompetitiveTopByContractAmount: {},
      }

    default:
      return {
        ...state,
      }
  }
}

export default buyersCompetitiveTopByContractAmountState
