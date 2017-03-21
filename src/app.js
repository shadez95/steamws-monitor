const electron = require('electron')
const dialog = electron.dialog
const nativeImage = electron.nativeImage
import {app, BrowserWindow, Menu, Tray} from 'electron';
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

let mainWindow = null
let tray = null
const image_icon = nativeImage.createFromPath(`file://${__dirname}/assets/images/favicon-32x32.png`)
const image_icon_path = `${__dirname}/assets/images/logos/favicon-32x32.png`

const openSettingsWindow = () => {
  var settingsWindow = new BrowserWindow({
    width: 400,
    height: 400,
    backgroundColor: '#1b2028',
    autoHideMenuBar: true,
    icon: image_icon_path
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
    icon: image_icon_path
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

  tray = new Tray(`${__dirname}/assets/images/logos/favicon-32x32.png`)
  const contextMenu = Menu.buildFromTemplate([
    {label: 'Item1', type: 'radio'},
    {label: 'Item2', type: 'radio'},
    {label: 'Item3', type: 'radio', checked: true},
    {label: 'Item4', type: 'radio'}
  ])
  tray.setToolTip('This is my application.')
  tray.setContextMenu(contextMenu)

  // main window library
  mainWindow.mainLib = lib
});

enableLiveReload({strategy: 'react-hmr'});

console.log("Config Path: ", app.getPath('userData'))
