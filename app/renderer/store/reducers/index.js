import { combineReducers } from "redux";
// import { routerReducer as routing } from "react-router-redux";

import settings from "./settingsReducer";
import navData from "./navReducer";
import paneContent from "./paneContentReducer";
import loading from "./loadingReducer";
import gameData from "./gameReducer";

export default combineReducers({
  navData,
  paneContent,
  settings,
  loading,
  gameData
  // routing
});