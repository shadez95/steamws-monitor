import { combineReducers } from "redux";
// import { routerReducer as routing } from "react-router-redux";

import settings from "./settingsReducer";
import steamGames from "./steamGamesReducer";
import navs from "./navReducer";

export default combineReducers({
  navs,
  settings,
  steamGames
  // routing
});