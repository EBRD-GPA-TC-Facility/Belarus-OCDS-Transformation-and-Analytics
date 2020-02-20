import * as Types from './CompetitivityDatesAmountConstants'


const competitivityDatesAmountState = {
  competitivityDatesAmount: {},
  competitivityDatesAmountIsFetching: false,
  competitivityDatesAmountErrorMessage: null,
}

const competitivityDatesAmount = (state = competitivityDatesAmountState, action) => {
  switch (action.type) {
    case Types.COMPETITIVITY_DATES_AMOUNT_REQUEST:
      return {
        ...state,
        competitivityDatesAmountIsFetching: true,
        competitivityDatesAmountErrorMessage: null,
      }
    case Types.COMPETITIVITY_DATES_AMOUNT_SUCCESS:
      return {
        ...state,
        competitivityDatesAmountIsFetching: false,
        competitivityDatesAmount: action.payload,
      }
    case Types.COMPETITIVITY_DATES_AMOUNT_FAILURE:
      return {
        ...state,
        competitivityDatesAmountErrorMessage: action.errorMessage,
      }
    case Types.COMPETITIVITY_DATES_AMOUNT_CLEAR:
      return {
        ...state,
        competitivityDatesAmount: {},
      }

    default:
      return {
        ...state,
      }
  }
}

export default competitivityDatesAmount
