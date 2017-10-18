import {app, BrowserWindow, Menu, Tray} from "electron";
import {enableLiveReload} from "electron-compile";
import requestFunc from "./mainLoop";
import { autoUpdater } from "electron-updater";
import log from "electron-log";
import notify from "electron-main-notification";
import appRoot from "app-root-path";
import config from "electron-settings";

//-------------------------------------------------------------------
// Logging
//
// THIS SECTION IS NOT REQUIRED
//
// This logging setup is not required for auto-updates to work,
// but it sure makes debugging easier :)
//-------------------------------------------------------------------
autoUpdater.logger = log;
autoUpdater.logger.transports.file.level = "info";
log.info("App starting...");

// These are variables that are used throughout main process and need to be set here
let mainWindow = null;
// let settingsWindow;
let tray = null;
let requestLoop = null;

//-------------------------------------------------------------------
// Auto updates
//
// For details about these events, see the Wiki:
// https://github.com/electron-userland/electron-builder/wiki/Auto-Update#events
//
// The app doesn't need to listen to any events except `update-downloaded`
//
// Uncomment any of the below events to listen for them.  Also,
// look in the previous section to see them being used.
//-------------------------------------------------------------------
function sendStatusToWindow(text) {
  log.info(text);
  mainWindow.webContents.send("update-messages", text);
}

autoUpdater.on("checking-for-update", () => {
  if (mainWindow === null) {
    notify("Steam Workshop Monitor", {
      body: "Checking for update...",
      icon: `file://${appRoot}/src/static/images/logos/favicon-96x96.png`
    });
  } else {
    sendStatusToWindow("Checking for update...");
  }
});
autoUpdater.on("update-available", (info) => {
  if (mainWindow === null) {
    notify("Steam Workshop Monitor", {
      body: "Update available."
    });
  } else {
    sendStatusToWindow("Update available.");
  }
});
autoUpdater.on("update-not-available", (info) => {
  if (mainWindow === null) {
    notify("Steam Workshop Monitor", {
      body: "Update not available."
    });
  } else {
    sendStatusToWindow("Update not available.");
  }
});
autoUpdater.on("error", (err) => {
  if (mainWindow === null) {
    notify("Steam Workshop Monitor", {
      body: "Error in auto-updater."
    });
  } else {
    sendStatusToWindow("Error in auto-updater.");
  }
});
autoUpdater.on("download-progress", (progressObj) => {
  let log_message = "Download speed: " + progressObj.bytesPerSecond;
  log_message = log_message + " - Downloaded " + progressObj.percent + "%";
  log_message = log_message + " (" + progressObj.transferred + "/" + progressObj.total + ")";
  sendStatusToWindow(log_message);
});
autoUpdater.on("update-downloaded", (info) => {
  // Wait 5 seconds, then quit and install
  // In your application, you don't need to wait 5 seconds.
  // You could call autoUpdater.quitAndInstall(); immediately
  if (mainWindow === null) {
    notify("Steam Workshop Monitor", {
      body: "Update downloaded; will install in 5 seconds"
    });
  } else {
    sendStatusToWindow("Update downloaded; will install in 5 seconds");
  }
  setTimeout(function() {
    autoUpdater.quitAndInstall();  
  }, 5000);
});


log.info(`Electron Version: ${process.versions.electron}\n`);
// this should be placed at top of main.js to handle setup events quickly

if (process.env.NODE_ENV === "development") {
  log.transports.console.level = "silly";
} else {
  log.transports.console.level = "info";
}

// ----------------------------------------------

// Context menu
require("electron-context-menu")({});

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
  log.info("UPGRADE_EXTENSIONS: ", process.env.UPGRADE_EXTENSIONS);

  extensions.map(((ext) => {
    installExtension(ext, forceDownload)
      .then((name) => log.info(`Added Extension:  ${name}`))
      .catch((err) => log.info("An error occurred: ", err));
  }));

  // Run the following from the Console tab of your app's DevTools
  require("devtron").install();
  // You should now see a Devtron tab added to the DevTools

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
    icon: image_icon_path,
    // devTools: false // Will uncomment for production
    show: false
  });

  mainWindow.once("ready-to-show", () => {
    mainWindow.show();
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

var shouldQuit = app.makeSingleInstance(function(commandLine, workingDirectory) {
  // Someone tried to run a second instance, we should focus our window
  if (mainWindow) {
    if (mainWindow.isMinimized()) mainWindow.restore();
    mainWindow.focus();
  }
  return true;
});

if (shouldQuit) {
  app.quit(); 
}

app.on("window-all-closed", () => {
  // Overriding so it can run in the background
  // To shutdown application right-click on tray icon
  // and click quit
});

app.on("ready", () => {
  // Check for updates
  if (process.env.NODE_ENV === "development") {
    // Skip autoupdate check
  } else {
    autoUpdater.checkForUpdates();
  }
  
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
    {label: "Check for updates", click: () => {autoUpdater.checkForUpdates();}},
    {type: "separator"},
    {label: "Quit", click: () => {
      clearInterval(requestLoop);
      app.quit();
    }}
  ]);
  tray.setToolTip("Steam Workshop Monitor");
  tray.setContextMenu(contextMenu);

  // if dev env then enable hot reloading
  if (process.env.NODE_ENV === "development") {
    enableLiveReload({strategy: "react-hmr"});
  }

  // 
  const configAppVersion = config.get("appVersion", "");
  if (configAppVersion !== app.getVersion()) {
    config.set("appVersion", app.getVersion(), {prettify: true});
    openSteamWSWindow();
  }

  // if first startup ---------------------------------
  // if (process.argv[1] === "--squirrel-firstrun") {
  //   openSteamWSWindow();
  // }

  // Main loop that checks for updates
  // Imported from "./mainLoop.js" relative to directory
  requestFunc();
  requestLoop = setInterval(requestFunc, 300000);
});

log.debug("Config Path: ", app.getPath("userData"));