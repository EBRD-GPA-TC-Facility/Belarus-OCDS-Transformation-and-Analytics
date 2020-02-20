import * as Type from './constants'


const initialState = {
  averages: {},
  averagesIsFetching: false,

  buyersSuppliers: {},
  buyersSuppliersIsFetching: false,

  classAvgPer: {},
  classAvgPerIsFetching: false,

  contComCount: {},
  contComCountIsFetching: false,

  kpiProcCca: {},
  kpiProcCcaIsFetching: false,

  kpiShareCompLlfs: {},
  kpiShareCompLlfsIsFetching: false,
}

const statisticState = (state = initialState, action) => {
  switch (action.type) {
    case Type.GET_AVERAGES_REQUEST:
      return {
        ...state,
        averagesIsFetching: true,
        averagesErrorMessage: null,
      }
    case Type.GET_AVERAGES_SUCCESS:
      return {
        ...state,
        averages: action.payload,
        averagesIsFetching: false,
      }
    case Type.GET_AVERAGES_FAILURE:
      return {
        ...state,
        averagesIsFetching: false,
        averagesErrorMessage: action.errorMessage,
      }
    case Type.GET_AVERAGES_CLEAR:
      return {
        ...state,
        averages: {},
      }


    case Type.GET_BUYERS_SUPPLIERS_REQUEST:
      return {
        ...state,
        buyersSuppliersIsFetching: true,
        buyersSuppliersErrorMessage: null,
      }
    case Type.GET_BUYERS_SUPPLIERS_SUCCESS:
      return {
        ...state,
        buyersSuppliers: action.payload,
        buyersSuppliersIsFetching: false,
      }
    case Type.GET_BUYERS_SUPPLIERS_FAILURE:
      return {
        ...state,
        buyersSuppliersIsFetching: false,
        buyersSuppliersErrorMessage: action.errorMessage,
      }
    case Type.GET_BUYERS_SUPPLIERS_CLEAR:
      return {
        ...state,
        buyersSuppliers: {},
      }


    case Type.GET_CLASS_AVG_PER_TOP_BY_CONT_AMOUNT_REG_TOP_COUNT_AMOUNT_OKRB_REQUEST:
      return {
        ...state,
        classAvgPerIsFetching: true,
        classAvgPerErrorMessage: null,
      }
    case Type.GET_CLASS_AVG_PER_TOP_BY_CONT_AMOUNT_REG_TOP_COUNT_AMOUNT_OKRB_SUCCESS:
      return {
        ...state,
        classAvgPer: action.payload,
        classAvgPerIsFetching: false,
      }
    case Type.GET_CLASS_AVG_PER_TOP_BY_CONT_AMOUNT_REG_TOP_COUNT_AMOUNT_OKRB_FAILURE:
      return {
        ...state,
        classAvgPerIsFetching: false,
        classAvgPerErrorMessage: action.errorMessage,
      }
    case Type.GET_CLASS_AVG_PER_TOP_BY_CONT_AMOUNT_REG_TOP_COUNT_AMOUNT_OKRB_CLEAR:
      return {
        ...state,
        classAvgPer: {},
      }


    case Type.GET_CONT_COM_COUNT_AMOUNT_DATES_COM_CASSABA_SHARE_REQUEST:
      return {
        ...state,
        contComCountIsFetching: true,
        contComCountErrorMessage: null,
      }
    case Type.GET_CONT_COM_COUNT_AMOUNT_DATES_COM_CASSABA_SHARE_SUCCESS:
      return {
        ...state,
        contComCount: action.payload,
        contComCountIsFetching: false,
      }
    case Type.GET_CONT_COM_COUNT_AMOUNT_DATES_COM_CASSABA_SHARE_FAILURE:
      return {
        ...state,
        contComCountIsFetching: false,
        contComCountErrorMessage: action.errorMessage,
      }
    case Type.GET_CONT_COM_COUNT_AMOUNT_DATES_COM_CASSABA_SHARE_CLEAR:
      return {
        ...state,
        contComCount: {},
      }


    case Type.GET_KPI_PROC_CCA_CONT_C_PER_SBS_COUNT_REQUEST:
      return {
        ...state,
        kpiProcCcaIsFetching: true,
        kpiProcCcaErrorMessage: null,
      }
    case Type.GET_KPI_PROC_CCA_CONT_C_PER_SBS_COUNT_SUCCESS:
      return {
        ...state,
        kpiProcCca: action.payload,
        kpiProcCcaIsFetching: false,
      }
    case Type.GET_KPI_PROC_CCA_CONT_C_PER_SBS_COUNT_FAILURE:
      return {
        ...state,
        kpiProcCcaIsFetching: false,
        kpiProcCcaErrorMessage: action.errorMessage,
      }
    case Type.GET_KPI_PROC_CCA_CONT_C_PER_SBS_COUNT_CLEAR:
      return {
        ...state,
        kpiProcCca: {},
      }


    case Type.GET_KPI_SHARE_COMP_LLFS_SCALE_BUS_GSWC_REQUEST:
      return {
        ...state,
        kpiShareCompLlfsIsFetching: true,
        kpiShareCompLlfsErrorMessage: null,
      }
    case Type.GET_KPI_SHARE_COMP_LLFS_SCALE_BUS_GSWC_SUCCESS:
      return {
        ...state,
        kpiShareCompLlfs: action.payload,
        kpiShareCompLlfsIsFetching: false,
      }
    case Type.GET_KPI_SHARE_COMP_LLFS_SCALE_BUS_GSWC_FAILURE:
      return {
        ...state,
        kpiShareCompLlfsIsFetching: false,
        kpiShareCompLlfsErrorMessage: action.errorMessage,
      }
    case Type.GET_KPI_SHARE_COMP_LLFS_SCALE_BUS_GSWC_CLEAR:
      return {
        ...state,
        kpiShareCompLlfs: {},
      }

    default:
      return {
        ...state,
      }
  }
}

export default statisticState
