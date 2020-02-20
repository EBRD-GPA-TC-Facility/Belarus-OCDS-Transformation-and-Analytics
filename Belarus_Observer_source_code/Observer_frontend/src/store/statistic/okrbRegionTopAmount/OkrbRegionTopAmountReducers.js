import * as Type from './OkrbRegionTopAmountConstants'


const initialState = {
  okrbRegionTopAmount: {},
  okrbRegionTopAmountIsFetching: false,
  okrbRegionTopAmountErrorMessage: null,
}

const okrbRegionTopAmountState = (state = initialState, action) => {
  switch (action.type) {
    case Type.GET_OKRB_REGION_TOP_AMOUNT_REQUEST:
      return {
        ...state,
        okrbRegionTopAmountIsFetching: true,
        okrbRegionTopAmountErrorMessage: null,
      }

    case Type.GET_OKRB_REGION_TOP_AMOUNT_SUCCESS:
      return {
        ...state,
        okrbRegionTopAmount: action.payload,
        okrbRegionTopAmountIsFetching: false,
      }

    case Type.GET_OKRB_REGION_TOP_AMOUNT_FAILURE:
      return {
        ...state,
        okrbRegionTopAmountIsFetching: false,
        okrbRegionTopAmountErrorMessage: action.errorMessage,
      }

    case Type.GET_OKRB_REGION_TOP_AMOUNT_CLEAR:
      return {
        ...state,
        okrbRegionTopAmount: {},
      }

    default:
      return {
        ...state,
      }
  }
}

export default okrbRegionTopAmountState
