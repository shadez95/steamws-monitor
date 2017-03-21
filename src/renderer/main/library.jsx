import electron from 'electron'
import * as SteamApi from 'steam-api'

export class AppConfig {
  constructor() {
    const remote = electron.remote
    this.remote = remote
    this.currentWindow = remote.getCurrentWindow()
    this.mainLib = this.currentWindow.mainLib
    this.workshopStore = this.mainLib
  }
  getList() {
    let list = this.mainLib.workshopStore.get('list')
    return list
  }
  updateList() {
    let list = this.getList()
  }
  addGame(appid_input) {
    const SteamApi = require('steam-api')
    var app = new SteamApi.App('')
    app.appDetails(appid_input).done(function(result) {
      main.List
    })
    return {appID: appid_input, name: result.name, workshopItems: []}
  }
}
