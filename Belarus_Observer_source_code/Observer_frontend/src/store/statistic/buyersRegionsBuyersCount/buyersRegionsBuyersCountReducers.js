import * as Type from './BuyersRegionsBuyersCountConstants'


const initialState = {
  buyersRegionsBuyersCount: {},
  buyersRegionsBuyersCountIsFetching: false,
  buyersRegionsBuyersCountErrorMessage: null,
}

const buyersRegionsBuyersCountState = (state = initialState, action) => {
  switch (action.type) {
    case Type.GET_BUYERS_REGIONS_BUYERS_COUNT_REQUEST:
      return {
        ...state,
        buyersRegionsBuyersCountIsFetching: true,
        buyersRegionsBuyersCountErrorMessage: null,
      }

    case Type.GET_BUYERS_REGIONS_BUYERS_COUNT_SUCCESS:
      return {
        ...state,
        buyersRegionsBuyersCount: action.payload,
        buyersRegionsBuyersCountIsFetching: false,
      }

    case Type.GET_BUYERS_REGIONS_BUYERS_COUNT_FAILURE:
      return {
        ...state,
        buyersRegionsBuyersCountIsFetching: false,
        buyersRegionsBuyersCountErrorMessage: action.errorMessage,
      }

    case Type.GET_BUYERS_REGIONS_BUYERS_COUNT_CLEAR:
      return {
        ...state,
        buyersRegionsBuyersCount: {},
      }

    default:
      return {
        ...state,
      }
  }
}

export default buyersRegionsBuyersCountState
