const electron = require('electron');
import {app, BrowserWindow, Menu, Tray} from 'electron';
import {enableLiveReload} from 'electron-compile';

// ----------------------------------------------

let mainWindow = null
let settingsWindow
let tray = null

const image_icon_path = `${__dirname}/static/images/logos/favicon-32x32.png`

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
        {type: 'separator'},
        {role: 'resetzoom'},
        {role: 'zoomin'},
        {role: 'zoomout'},
        {type: 'separator'},
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
}

app.on('window-all-closed', () => {
  // Overriding so it can run in the background
  // To shutdown application right-click on tray icon
  // and click quit
});

app.on('ready', () => {
  // Trays work in Windows and Ubuntu based OS's
  // maybe when workshop items are updating
  tray = new Tray(image_icon_path)
  const contextMenu = Menu.buildFromTemplate([
    {label: 'Open SteamWS Monitor', click: () => {openSteamWSWindow()}},
    {label: 'Settings', click: () => {openSettingsWindow()}},
    {type: 'separator'},
    {label: 'Quit', click: () => {app.quit()}}
  ])
  tray.setToolTip('Steam Workshop Monitor')
  tray.setContextMenu(contextMenu)
  // const startMonitoring = require('./steamWSmonitor.js')
  // startMonitoring()
  enableLiveReload({strategy: 'react-hmr'});
});

console.log("Config Path: ", app.getPath('userData'))
