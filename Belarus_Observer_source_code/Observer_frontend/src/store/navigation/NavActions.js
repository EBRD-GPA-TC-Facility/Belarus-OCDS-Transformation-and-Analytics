import * as NAV from './NavConstants'


export const changeLocation = (location, current) => {
  return dispatch => dispatch({type: NAV.CHANGE_LOCATION, location, current})
}

export const setCurrentLocation = current => {
  return dispatch => dispatch({type: NAV.SET_CURRENT_LOCATION, current})
}
