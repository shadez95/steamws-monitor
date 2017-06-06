import request from "request";
import querystring from "querystring";
const config = require("electron-settings");
const notify = require("electron-main-notification");

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
  const appIDs = getAllGameIDs();
  console.log("mainLoop - appIDs: ", appIDs);
  const games = getConfig("games");
  console.log("games: ", games);
  let i = 0;
  while (i < appIDs.length) {
    // Looping through all appIDs
    console.log(appIDs[i]);
    let wsItems = games[appIDs[i]].workshopItems;
    console.log("wsItems: ", wsItems);
    let c = 0;
    for (c; c < wsItems.length; c++) {
      // loop through all workshop ID's for the current appID
      let workshopItemID = wsItems[c].publishedFileID;
      console.log("workshopItemID: ", workshopItemID);
      var form = {
        "itemcount": 1,
        "publishedfileids[0]": workshopItemID
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
          const obj = JSON.parse(body);
          if (obj.response.result === 1) {
            const workshopItemResponse = obj.response.publishedfiledetails[0];
            console.log(workshopItemResponse.title);
            console.log("Last updated Unix: ", workshopItemResponse.time_updated);
            const t = new Date(workshopItemResponse.time_updated * 1000);
            console.log("Time: ", t.toString());
            console.log("----------------------------");
          } else {
            console.log("Error occurred. Workshop item doesn't exist or there is no connection to the internet");
          }
        } else {
          console.log("error" + response.statusCode);
        }
      });
    }
    i++;
  }
};

export default requestFunc;