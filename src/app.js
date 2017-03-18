const {electron, net} = require('electron')
const dialog = electron.dialog
import {app, BrowserWindow, Menu} from 'electron';
import {enableLiveReload} from 'electron-compile';

// need to setup config information
const Config = require('electron-config')
// Settings config
const cSettings = new Config({name: 'settings'})
// Workshop config
const workshopStore = new Config({name: 'workshopStore'})
// GET request function
const getRequest = (url) => {
  var request = net.request(url)
  return request
}
const getAppData = (appID) => {
  url = "http://store.steampowered.com/api/appdetails?appids=" + appID
  var req = http.request(url, (res) => {
    console.log(`STATUS: ${res.statusCode}`);
    console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
    res.setEncoding('utf8');
    res.on('data', (chunk) => {
      console.log(`BODY: ${chunk}`);
    });
    res.on('end', () => {
      console.log('No more data in response.')
    })
  })
  req.on('error', (e) => {
    console.log(`problem with request: ${e.message}`);
  });
  // write data to request body
  req.write(postData);
  req.end();
  return true
}
// POST request function
const postRequest = (host_name, path_input, post_data, callback) => {
  // host_name = host url e.g. 'www.google.com'
  // path_input = path to send post request e.g. '/path/path1'
  // post_data = postdata in JSON format e.g. {'msg' : 'Hello World!'}
  const http = require('http')
  const querystring = require('querystring')

  var postData = querystring.stringify(post_data);
  var options = {
    hostname: host_name,
    path: path_input,
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': Buffer.byteLength(postData)
    }
  };

  var req = http.request(options, callback)
  req.on('error', (e) => {
    alert(`problem with request: ${e.message}`);
  });
  req.write(postData);
  req.end();
  return req
}

// Global var that stores global wide
// objects, functions, or variables
global.lib = {
  configSettings: cSettings,
  steamwsStore: workshopStore
}

let mainWindow = null;

const openSettingsWindow = () => {
  var settingsWindow = new BrowserWindow({
    width: 400,
    height: 400,
    backgroundColor: '#1b2028',
    autoHideMenuBar: true
    // devTools: false // Will uncomment for production
  })
  settingsWindow.loadURL(`file://${__dirname}/renderer/settings/index.html`);
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
  mainWindow.loadURL(`file://${__dirname}/renderer/main/index.html`);
});

enableLiveReload({strategy: 'react-hmr'});

console.log("Config Path: ", app.getPath('userData'))
