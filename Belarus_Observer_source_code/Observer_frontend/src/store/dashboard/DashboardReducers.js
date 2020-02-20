import * as Types from './DashboardConstants'


const dashboardInitialState = {
  procuringEntitiesDatesCount: {},
  procuringEntitiesDatesCountIsFetching: false,
  procuringEntitiesDatesCountErrorMessage: null,

  suppliersDatesCount: {},
  suppliersDatesCountIsFetching: false,
  suppliersDatesCountErrorMessage: null,

  lotsCompleteDatesCount: {},
  lotsCompleteDatesCountIsFetching: false,
  lotsCompleteDatesCountErrorMessage: null,

  lotsActiveDatesCount: {},
  lotsActiveDatesCountIsFetching: false,
  lotsActiveDatesCountErrorMessage: null,

  proceduresTop: {},
  proceduresTopIsFetching: false,
  proceduresTopErrorMessage: null,

  proceduresSingleSourceTop: {},
  proceduresSingleSourceTopIsFetching: false,
  proceduresSingleSourceTopErrorMessage: null,

  okbrTop: {},
  okbrTopIsFetching: false,
  okbrTopErrorMessage: null,

  enquiriesCount: {},
  enquiriesCountIsFetching: false,
  enquiriesCountErrorMessage: null,

  kpiContractsCount: {},
  kpiContractsCountIsFetching: false,
  kpiContractsCountErrorMessage: null,

  kpiContractsAmount: {},
  kpiContractsAmountIsFetching: false,
  kpiContractsAmountErrorMessage: null,

  proceduresSuccessfulCount: {},
  proceduresSuccessfulCountIsFetching: false,
  proceduresSuccessfulCountErrorMessage: null,

  proceduresAvgPerHour: {},
  proceduresAvgPerHourIsFetching: false,
  proceduresAvgPerHourErrorMessage: null,

  proceduresCompetetiveEveryN: {},
  proceduresCompetetiveEveryNIsFetching: false,
  proceduresCompetetiveEveryNErrorMessage: null,

  contractsCommonInfo: {},
  contractsCommonInfoIsFetching: false,
  contractsCommonInfoErrorMessage: null,
}

