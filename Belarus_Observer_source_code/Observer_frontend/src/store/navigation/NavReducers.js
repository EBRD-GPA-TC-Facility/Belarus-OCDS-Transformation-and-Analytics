import * as NAV from './NavConstants'


const initialNavState = {
  location: null,
  current: null,
  selectedCardData: [],
}

export default (state = initialNavState, action) => {
  switch (action.type) {
    case NAV.CHANGE_LOCATION:
      return {
        ...state,
        location: action.location,
        current: action.current,
      }
    case NAV.SET_CURRENT_LOCATION: {
      return {
        ...state,
        current: action.current,
      }
    }

    case NAV.SET_CARD_DATA:
      return {
        ...state,
        selectedCardData: action.selectedCardData
      }

    default:
      return state
  }
}
