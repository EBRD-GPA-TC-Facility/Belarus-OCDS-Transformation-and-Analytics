import * as Type from './KpiProceduresCountConstants'


const initialState = {
  kpiProceduresCount: {},
  kpiProceduresCountIsFetching: false,
  kpiProceduresCountErrorMessage: null,
}

const kpiProceduresCountState = (state = initialState, action) => {
  switch (action.type) {
    case Type.GET_KPI_PROCEDURES_COUNT_REQUEST:
      return {
        ...state,
        kpiProceduresCountIsFetching: true,
        kpiProceduresCountErrorMessage: null,
      }

    case Type.GET_KPI_PROCEDURES_COUNT_SUCCESS:
      return {
        ...state,
        kpiProceduresCount: action.payload,
        kpiProceduresCountIsFetching: false,
      }

    case Type.GET_KPI_PROCEDURES_COUNT_FAILURE:
      return {
        ...state,
        kpiProceduresCountIsFetching: false,
        kpiProceduresCountErrorMessage: action.errorMessage,
      }

    case Type.GET_KPI_PROCEDURES_COUNT_CLEAR:
      return {
        ...state,
        kpiProceduresCount: {},
      }

    default:
      return {
        ...state,
      }
  }
}

export default kpiProceduresCountState
