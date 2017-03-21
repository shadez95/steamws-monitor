const electron = require('electron')
const dialog = electron.dialog
const nativeImage = electron.nativeImage
import {app, BrowserWindow, Menu, Tray} from 'electron';
import {enableLiveReload} from 'electron-compile';

// need to setup config information
const Config = require('electron-config')
// Settings config
const cSettings = new Config({name: 'settings'})
if (cSettings.get('steamAPIkey') === undefined) {
  cSettings.set('steamAPIkey', '')
}
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
let settingsWindow
let tray = null

const image_icon = nativeImage.createFromPath(`file://${__dirname}/assets/images/favicon-32x32.png`)
const image_icon_path = `${__dirname}/assets/images/logos/favicon-32x32.png`

const openSettingsWindow = () => {
  settingsWindow = new BrowserWindow({
    width: 500,
    height: 500,
    backgroundColor: '#1b2028',
    autoHideMenuBar: true,
    icon: image_icon_path
    // devTools: false // Will uncomment for production
  })
  settingsWindow.loadURL(`file://${__dirname}/renderer/settings/index.html`)
  settingsWindow.webContents.openDevTools()
  settingsWindow.mainLib = lib
}

const openSteamWSWindow = () => {
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
        {role: 'close'}
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
}

app.on('window-all-closed', () => {
  // Overriding so it can run in the background
  // To shutdown application right-click on tray icon
  // and click quit
});

app.on('ready', () => {
  tray = new Tray(`${__dirname}/assets/images/logos/favicon-32x32.png`)
  const contextMenu = Menu.buildFromTemplate([
    {label: 'Open SteamWS Monitor', click: () => {openSteamWSWindow()}},
    {label: 'Settings', click: function() {openSettingsWindow()}},
    {label: 'Quit', click: () => {app.quit()}}
  ])
  tray.setToolTip('Steam Workshop Monitor')
  tray.setContextMenu(contextMenu)

  // Below will be removed after done testing in windows
  tray.displayBalloon({
    icon: `${__dirname}/assets/images/logos/favicon-32x32.png`,
    title: 'Test Title Balloon',
    content: 'This is content in balloon. It works!!!'
  })

  // const startMonitoring = require('./steamWSmonitor.js')
  // startMonitoring()
});

enableLiveReload({strategy: 'react-hmr'});

console.log("Config Path: ", app.getPath('userData'))
