import Immutable from 'immutable'
import {ReduceStore} from 'flux/utils'
import MainActionTypes from './MainActionTypes'
import Dispatcher from './Dispatcher'

class MainStore extends ReduceStore {
  constructor() {
    super(Dispatcher)
  }

  getInitialState() {
    return Immutable.OrderedMap()
  }

  reduce(state, action) {
    switch (action.type) {
      case MainActionTypes.ADD_GAME:
        // Do nothing for now, we will add logic here soon!
      return state

      case MainActionTypes.ADD_WORKSHOP_ITEM:
        // Do nothing for now, we will add logic here soon!
      return state

      default:
      return state
    }
  }
}

export default new MainStore()