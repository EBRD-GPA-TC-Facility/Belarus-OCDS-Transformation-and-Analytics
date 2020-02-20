import * as Type from './constant'


const initialState = {
  countriesOkrbTopAmount: {},
  countriesOkrbTopAmountIsFetching: false,
  countriesOkrbTopAmountErrorMessage: null,

  productCountriesContractItemsAmount: {},
  productCountriesContractItemsAmountIsFetching: false,
  productCountriesContractItemsAmountErrorMessage: null,
}

const buyBelarusianState = (state = initialState, action) => {
  switch (action.type) {
    case Type.GET_COUNTRIES_OKRB_TOP_AMOUNT_REQUEST:
      return {
        ...state,
        countriesOkrbTopAmountIsFetching: true,
        countriesOkrbTopAmountErrorMessage: null,
      }

    case Type.GET_COUNTRIES_OKRB_TOP_AMOUNT_SUCCESS:
      return {
        ...state,
        countriesOkrbTopAmount: action.payload,
        countriesOkrbTopAmountIsFetching: false,
      }

    case Type.GET_COUNTRIES_OKRB_TOP_AMOUNT_FAILURE:
      return {
        ...state,
        countriesOkrbTopAmountIsFetching: false,
        countriesOkrbTopAmountErrorMessage: action.errorMessage,
      }

    case Type.GET_COUNTRIES_OKRB_TOP_AMOUNT_CLEAR:
      return {
        ...state,
        countriesOkrbTopAmount: {},
      }


    case Type.GET_PRODUCT_COUNTRIES_CONTRACT_ITEMS_AMOUNT_REQUEST:
      return {
        ...state,
        productCountriesContractItemsAmountIsFetching: true,
        productCountriesContractItemsAmountErrorMessage: null,
      }

    case Type.GET_PRODUCT_COUNTRIES_CONTRACT_ITEMS_AMOUNT_SUCCESS:
      return {
        ...state,
        productCountriesContractItemsAmount: action.payload,
        productCountriesContractItemsAmountIsFetching: false,
      }

    case Type.GET_PRODUCT_COUNTRIES_CONTRACT_ITEMS_AMOUNT_FAILURE:
      return {
        ...state,
        productCountriesContractItemsAmountIsFetching: false,
        productCountriesContractItemsAmountErrorMessage: action.errorMessage,
      }

    case Type.GET_PRODUCT_COUNTRIES_CONTRACT_ITEMS_AMOUNT_CLEAR:
      return {
        ...state,
        productCountriesContractItemsAmount: {},
      }


    case Type.GET_BELARUS_PRODUCTS_SHARE_REQUEST:
      return {
        ...state,
        belarusProductsShareIsFetching: true,
        belarusProductsShareErrorMessage: null,
      }

    case Type.GET_BELARUS_PRODUCTS_SHARE_SUCCESS:
      return {
        ...state,
        belarusProductsShare: action.payload,
        belarusProductsShareIsFetching: false,
      }

    case Type.GET_BELARUS_PRODUCTS_SHARE_FAILURE:
      return {
        ...state,
        belarusProductsShareIsFetching: false,
        belarusProductsShareErrorMessage: action.errorMessage,
      }

    case Type.GET_BELARUS_PRODUCTS_SHARE_CLEAR:
      return {
        ...state,
        belarusProductsShare: {},
      }

    default:
      return {
        ...state,
      }
  }
}

export default buyBelarusianState
