const electron = require('electron')
const dialog = electron.dialog
import {app, BrowserWindow, Menu} from 'electron';
import {enableLiveReload} from 'electron-compile';

// need to setup config information
const Config = require('electron-config')
// Settings config
const cSettings = new Config({name: 'settings'})
global.settings = {configSettings: cSettings}

// Workshop config
const workshopStore = new Config({name: 'workshopStore'})
global.wsStore = {steamwsStore: workshopStore}

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

console.log("Config Path: ", app.getPath('userData'))
