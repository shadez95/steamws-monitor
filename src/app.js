const electron = require('electron')
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
    titleBarStyle: 'hidden-inset',
    backgroundColor: '#1b2028'
  });

  mainWindow.loadURL(`file://${__dirname}/renderer/index.html`);
});

enableLiveReload({strategy: 'react-hmr'});
