import * as Type from './constants'


const initialState = {
  governmentProcurement: {},
  governmentProcurementIsFetching: false,
  governmentProcurementErrorMessage: null,
}

const governmentProcurementState = (state = initialState, action) => {
  switch (action.type) {
    case Type.GET_STORY_GOVERNMENT_PROCUREMENT_REQUEST:
      return {
        ...state,
        governmentProcurementIsFetching: true,
        governmentProcurementErrorMessage: null,
      }

    case Type.GET_STORY_GOVERNMENT_PROCUREMENT_SUCCESS:
      return {
        ...state,
        governmentProcurement: action.payload,
        governmentProcurementIsFetching: false,
      }

    case Type.GET_STORY_GOVERNMENT_PROCUREMENT_FAILURE:
      return {
        ...state,
        governmentProcurementIsFetching: false,
        governmentProcurementErrorMessage: action.errorMessage,
      }

    case Type.GET_STORY_GOVERNMENT_PROCUREMENT_CLEAR:
      return {
        ...state,
        governmentProcurement: {},
      }

    default:
      return {
        ...state,
      }
  }
}

export default governmentProcurementState
