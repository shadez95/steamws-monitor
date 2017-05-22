# Steam Workshop Monitor

[![license](https://img.shields.io/badge/license-GPL%20v3-blue.svg)](https://github.com/dixon13/steamws-monitor/blob/master/LICENSE)

An application that monitors steam workshop files for updates

This application is not compatible with MacOS and does not intend on working with MacOS, as most server administrators will be using this on their servers running debian/ubuntu based distributions and Windows 7 and above, and Windows Server 2012 and above

**This project is still in early development and not functional yet**

**All functionality and API's are subject to change at any time at this point in development**

## Requirements
[Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com))

## Contribute
Clone this repository

```
# Install dependencies
npm install
# Install electron-forge globally
npm install -g electron-forge
# Install electron-forge locally
npm install electron-forge
# Start app
npm start
```
We install electron-forge globally and locally so that the binary and cmd files get installed into .bin files in the workspace directory for VS Code's debugger as it will make it easier to share the launch.json file easier.

## Important Development Info
**There is hot reloading**

If you make changes in the main process, you need to restart the app.

Learn more about Electron and its API in the [documentation](http://electron.atom.io/docs/latest).
