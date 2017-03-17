const electron = require('electron')
const dialog = electron.dialog
import {app, BrowserWindow} from 'electron';
import {enableLiveReload} from 'electron-compile';

let mainWindow = null;

app.on('window-all-closed', () => {
  app.quit();
});

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    width: 700,
    height: 760,
    backgroundColor: '#1b2028'
  });

  mainWindow.loadURL(`file://${__dirname}/renderer/index.html`);
});

enableLiveReload({strategy: 'react-hmr'});

console.log(app.getPath('userData'))

function selectDirectory() {
  dialog.showOpenDialog(mainWindow, {
    properties: ['openFile']
  })
}

global.fncSelectDirectory = {fnc: selectDirectory}

// need to setup config information
const Config = require('electron-config')
// Settings config
const cSettings = new Config({name: 'settings'})
global.settings = {configSettings: cSettings}

// Workshop config
const workshopStore = new Config({name: 'workshopStore'})
global.wsStore = {steamwsStore: workshopStore}
