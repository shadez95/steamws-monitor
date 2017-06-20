import {app, BrowserWindow, Menu, Tray} from "electron";
import {enableLiveReload} from "electron-compile";
import requestFunc from "./mainLoop";
import appRoot from "app-root-path";

if(require("electron-squirrel-startup")) app.quit();
console.log(`Electron Version: ${process.versions.electron}\n`);
// this should be placed at top of main.js to handle setup events quickly
if (handleSquirrelEvent()) {
  // squirrel event handled and app will exit in 1000ms, so don't do anything else
  app.quit();
}

function handleSquirrelEvent() {
  if (process.argv.length === 1) {
    return false;
  }

  const ChildProcess = require("child_process");
  const path = require("path");

  const appFolder = path.resolve(process.execPath, "..");
  const rootFolder = path.resolve(appFolder, "..");
  const updateDotExe = path.resolve(path.join(rootFolder, "Update.exe"));
  const exeName = path.basename(process.execPath);

  const spawn = function(command, args) {
    let spawnedProcess, error;

    try {
      spawnedProcess = ChildProcess.spawn(command, args, {detached: true});
    } catch (error) { console.log(error); }

    return spawnedProcess;
  };

  const spawnUpdate = function(args) {
    return spawn(updateDotExe, args);
  };

  const squirrelEvent = process.argv[1];
  switch (squirrelEvent) {
    case "--squirrel-install":
      var args = ["--createShortcut", exeName, "--shortcut-locations", "StartMenu"];
      spawnUpdate(args);

      // Always quit when done
      app.quit();
      return true;
    case "--squirrel-updated":
      // Optionally do things such as:
      // - Add your .exe to the PATH
      // - Write to the registry for things like file associations and
      //   explorer context menus

      // Install desktop and start menu shortcuts
      var spawnedProcessUpdate = spawnUpdate(["--createShortcut", exeName, "--shortcut-locations", "StartMenu"]);

      spawnedProcessUpdate.stdout.on("data", (data) => {
        let stringData = data.toString();
        console.log(`${stringData}`);
      });

      spawnedProcessUpdate.stderr.on("data", (data) => {
        let stringData = data.toString();
        console.log(`${stringData}`);
      });

      setTimeout(app.quit, 1000);
      return true;

    case "--squirrel-uninstall":
      // Undo anything you did in the --squirrel-install and
      // --squirrel-updated handlers

      // Remove desktop and start menu shortcuts
      spawnUpdate(["--removeShortcut", exeName, "--shortcut-locations", "StartMenu"]);

      setTimeout(app.quit, 1000);
      return true;

    case "--squirrel-obsolete":
      // This is called on the outgoing version of your app before
      // we update to the new version - it's the opposite of
      // --squirrel-updated

      app.quit();
      return true;
  }
}

const notify = require("electron-main-notification");

// ----------------------------------------------

// const isProd = process.execPath.search("electron-prebuilt-compile") === -1;
// if (isProd !== -1) {
//   process.env.NODE_ENV = "production";
// }

const installExtensions = () => {
  const { default: installExtension, REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS } = require("electron-devtools-installer");

  const extensions = [
    REACT_DEVELOPER_TOOLS,
    REDUX_DEVTOOLS
  ];
  const forceDownload = process.env.UPGRADE_EXTENSIONS !== undefined ? process.env.UPGRADE_EXTENSIONS : false;
  console.log("UPGRADE_EXTENSIONS: ", process.env.UPGRADE_EXTENSIONS);

  extensions.map(((ext) => {
    installExtension(ext, forceDownload)
      .then((name) => console.log(`Added Extension:  ${name}`))
      .catch((err) => console.log("An error occurred: ", err));
  }));

  // installExtension(REACT_DEVELOPER_TOOLS, )
  //   .then((name) => console.log(`Added Extension:  ${name}`))
  //   .catch((err) => console.log('An error occurred: ', err))
  // installExtension(REDUX_DEVTOOLS)
  //   .then((name) => console.log(`Added Extension:  ${name}`))
  //   .catch((err) => console.log('An error occurred: ', err))

  // TODO: Use async interation statement.
  //       Waiting on https://github.com/tc39/proposal-async-iteration
  //       Promises will fail silently, which isn't what we want in development
  // return Promise
  //   .all(extensions.map(name => installer.default(installer[name], forceDownload)))
  //   .catch(console.log)
};

