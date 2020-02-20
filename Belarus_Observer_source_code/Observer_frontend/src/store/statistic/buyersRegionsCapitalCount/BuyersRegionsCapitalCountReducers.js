import * as Type from './BuyersRegionsCapitalCountConstants'


const initialState = {
  buyersRegionsCapitalCount: {},
  buyersRegionsCapitalCountIsFetching: false,
  buyersRegionsCapitalCountErrorMessage: null,
}

const buyersRegionsCapitalCountState = (state = initialState, action) => {
  switch (action.type) {
    case Type.GET_BUYERS_REGIONS_CAPITAL_COUNT_REQUEST:
      return {
        ...state,
        buyersRegionsCapitalCountIsFetching: true,
        buyersRegionsCapitalCountErrorMessage: null,
      }

    case Type.GET_BUYERS_REGIONS_CAPITAL_COUNT_SUCCESS:
      return {
        ...state,
        buyersRegionsCapitalCount: action.payload,
        buyersRegionsCapitalCountIsFetching: false,
      }

    case Type.GET_BUYERS_REGIONS_CAPITAL_COUNT_FAILURE:
      return {
        ...state,
        buyersRegionsCapitalCountIsFetching: false,
        buyersRegionsCapitalCountErrorMessage: action.errorMessage,
      }

    case Type.GET_BUYERS_REGIONS_CAPITAL_COUNT_CLEAR:
      return {
        ...state,
        buyersRegionsCapitalCount: {},
      }

    default:
      return {
        ...state,
      }
  }
}

export default buyersRegionsCapitalCountState
