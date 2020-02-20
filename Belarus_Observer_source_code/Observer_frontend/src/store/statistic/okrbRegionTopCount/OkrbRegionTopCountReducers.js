import * as Type from './OkrbRegionTopCountConstants'


const initialState = {
  okrbRegionTopCount: {},
  okrbRegionTopCountIsFetching: false,
  okrbRegionTopCountErrorMessage: null,
}

const okrbRegionTopCountState = (state = initialState, action) => {
  switch (action.type) {
    case Type.GET_OKRB_REGION_TOP_COUNT_REQUEST:
      return {
        ...state,
        okrbRegionTopCountIsFetching: true,
        okrbRegionTopCountErrorMessage: null,
      }

    case Type.GET_OKRB_REGION_TOP_COUNT_SUCCESS:
      return {
        ...state,
        okrbRegionTopCount: action.payload,
        okrbRegionTopCountIsFetching: false,
      }

    case Type.GET_OKRB_REGION_TOP_COUNT_FAILURE:
      return {
        ...state,
        okrbRegionTopCountIsFetching: false,
        okrbRegionTopCountErrorMessage: action.errorMessage,
      }

    case Type.GET_OKRB_REGION_TOP_COUNT_CLEAR:
      return {
        ...state,
        okrbRegionTopCount: {},
      }

    default:
      return {
        ...state,
      }
  }
}

export default okrbRegionTopCountState
