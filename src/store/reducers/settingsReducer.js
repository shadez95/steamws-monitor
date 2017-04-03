import {
  CHANGE_STEAMCMD_LOCATION, GET_STEAMCMD_LOCATION, getSteamCMDLocation
} from '../actions/settingsActions'

export default function settings(state={
  steamCMDLocation: getSteamCMDLocation(),
  fetching: false,
  fetched: false,
  error: null
}, action) {
  switch (action.type) {
    case GET_STEAMCMD_LOCATION:
      return {...state, steamCMDLocation: action.payload}
    case CHANGE_STEAMCMD_LOCATION:
      return {...state, steamCMDLocation: action.payload}
    default:
      return state;
  }
}