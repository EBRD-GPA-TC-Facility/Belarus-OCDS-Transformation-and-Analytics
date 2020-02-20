import * as Type from './proceduresCountPerMonthConstants'


const initialState = {
  proceduresCountPerMonth: {},
  proceduresCountPerMonthIsFetching: false,
  proceduresCountPerMonthErrorMessage: null,
}

const proceduresCountPerMonthState = (state = initialState, action) => {
  switch (action.type) {
    case Type.GET_PROCEDURES_COUNT_PER_MONTH_REQUEST:
      return {
        ...state,
        proceduresCountPerMonthIsFetching: true,
        proceduresCountPerMonthErrorMessage: null,
      }

    case Type.GET_PROCEDURES_COUNT_PER_MONTH_SUCCESS:
      return {
        ...state,
        proceduresCountPerMonth: action.payload,
        proceduresCountPerMonthIsFetching: false,
      }

    case Type.GET_PROCEDURES_COUNT_PER_MONTH_FAILURE:
      return {
        ...state,
        proceduresCountPerMonthIsFetching: false,
        proceduresCountPerMonthErrorMessage: action.errorMessage,
      }

    case Type.GET_PROCEDURES_COUNT_PER_MONTH_CLEAR:
      return {
        ...state,
        proceduresCountPerMonth: {},
      }

    default:
      return {
        ...state,
      }
  }
}

export default proceduresCountPerMonthState
