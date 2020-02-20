import * as Type from './topTenSuppliersConstants'


const initialState = {
  topTenSuppliersByContractAmount: {},
  topTenSuppliersByContractAmountIsFetching: false,
  topTenSuppliersByContractAmountErrorMessage: null,

  topTenSuppliersByContractCount: {},
  topTenSuppliersByContractCountIsFetching: false,
  topTenSuppliersByContractCountErrorMessage: null,
}

const topTenSuppliersByContractCountAmountState = (state = initialState, action) => {
  switch (action.type) {
    case Type.GET_TOP_TEN_SUPPLIERS_BY_CONTRACT_AMOUNT_REQUEST:
      return {
        ...state,
        topTenSuppliersByContractAmountIsFetching: true,
        topTenSuppliersByContractAmountErrorMessage: null,
      }

    case Type.GET_TOP_TEN_SUPPLIERS_BY_CONTRACT_AMOUNT_SUCCESS:
      return {
        ...state,
        topTenSuppliersByContractAmount: action.payload,
        topTenSuppliersByContractAmountIsFetching: false,
      }

    case Type.GET_TOP_TEN_SUPPLIERS_BY_CONTRACT_AMOUNT_FAILURE:
      return {
        ...state,
        topTenSuppliersByContractAmountIsFetching: false,
        topTenSuppliersByContractAmountErrorMessage: action.errorMessage,
      }

    case Type.GET_TOP_TEN_SUPPLIERS_BY_CONTRACT_AMOUNT_CLEAR:
      return {
        ...state,
        topTenSuppliersByContractAmount: {},
      }

    case Type.GET_TOP_TEN_SUPPLIERS_BY_CONTRACT_COUNT_REQUEST:
      return {
        ...state,
        topTenSuppliersByContractCountIsFetching: true,
        topTenSuppliersByContractCountErrorMessage: null,
      }

    case Type.GET_TOP_TEN_SUPPLIERS_BY_CONTRACT_COUNT_SUCCESS:
      return {
        ...state,
        topTenSuppliersByContractCount: action.payload,
        topTenSuppliersByContractCountIsFetching: false,
      }

    case Type.GET_TOP_TEN_SUPPLIERS_BY_CONTRACT_COUNT_FAILURE:
      return {
        ...state,
        topTenSuppliersByContractCountIsFetching: false,
        topTenSuppliersByContractCountErrorMessage: action.errorMessage,
      }

    case Type.GET_TOP_TEN_SUPPLIERS_BY_CONTRACT_COUNT_CLEAR:
      return {
        ...state,
        topTenSuppliersByContractCount: {},
      }

    default:
      return {
        ...state,
      }
  }
}

export default topTenSuppliersByContractCountAmountState
