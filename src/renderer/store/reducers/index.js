import { combineReducers } from "redux";
// import { routerReducer as routing } from "react-router-redux";

import settings from "./settingsReducer";
import steamGames from "./steamGamesReducer";
import navData from "./navReducer";
import paneContent from "./paneContentReducer";
import loading from "./loadingReducer";

export default combineReducers({
  navData,
  paneContent,
  settings,
  steamGames,
  loading
  // routing
});