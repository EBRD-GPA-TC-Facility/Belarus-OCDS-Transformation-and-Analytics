import * as Type from './SmallScaleBusinessLotsCountConstants'


const initialState = {
  smallScaleBusinessLotsCount: {},
  smallScaleBusinessLotsCountIsFetching: false,
  smallScaleBusinessLotsCountErrorMessage: null,
}

const smallScaleBusinessLotsCountState = (state = initialState, action) => {
  switch (action.type) {
    case Type.GET_SMALL_SCALE_BUSINESS_LOTS_COUNT_REQUEST:
      return {
        ...state,
        smallScaleBusinessLotsCountIsFetching: true,
        smallScaleBusinessLotsCountErrorMessage: null,
      }

    case Type.GET_SMALL_SCALE_BUSINESS_LOTS_COUNT_SUCCESS:
      return {
        ...state,
        smallScaleBusinessLotsCount: action.payload,
        smallScaleBusinessLotsCountIsFetching: false,
      }

    case Type.GET_SMALL_SCALE_BUSINESS_LOTS_COUNT_FAILURE:
      return {
        ...state,
        smallScaleBusinessLotsCountIsFetching: false,
        smallScaleBusinessLotsCountErrorMessage: action.errorMessage,
      }

    case Type.GET_SMALL_SCALE_BUSINESS_LOTS_COUNT_CLEAR:
      return {
        ...state,
        smallScaleBusinessLotsCount: {},
      }

    default:
      return {
        ...state,
      }
  }
}

export default smallScaleBusinessLotsCountState