const dashboard = (state = dashboardInitialState, action) => {
  switch (action.type) {
    case Types.PROCURING_ENT_DATES_COUNT_REQUEST:
      return {
        ...state,
        procuringEntitiesDatesCountIsFetching: true,
        procuringEntitiesDatesCountErrorMessage: null,
      }
    case Types.PROCURING_ENT_DATES_COUNT_SUCCESS:
      return {
        ...state,
        procuringEntitiesDatesCountIsFetching: false,
        procuringEntitiesDatesCount: action.payload,
      }
    case Types.PROCURING_ENT_DATES_COUNT_FAILURE:
      return {
        ...state,
        procuringEntitiesDatesCountErrorMessage: action.errorMessage,
      }
    case Types.PROCURING_ENT_DATES_COUNT_CLEAR:
      return {
        ...state,
        procuringEntitiesDatesCount: {},
      }

    case Types.SUPPLIERS_DATES_COUNT_REQUEST:
      return {
        ...state,
        suppliersDatesCountIsFetching: true,
        suppliersDatesCountErrorMessage: null,
      }
    case Types.SUPPLIERS_DATES_COUNT_SUCCESS:
      return {
        ...state,
        suppliersDatesCountIsFetching: false,
        suppliersDatesCount: action.payload,
      }
    case Types.SUPPLIERS_DATES_COUNT_FAILURE:
      return {
        ...state,
        suppliersDatesCountErrorMessage: action.errorMessage,
      }
    case Types.SUPPLIERS_DATES_COUNT_CLEAR:
      return {
        ...state,
        suppliersDatesCount: {},
      }

    case Types.LOTS_COMPLETE_DATES_COUNT_REQUEST:
      return {
        ...state,
        lotsCompleteDatesCountIsFetching: true,
        lotsCompleteDatesCountErrorMessage: null,
      }
    case Types.LOTS_COMPLETE_DATES_COUNT_SUCCESS:
      return {
        ...state,
        lotsCompleteDatesCountIsFetching: false,
        lotsCompleteDatesCount: action.payload,
      }
    case Types.LOTS_COMPLETE_DATES_COUNT_FAILURE:
      return {
        ...state,
        lotsCompleteDatesCountErrorMessage: action.errorMessage,
      }
    case Types.LOTS_COMPLETE_DATES_COUNT_CLEAR:
      return {
        ...state,
        lotsCompleteDatesCount: {},
      }

    case Types.LOTS_ACTIVE_DATES_COUNT_REQUEST:
      return {
        ...state,
        lotsActiveDatesCountIsFetching: true,
        lotsActiveDatesCountErrorMessage: null,
      }
    case Types.LOTS_ACTIVE_DATES_COUNT_SUCCESS:
      return {
        ...state,
        lotsActiveDatesCountIsFetching: false,
        lotsActiveDatesCount: action.payload,
      }
    case Types.LOTS_ACTIVE_DATES_COUNT_FAILURE:
      return {
        ...state,
        lotsActiveDatesCountErrorMessage: action.errorMessage,
      }
    case Types.LOTS_ACTIVE_DATES_COUNT_CLEAR:
      return {
        ...state,
        lotsActiveDatesCount: {},
      }

    case Types.PROCEDURES_TOP_REQUEST:
      return {
        ...state,
        proceduresTopIsFetching: true,
        proceduresTopErrorMessage: null,
      }
    case Types.PROCEDURES_TOP_SUCCESS:
      return {
        ...state,
        proceduresTopIsFetching: false,
        proceduresTop: action.payload,
      }
    case Types.PROCEDURES_TOP_FAILURE:
      return {
        ...state,
        proceduresTopErrorMessage: action.errorMessage,
      }
    case Types.PROCEDURES_TOP_CLEAR:
      return {
        ...state,
        proceduresTop: {},
      }

    case Types.PROCEDURES_SINGLE_SOURCE_TOP_REQUEST:
      return {
        ...state,
        proceduresSingleSourceTopIsFetching: true,
        proceduresSingleSourceTopErrorMessage: null,
      }
    case Types.PROCEDURES_SINGLE_SOURCE_TOP_SUCCESS:
      return {
        ...state,
        proceduresSingleSourceTopIsFetching: false,
        proceduresSingleSourceTop: action.payload,
      }
    case Types.PROCEDURES_SINGLE_SOURCE_TOP_FAILURE:
      return {
        ...state,
        proceduresSingleSourceTopErrorMessage: action.errorMessage,
      }
    case Types.PROCEDURES_SINGLE_SOURCE_TOP_CLEAR:
      return {
        ...state,
        proceduresSingleSourceTop: {},
      }

    case Types.OKRB_TOP_REQUEST:
      return {
        ...state,
        okbrTopIsFetching: true,
        okbrTopErrorMessage: null,
      }
    case Types.OKRB_TOP_SUCCESS:
      return {
        ...state,
        okbrTopIsFetching: false,
        okbrTop: action.payload,
      }
    case Types.OKRB_TOP_FAILURE:
      return {
        ...state,
        okbrTopErrorMessage: action.errorMessage,
      }
    case Types.OKRB_TOP_CLEAR:
      return {
        ...state,
        okbrTop: {},
      }

    case Types.ENQUIRIES_COUNT_REQUEST:
      return {
        ...state,
        enquiriesCountIsFetching: true,
        enquiriesCountErrorMessage: null,
      }
    case Types.ENQUIRIES_COUNT_SUCCESS:
      return {
        ...state,
        enquiriesCountIsFetching: false,
        enquiriesCount: action.payload,
      }
    case Types.ENQUIRIES_COUNT_FAILURE:
      return {
        ...state,
        enquiriesCountErrorMessage: action.errorMessage,
      }
    case Types.ENQUIRIES_COUNT_CLEAR:
      return {
        ...state,
        enquiriesCount: {},
      }

    case Types.KPI_CONTRACTS_COUNT_REQUEST:
      return {
        ...state,
        kpiContractsCountIsFetching: true,
        kpiContractsCountErrorMessage: null,
      }
    case Types.KPI_CONTRACTS_COUNT_SUCCESS:
      return {
        ...state,
        kpiContractsCountIsFetching: false,
        kpiContractsCount: action.payload,
      }
    case Types.KPI_CONTRACTS_COUNT_FAILURE:
      return {
        ...state,
        kpiContractsCountErrorMessage: action.errorMessage,
      }
    case Types.KPI_CONTRACTS_COUNT_CLEAR:
      return {
        ...state,
        kpiContractsCount: {},
      }

    case Types.KPI_CONTRACTS_AMOUNT_REQUEST:
      return {
        ...state,
        kpiContractsAmountIsFetching: true,
        kpiContractsAmountErrorMessage: null,
      }
    case Types.KPI_CONTRACTS_AMOUNT_SUCCESS:
      return {
        ...state,
        kpiContractsAmountIsFetching: false,
        kpiContractsAmount: action.payload,
      }
    case Types.KPI_CONTRACTS_AMOUNT_FAILURE:
      return {
        ...state,
        kpiContractsAmountErrorMessage: action.errorMessage,
      }
    case Types.KPI_CONTRACTS_AMOUNT_CLEAR:
      return {
        ...state,
        kpiContractsAmount: {},
      }

    case Types.PROCEDURES_SUCCESSFUL_COUNT_REQUEST:
      return {
        ...state,
        proceduresSuccessfulCountIsFetching: true,
        proceduresSuccessfulCountErrorMessage: null,
      }
    case Types.PROCEDURES_SUCCESSFUL_COUNT_SUCCESS:
      return {
        ...state,
        proceduresSuccessfulCountIsFetching: false,
        proceduresSuccessfulCount: action.payload,
      }
    case Types.PROCEDURES_SUCCESSFUL_COUNT_FAILURE:
      return {
        ...state,
        proceduresSuccessfulCountErrorMessage: action.errorMessage,
      }
    case Types.PROCEDURES_SUCCESSFUL_COUNT_CLEAR:
      return {
        ...state,
        proceduresSuccessfulCount: {},
      }

    case Types.PROCEDURES_AVG_PER_HOUR_REQUEST:
      return {
        ...state,
        proceduresAvgPerHourIsFetching: true,
        proceduresAvgPerHourErrorMessage: null,
      }
    case Types.PROCEDURES_AVG_PER_HOUR_SUCCESS:
      return {
        ...state,
        proceduresAvgPerHourIsFetching: false,
        proceduresAvgPerHour: action.payload,
      }
    case Types.PROCEDURES_AVG_PER_HOUR_FAILURE:
      return {
        ...state,
        proceduresAvgPerHourErrorMessage: action.errorMessage,
      }
    case Types.PROCEDURES_AVG_PER_HOUR_CLEAR:
      return {
        ...state,
        proceduresAvgPerHour: {},
      }

    case Types.PROCEDURES_COMPETETIVE_EVERY_N_REQUEST:
      return {
        ...state,
        proceduresCompetetiveEveryNIsFetching: true,
        proceduresCompetetiveEveryNErrorMessage: null,
      }
    case Types.PROCEDURES_COMPETETIVE_EVERY_N_SUCCESS:
      return {
        ...state,
        proceduresCompetetiveEveryNIsFetching: false,
        proceduresCompetetiveEveryN: action.payload,
      }
    case Types.PROCEDURES_COMPETETIVE_EVERY_N_FAILURE:
      return {
        ...state,
        proceduresCompetetiveEveryNErrorMessage: action.errorMessage,
      }
    case Types.PROCEDURES_COMPETETIVE_EVERY_N_CLEAR:
      return {
        ...state,
        proceduresCompetetiveEveryN: {},
      }

    case Types.CONTRACTS_COMMON_INFO_REQUEST:
      return {
        ...state,
        contractsCommonInfoIsFetching: true,
        contractsCommonInfoErrorMessage: null,
      }
    case Types.CONTRACTS_COMMON_INFO_SUCCESS:
      return {
        ...state,
        contractsCommonInfoIsFetching: false,
        contractsCommonInfo: action.payload,
      }
    case Types.CONTRACTS_COMMON_INFO_FAILURE:
      return {
        ...state,
        contractsCommonInfoErrorMessage: action.errorMessage,
      }
    case Types.CONTRACTS_COMMON_INFO_CLEAR:
      return {
        ...state,
        contractsCommonInfo: {},
      }

    default:
      return {
        ...state,
      }
  }
}

export default dashboard
