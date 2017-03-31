import ActionTypes from './ActionTypes'
import Dispatcher from './Dispatcher'

const Actions = {
  addGame(text) {
    Dispatcher.dispatch({
      type: ActionTypes.ADD_GAME,
      text,
    })
  },
}

export default Actions