import log from "electron-log";

export default function handleSquirrelEvent(app) {
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
    } catch (error) { log.error(error); }

    return spawnedProcess;
  };

  const spawnUpdate = function(args) {
    return spawn(updateDotExe, args);
  };

  const squirrelEvent = process.argv[1];
  const installArgs = ["--createShortcut", exeName]; // , "--shortcut-locations", "StartMenu"
  const uninstallArgs = ["--removeShortcut", exeName]; // , "--shortcut-locations", "StartMenu"
  switch (squirrelEvent) {
    case "--squirrel-install":
      
      spawnUpdate(installArgs);

      // Always quit when done
      app.quit();
      return true;
    case "--squirrel-updated":
      // Optionally do things such as:
      // - Add your .exe to the PATH
      // - Write to the registry for things like file associations and
      //   explorer context menus

      // Install desktop and start menu shortcuts
      var spawnedProcessUpdate = spawnUpdate(installArgs);

      spawnedProcessUpdate.stdout.on("data", (data) => {
        let stringData = data.toString();
        log.info(`${stringData}`);
      });

      spawnedProcessUpdate.stderr.on("data", (data) => {
        let stringData = data.toString();
        log.info(`${stringData}`);
      });

      setTimeout(app.quit, 1000);
      return true;

    case "--squirrel-uninstall":
      // Undo anything you did in the --squirrel-install and
      // --squirrel-updated handlers

      // Remove desktop and start menu shortcuts
      spawnUpdate(uninstallArgs);

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