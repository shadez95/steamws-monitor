import { combineReducers } from "redux"
import { routerReducer as routing } from 'react-router-redux'

import settings from "./settingsReducer"
import steamGames from "./steamGamesReducer"

export default combineReducers({
  settings,
  steamGames,
  routing
})