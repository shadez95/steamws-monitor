import request from "request";
import querystring from "querystring";
const config = require("electron-settings");

const options = { prettify: true };
const getConfig = (obj, defaultValue="") => {
  // emit loading event here to display loading icon
  const val = config.get(obj, defaultValue, options);
  // emit not loading event here to remove loading icon
  return val;
};  

// calls the steamcmd binary
const callSteamCMD = () => {
  const spawn = require("child_process").spawn;

  var child = spawn("prince", ["-v", "builds/pdf/book.html"]);

  child.stdout.on("data", function(chunk) {
    // output will be here in chunks
    console.log(chunk);
  });
};

const getAllGameIDs = () => {
  const gameData = getConfig("navData");
  let appIDs = [];
  let i = null;
  for (i=0; i < gameData.length; i++) {
    appIDs.push(gameData[i].id.toString());
  }
  return appIDs;
};

// main request function that is called in the loop
const requestFunc = () => {
  let workshopItemIDs = [];

  const appIDs = getAllGameIDs();
  console.log("mainLoop - appIDs: ", appIDs);
  const games = getConfig("games");
  console.log("games: ", games);
  let i = 0;
  while (i < appIDs.length) {
    let wsItems = games.appIDs[i].workshopItems;
    console.log("wsItems: ", wsItems);
    for (let wsItem in wsItems) {
      workshopItemIDs.push(wsItem.publishedFileID);
    }
    i++;
  }

  var form = {
    "itemcount": workshopItemIDs.length,
    "publishedfileids[0]": workshopItemIDs
  };

  const formData = querystring.stringify(form);
  const contentLength = formData.length;

  request({
    url: "https://api.steampowered.com/ISteamRemoteStorage/GetPublishedFileDetails/v1/",
    headers: {
      "Content-Length": contentLength,
      "Content-Type": "application/x-www-form-urlencoded"
    },
    method: "POST",
    body: formData,
    timeout: 10000,
    followRedirect: true,
    maxRedirects: 10
  }, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      console.log("sucess!");
      console.log(body);
    } else {
      console.log("error" + response.statusCode);
    }
  });
};

export default requestFunc;