import { CHANGE_STEAMCMD_LOC, REQUEST_CHANGE } from "../actions/settingsActions";
import { getConfig, changeConfig } from "../configManipulators";

const initialState = {
  steamCMDLoc: getConfig("settings.steamCMDLoc", ""),
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
  default:
    return state;
  }
}