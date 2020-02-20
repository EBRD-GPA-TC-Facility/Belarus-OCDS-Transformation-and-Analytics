import * as Type from './KpiContractsAmountAvgPerSupplierConstants'


const initialState = {
  kpiContractsAmountAvgPerSupplier: {},
  kpiContractsAmountAvgPerSupplierIsFetching: false,
  kpiContractsAmountAvgPerSupplierErrorMessage: null,
}

const kpiContractsAmountAvgPerSupplierState = (state = initialState, action) => {
  switch (action.type) {
    case Type.KPI_CONTRACTS_AMOUNT_AVG_PER_SUPPLIER_REQUEST:
      return {
        ...state,
        kpiContractsAmountAvgPerSupplierIsFetching: true,
        kpiContractsAmountAvgPerSupplierErrorMessage: null,
      }

    case Type.KPI_CONTRACTS_AMOUNT_AVG_PER_SUPPLIER_SUCCESS:
      return {
        ...state,
        kpiContractsAmountAvgPerSupplier: action.payload,
        kpiContractsAmountAvgPerSupplierIsFetching: false,
      }

    case Type.KPI_CONTRACTS_AMOUNT_AVG_PER_SUPPLIER_FAILURE:
      return {
        ...state,
        kpiContractsAmountAvgPerSupplierIsFetching: false,
        kpiContractsAmountAvgPerSupplierErrorMessage: action.errorMessage,
      }

    case Type.KPI_CONTRACTS_AMOUNT_AVG_PER_SUPPLIER_CLEAR:
      return {
        ...state,
        kpiContractsAmountAvgPerSupplier: {},
      }

    default:
      return {
        ...state,
      }
  }
}

export default kpiContractsAmountAvgPerSupplierState
