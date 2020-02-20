import * as Type from './ProcedureTypesContractsAmountConstants'


const initialState = {
  procedureTypesContractsAmount: {},
  procedureTypesContractsAmountIsFetching: false,
  procedureTypesContractsAmountErrorMessage: null,
}

const procedureTypesContractsAmountState = (state = initialState, action) => {
  switch (action.type) {
    case Type.GET_PROCEDURE_TYPES_CONTRACTS_AMOUNT_STATE_REQUEST:
      return {
        ...state,
        procedureTypesContractsAmountIsFetching: true,
        procedureTypesContractsAmountErrorMessage: null,
      }

    case Type.GET_PROCEDURE_TYPES_CONTRACTS_AMOUNT_STATE_SUCCESS:
      return {
        ...state,
        procedureTypesContractsAmount: action.payload,
        procedureTypesContractsAmountIsFetching: false,
      }

    case Type.GET_PROCEDURE_TYPES_CONTRACTS_AMOUNT_STATE_FAILURE:
      return {
        ...state,
        procedureTypesContractsAmountIsFetching: false,
        procedureTypesContractsAmountErrorMessage: action.errorMessage,
      }

    case Type.GET_PROCEDURE_TYPES_CONTRACTS_AMOUNT_STATE_CLEAR:
      return {
        ...state,
        procedureTypesContractsAmount: {},
      }

    default:
      return {
        ...state,
      }
  }
}

export default procedureTypesContractsAmountState
