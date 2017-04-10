import { combineReducers } from "redux";
// import { routerReducer as routing } from "react-router-redux";

import settings from "./settingsReducer";
import steamGames from "./steamGamesReducer";
import navData from "./navReducer";

export default combineReducers({
  navData,
  settings,
  steamGames
  // routing
});