let mainWindow = null;
// let settingsWindow;
let tray = null;
let requestLoop = null;

const image_icon_path = `${__dirname}/static/images/logos/favicon-32x32.png`;

// const openSettingsWindow = () => {
//   settingsWindow = new BrowserWindo
// mainWindow.webContents.openDevTools();({
//     width: 500,
//     height: 500,
//     backgroundColor: '#252526',
//     autoHideMenuBar: true,
//     icon: image_icon_path
//     // devTools: false // Will uncomment for production
//   })
//   settingsWindow.loadURL(`file://${__dirname}/renderer/settings/index.html`)
//   settingsWindow.webContents.openDevTools()
// }

const openSteamWSWindow = () => {
  mainWindow = new BrowserWindow({
    title: "Steam Workshop Monitor",
    width: 700,
    height: 760,
    backgroundColor: "#252526",
    autoHideMenuBar: true,
    // frame: false,
    icon: image_icon_path
    // devTools: false // Will uncomment for production
  });

  // Create Menu
  const template = [
    {
      label: "File",
      submenu: [
        {role: "close"}
      ]
    },
    {
      label: "Edit",
      submenu: [
        {role: "undo"},
        {role: "redo"},
        {type: "separator"},
        {role: "cut"},
        {role: "copy"},
        {role: "paste"},
        {role: "delete"},
        {role: "selectall"}
      ]
    },
    {
      label: "View",
      submenu: [
        {role: "reload"},
        {role: "forcereload"},
        {role: "toggledevtools"},
        {type: "separator"},
        {role: "resetzoom"},
        {role: "zoomin"},
        {role: "zoomout"},
        {type: "separator"},
        {role: "togglefullscreen"}
      ]
    },
    {
      role: "window",
      submenu: [
        {role: "minimize"},
        {role: "close"},
      ]
    },
    {
      role: "help",
      submenu: [
        {
          label: "GitHub",
          click() {require("electron").shell.openExternal("https://github.com/dixon13/steamws-monitor");}
        }
      ]
    }
    // ,
    // {
    //   label: 'Preferences',
    //   submenu: [
    //     {
    //       label: 'Settings',
    //       click() {openSettingsWindow()}
    //     }
    //   ]
    // }
  ];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
  mainWindow.loadURL(`file://${__dirname}/renderer/main/index.html`);
  mainWindow.on("closed", () => {
    mainWindow = null;
  });
  if (process.env.NODE_ENV === "development") {
    mainWindow.webContents.openDevTools();
    installExtensions();
  }
};

app.on("window-all-closed", () => {
  // Overriding so it can run in the background
  // To shutdown application right-click on tray icon
  // and click quit
});

app.on("ready", () => {
  // Trays work in Windows and Ubuntu based OS's
  // maybe when workshop items are updating
  tray = new Tray(image_icon_path);
  const contextMenu = Menu.buildFromTemplate([
    {label: "Open SteamWS Monitor", click: () => {
      if (mainWindow === null) {
        openSteamWSWindow();
      } else {
        // notify("Steam Workshop Monitor", {
        //   body: "Window already opened",
        //   icon: `file://${appRoot}/src/static/images/logos/favicon-96x96.png`
        // });
        mainWindow.focus();
      }
    }},
    // {label: 'Settings', click: () => {openSettingsWindow()}},
    {type: "separator"},
    {label: "Quit", click: () => {
      clearInterval(requestLoop);
      app.quit();
    }}
  ]);
  tray.setToolTip("Steam Workshop Monitor");
  tray.setContextMenu(contextMenu);
  // const startMonitoring = require('./steamWSmonitor.js')
  // startMonitoring()

  // if dev env then enable hot reloading
  if (process.env.NODE_ENV === "development") {
    enableLiveReload({strategy: "react-hmr"});
  }
  
  // if first startup ---------------------------------
  if (process.argv[1] === "--squirrel-firstrun") {
    openSteamWSWindow();
  }

  // Main loop that checks for updates
  // Imported from "./mainLoop.js" relative to directory
  requestFunc();
  requestLoop = setInterval(requestFunc, 300000);
});

if (process.env.NODE_ENV === "development") {
  console.log("Config Path: ", app.getPath("userData"));
}