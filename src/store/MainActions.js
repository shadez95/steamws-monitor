import MainActionTypes from './MainActionTypes'
import Dispatcher from './Dispatcher'

const MainActions = {
  addGame(text) {
    Dispatcher.dispatch({
      type: MainActionTypes.ADD_GAME,
      text
    })
  },
  deleteGame(text) {
    Dispatcher.dispact({
      type: MainActionTypes.DELETE_GAME,
      text
    })
  }
}

export default MainActions