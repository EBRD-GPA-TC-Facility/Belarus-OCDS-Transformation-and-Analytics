import * as Type from './EnquiriesAvgPerProcedureConstants'


const initialState = {
  enquiriesAvgPerProcedure: {},
  enquiriesAvgPerProcedureIsFetching: false,
  enquiriesAvgPerProcedureErrorMessage: null,
}

const enquiriesAvgPerProcedureState = (state = initialState, action) => {
  switch (action.type) {
    case Type.GET_ENQUIRIES_AVG_PER_PROCEDURE_REQUEST:
      return {
        ...state,
        enquiriesAvgPerProcedureIsFetching: true,
        enquiriesAvgPerProcedureErrorMessage: null,
      }

    case Type.GET_ENQUIRIES_AVG_PER_PROCEDURE_SUCCESS:
      return {
        ...state,
        enquiriesAvgPerProcedure: action.payload,
        enquiriesAvgPerProcedureIsFetching: false,
      }

    case Type.GET_ENQUIRIES_AVG_PER_PROCEDURE_FAILURE:
      return {
        ...state,
        enquiriesAvgPerProcedureIsFetching: false,
        enquiriesAvgPerProcedureErrorMessage: action.errorMessage,
      }

    case Type.GET_ENQUIRIES_AVG_PER_PROCEDURE_CLEAR:
      return {
        ...state,
        enquiriesAvgPerProcedure: {},
      }

    default:
      return {
        ...state,
      }
  }
}

export default enquiriesAvgPerProcedureState
