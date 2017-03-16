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
    properties: ['openDirectory']
  })
}

exports.selectDirectory = function() {
  // dialog.showOpenDialog as before
}


const {ipcMain} = require('electron')
ipcMain.on('selectDirectory', (evt, arg) => {
  console.log('evt: ', evt)
  console.log('arg: ', arg)
  dialog.showOpenDialog(mainWindow, {
    properties: ['openDirectory']
  })
  event.returnValue = true
})


ipcMain.on('asynchronous-message', (event, arg) => {
  console.log(arg)  // prints "ping"
  event.sender.send('asynchronous-reply', 'pong')
})

ipcMain.on('synchronous-message', (event, arg) => {
  console.log(arg)  // prints "ping"
  event.returnValue = 'pong'
})
