import Immutable from 'immutable'
import {ReduceStore} from 'flux/utils'
import SettingsActionTypes from './SettingsActionTypes'
import Dispatcher from './Dispatcher'

class SettingsStore extends ReduceStore {
  constructor() {
    super(Dispatcher)
  }

  getInitialState() {
    return Immutable.OrderedMap()
  }

  reduce(state, action) {
    switch (action.type) {
      case SettingsActionTypes.CHANGE_INTERVAL:
        // Do nothing for now, we will add logic here soon!
      return state

      case SettingsActionTypes.ADD_STEAMCMD_LOCATION:
        // Do nothing for now, we will add logic here soon!
      return state

      case SettingsActionTypes.CHANGE_STEAMCMD_LOCATION:
        // Do nothing for now, we will add logic here soon!
      return state

      default:
      return state
    }
  }
}

export default new SettingsStore()