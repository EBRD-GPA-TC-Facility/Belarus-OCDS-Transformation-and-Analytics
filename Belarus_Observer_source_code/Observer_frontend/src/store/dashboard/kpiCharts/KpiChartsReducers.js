import * as Types from './KpiChartsConstants'


const kpiChartState = {
  perProcedureLotsCount: {},
  perProcedureLotsCountIsFetching: false,
  perProcedureLotsCountErrorMessage: null,

  perProcedureOkrbCount: {},
  perProcedureOkrbCountIsFetching: false,
  perProcedureOkrbCountErrorMessage: null,

  perSupplierContractsCount: {},
  perSupplierContractsCountIsFetching: false,
  perSupplierContractsCountErrorMessage: null,
}

const kpiChart = (state = kpiChartState, action) => {
  switch (action.type) {
    case Types.PER_PROCEDURE_LOTS_COUNT_REQUEST:
      return {
        ...state,
        perProcedureLotsCountIsFetching: true,
        perProcedureLotsCountErrorMessage: null,
      }
    case Types.PER_PROCEDURE_LOTS_COUNT_SUCCESS:
      return {
        ...state,
        perProcedureLotsCountIsFetching: false,
        perProcedureLotsCount: action.payload,
      }
    case Types.PER_PROCEDURE_LOTS_COUNT_FAILURE:
      return {
        ...state,
        perProcedureLotsCountErrorMessage: action.errorMessage,
      }
    case Types.PER_PROCEDURE_LOTS_COUNT_CLEAR:
      return {
        ...state,
        perProcedureLotsCount: {},
      }

    case Types.PER_PROCEDURE_OKRB_COUNT_REQUEST:
      return {
        ...state,
        perProcedureOkrbCountIsFetching: true,
        perProcedureOkrbCountErrorMessage: null,
      }
    case Types.PER_PROCEDURE_OKRB_COUNT_SUCCESS:
      return {
        ...state,
        perProcedureOkrbCountIsFetching: false,
        perProcedureOkrbCount: action.payload,
      }
    case Types.PER_PROCEDURE_OKRB_COUNT_FAILURE:
      return {
        ...state,
        perProcedureOkrbCountErrorMessage: action.errorMessage,
      }
    case Types.PER_PROCEDURE_OKRB_COUNT_CLEAR:
      return {
        ...state,
        perProcedureOkrbCount: {},
      }

    case Types.PER_SUPPLIER_CONTRACTS_COUNT_REQUEST:
      return {
        ...state,
        perSupplierContractsCountIsFetching: true,
        perSupplierContractsCountErrorMessage: null,
      }
    case Types.PER_SUPPLIER_CONTRACTS_COUNT_SUCCESS:
      return {
        ...state,
        perSupplierContractsCountIsFetching: false,
        perSupplierContractsCount: action.payload,
      }
    case Types.PER_SUPPLIER_CONTRACTS_COUNT_FAILURE:
      return {
        ...state,
        perSupplierContractsCountErrorMessage: action.errorMessage,
      }
    case Types.PER_SUPPLIER_CONTRACTS_COUNT_CLEAR:
      return {
        ...state,
        perSupplierContractsCount: {},
      }
    default:
      return {
        ...state,
      }
  }
}

export default kpiChart
