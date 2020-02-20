import * as Type from './ClassificationTopByContractAmountConstants'


const initialState = {
  classificationTopByContractAmount: {},
  classificationTopByContractAmountIsFetching: false,
  classificationTopByContractAmountErrorMessage: null,
}

const classificationTopByContractAmountState = (state = initialState, action) => {
  switch (action.type) {
    case Type.GET_CLASSIFICATION_TOP_BY_CONTRACT_AMOUNT_REQUEST:
      return {
        ...state,
        classificationTopByContractAmountIsFetching: true,
        classificationTopByContractAmountErrorMessage: null,
      }

    case Type.GET_CLASSIFICATION_TOP_BY_CONTRACT_AMOUNT_SUCCESS:
      return {
        ...state,
        classificationTopByContractAmount: action.payload,
        classificationTopByContractAmountIsFetching: false,
      }

    case Type.GET_CLASSIFICATION_TOP_BY_CONTRACT_AMOUNT_FAILURE:
      return {
        ...state,
        classificationTopByContractAmountIsFetching: false,
        classificationTopByContractAmountErrorMessage: action.errorMessage,
      }

    case Type.GET_CLASSIFICATION_TOP_BY_CONTRACT_AMOUNT_CLEAR:
      return {
        ...state,
        classificationTopByContractAmount: {},
      }

    default:
      return {
        ...state,
      }
  }
}

export default classificationTopByContractAmountState
