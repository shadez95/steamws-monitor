import mainCall from '../renderer/main/components/main'
import {Container} from 'flux/utils'
import MainStore from '../store/MainStore'
import SettingsStore from '../store/SettingsStore'

function getStores() {
  return [
    MainStore,
    SettingsStore
  ]
}

function getState() {
  return {
    MainStore: MainStore.getState(),
    SettingsStore: SettingsStore.getState()
  }
}

module.exports = Container.createFunctional(mainCall, getStores, getState)