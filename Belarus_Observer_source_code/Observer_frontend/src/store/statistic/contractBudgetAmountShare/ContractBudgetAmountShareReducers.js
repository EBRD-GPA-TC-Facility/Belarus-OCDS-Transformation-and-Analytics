import * as Type from './ContractBudgetAmountShareConstants'


const initialState = {
  contractBudgetAmountShare: {},
  contractBudgetAmountShareIsFetching: false,
  contractBudgetAmountShareErrorMessage: null,
}

const contractBudgetAmountShareState = (state = initialState, action) => {
  switch (action.type) {
    case Type.GET_CONTRACT_BUDGET_AMOUNT_SHARE_REQUEST:
      return {
        ...state,
        contractBudgetAmountShareIsFetching: true,
        contractBudgetAmountShareErrorMessage: null,
      }

    case Type.GET_CONTRACT_BUDGET_AMOUNT_SHARE_SUCCESS:
      return {
        ...state,
        contractBudgetAmountShare: action.payload,
        contractBudgetAmountShareIsFetching: false,
      }

    case Type.GET_CONTRACT_BUDGET_AMOUNT_SHARE_FAILURE:
      return {
        ...state,
        contractBudgetAmountShareIsFetching: false,
        contractBudgetAmountShareErrorMessage: action.errorMessage,
      }

    case Type.GET_CONTRACT_BUDGET_AMOUNT_SHARE_CLEAR:
      return {
        ...state,
        contractBudgetAmountShare: {},
      }

    default:
      return {
        ...state,
      }
  }
}

export default contractBudgetAmountShareState
