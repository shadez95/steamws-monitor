const electron = require('electron')
const dialog = electron.dialog
import {app, BrowserWindow, Menu} from 'electron';
import {enableLiveReload} from 'electron-compile';

// need to setup config information
const Config = require('electron-config')
// Settings config
const cSettings = new Config({name: 'settings'})
// Workshop config
const steamwsStore = new Config({name: 'workshopStore'})
let array = []
if (steamwsStore.get('list') === undefined) {
  steamwsStore.set('list', array)
}

const lib = {
  configSettings: cSettings,
  workshopStore: steamwsStore,
}

// ----------------------------------------------

let mainWindow = null;

const openSettingsWindow = () => {
  var settingsWindow = new BrowserWindow({
    width: 400,
    height: 400,
    backgroundColor: '#1b2028',
    autoHideMenuBar: true
    // devTools: false // Will uncomment for production
  })
  settingsWindow.loadURL(`file://${__dirname}/renderer/settings/index.html`)
  settingsWindow.webContents.openDevTools()
  settingsWindow.mainLib = lib
}

app.on('window-all-closed', () => {
  app.quit();
});

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    width: 700,
    height: 760,
    backgroundColor: '#1b2028',
    autoHideMenuBar: false,
    // devTools: false // Will uncomment for production
  });

  // Create Menu
  const template = [
    {
      label: 'File',
      submenu: [
        {role: 'quit'}
      ]
    },
    {
      label: 'Edit',
      submenu: [
        {role: 'undo'},
        {role: 'redo'},
        {type: 'separator'},
        {role: 'cut'},
        {role: 'copy'},
        {role: 'paste'},
        {role: 'delete'},
        {role: 'selectall'}
      ]
    },
    {
      label: 'View',
      submenu: [
        {role: 'reload'},
        {role: 'forcereload'},
        // {role: 'toggledevtools'},
        {role: 'separator'},
        {role: 'resetzoom'},
        {role: 'zoomin'},
        {role: 'zoomout'},
        {role: 'separator'},
        {role: 'togglefullscreen'}
      ]
    },
    {
      role: 'window',
      submenu: [
        {role: 'minimize'},
        {role: 'close'},
      ]
    },
    {
      role: 'help',
      submenu: [
        {
          label: 'GitHub',
          click() {require('electron').shell.openExternal('https://github.com/dixon13/steamws-monitor')}
        }
      ]
    },
    {
      label: 'Preferences',
      submenu: [
        {
          label: 'Settings',
          click() {openSettingsWindow()}
        }
      ]
    }
  ]

  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)
  mainWindow.webContents.openDevTools()
  mainWindow.loadURL(`file://${__dirname}/renderer/main/index.html`)

  // main window library
  mainWindow.mainLib = lib
});

enableLiveReload({strategy: 'react-hmr'});

console.log("Config Path: ", app.getPath('userData'))
