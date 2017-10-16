const path = require("path");
var appRoot = path.join(__dirname, "..");
console.log(appRoot);
require("electron-compile").init(appRoot, require.resolve("./app.js"));