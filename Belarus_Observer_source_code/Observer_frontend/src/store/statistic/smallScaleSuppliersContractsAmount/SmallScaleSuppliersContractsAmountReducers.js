import * as Type from './SmallScaleSuppliersContractsAmountConstants'


const initialState = {
  smallScaleSuppliersContractsAmount: {},
  smallScaleSuppliersContractsAmountIsFetching: false,
  smallScaleSuppliersContractsAmountErrorMessage: null,
}

const smallScaleSuppliersContractsAmountState = (state = initialState, action) => {
  switch (action.type) {
    case Type.GET_SMALL_SCALE_SUPPLIERS_CONTRACTS_AMOUNT_STATE_REQUEST:
      return {
        ...state,
        smallScaleSuppliersContractsAmountIsFetching: true,
        smallScaleSuppliersContractsAmountErrorMessage: null,
      }

    case Type.GET_SMALL_SCALE_SUPPLIERS_CONTRACTS_AMOUNT_STATE_SUCCESS:
      return {
        ...state,
        smallScaleSuppliersContractsAmount: action.payload,
        smallScaleSuppliersContractsAmountIsFetching: false,
      }

    case Type.GET_SMALL_SCALE_SUPPLIERS_CONTRACTS_AMOUNT_STATE_FAILURE:
      return {
        ...state,
        smallScaleSuppliersContractsAmountIsFetching: false,
        smallScaleSuppliersContractsAmountErrorMessage: action.errorMessage,
      }

    case Type.GET_SMALL_SCALE_SUPPLIERS_CONTRACTS_AMOUNT_STATE_CLEAR:
      return {
        ...state,
        smallScaleSuppliersContractsAmount: {},
      }

    default:
      return {
        ...state,
      }
  }
}

export default smallScaleSuppliersContractsAmountState
