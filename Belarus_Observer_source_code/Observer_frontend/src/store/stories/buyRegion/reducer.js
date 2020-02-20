import * as Type from './constants'


const initialState = {
  regionsTopProcurement: {},
  regionsTopProcurementIsFetching: false,
  regionsTopProcurementErrorMessage: null,

  regionsCompetitivityProcurement: {},
  regionsCompetitivityProcurementIsFetching: false,
  regionsCompetitivityProcurementErrorMessage: null,

  locality: {},
  localityIsFetching: false,
  localityMessage: null,
}

const buyRegionState = (state = initialState, action) => {
  switch (action.type) {
    case Type.GET_REGIONS_TOP_PROCUREMENT_REQUEST:
      return {
        ...state,
        regionsTopProcurementIsFetching: true,
        regionsTopProcurementErrorMessage: null,
      }

    case Type.GET_REGIONS_TOP_PROCUREMENT_SUCCESS:
      return {
        ...state,
        regionsTopProcurement: action.payload,
        regionsTopProcurementIsFetching: false,
      }

    case Type.GET_REGIONS_TOP_PROCUREMENT_FAILURE:
      return {
        ...state,
        regionsTopProcurementIsFetching: false,
        regionsTopProcurementErrorMessage: action.errorMessage,
      }

    case Type.GET_REGIONS_TOP_PROCUREMENT_CLEAR:
      return {
        ...state,
        regionsTopProcurement: {},
      }


    case Type.GET_REGIONS_COMPETITIVITY_PROCUREMENT_REQUEST:
      return {
        ...state,
        regionsCompetitivityProcurementIsFetching: true,
        regionsCompetitivityProcurementErrorMessage: null,
      }

    case Type.GET_REGIONS_COMPETITIVITY_PROCUREMENT_SUCCESS:
      return {
        ...state,
        regionsCompetitivityProcurement: action.payload,
        regionsCompetitivityProcurementIsFetching: false,
      }

    case Type.GET_REGIONS_COMPETITIVITY_PROCUREMENT_FAILURE:
      return {
        ...state,
        regionsCompetitivityProcurementIsFetching: false,
        regionsCompetitivityProcurementErrorMessage: action.errorMessage,
      }

    case Type.GET_REGIONS_COMPETITIVITY_PROCUREMENT_CLEAR:
      return {
        ...state,
        regionsCompetitivityProcurement: {},
      }

    case Type.LOCALITY_REQUEST:
      return {
        ...state,
        localityIsFetching: true,
        localityErrorMessage: null,
      }
    case Type.LOCALITY_SUCCESS:
      return {
        ...state,
        localityIsFetching: false,
        locality: action.payload,
      }
    case Type.LOCALITY_FAILURE:
      return {
        ...state,
        localityErrorMessage: action.errorMessage,
      }
    case Type.LOCALITY_CLEAR:
      return {
        ...state,
        procuringEntitiesDatesCount: {},
      }
    default:
      return {
        ...state,
      }
  }
}

export default buyRegionState
