import {
  CHANGE_STEAMCMD_LOC, CHANGE_STEAM_USERNAME,
  CHANGE_STEAM_PASSWORD, REQUEST_CHANGE
} from "../actions/settingsActions";
import { getConfig, changeConfig } from "../configManipulators";

const initialState = {
  steamCMDLoc: getConfig("settings.steamCMDLoc", ""),
  steamUsername: getConfig("settings.steamUsername", ""),
  steamPassword: getConfig("settings.steamPassword", ""),
  fetching: false,
  error: null
};

export default function settings(state=initialState, action) {
  switch (action.type) {
  case REQUEST_CHANGE:
    return {...state, fetching: true};
  case CHANGE_STEAMCMD_LOC:
    changeConfig("settings.steamCMDLoc", action.payload);
    return {
      ...state,
      steamCMDLoc: action.payload,
      fetching: false
    };
  case CHANGE_STEAM_USERNAME:
    changeConfig("settings.steamUsername", action.payload);
    return {
      ...state,
      steamUsername: action.payload
    };
  case CHANGE_STEAM_PASSWORD:
    changeConfig("settings.steamPassword", action.payload);
    return {
      ...state,
      steamPassword: action.payload
    };
  default:
    return state;
  }
}