import request from "request";
import querystring from "querystring";
import child_process from "child_process";
const config = require("electron-settings");

const options = { prettify: true };
const getConfig = (obj, defaultValue="") => {
  // emit loading event here to display loading icon
  const val = config.get(obj, defaultValue, options);
  // emit not loading event here to remove loading icon
  return val;
};  

const downloadWorkshopItem = (appID, workshopItemID) => {
  console.log("Downloading workshop item ID:", workshopItemID);
  const steamCMDLoc = getConfig("settings.steamCMDLoc");
  const steamCMD = child_process.spawnSync(steamCMDLoc, ["+login", getConfig("settings.steamUsername"), getConfig("settings.steamPassword"), "+workshop_download_item", appID, workshopItemID, "validate", "+quit"]);
  console.log("stdout: ", steamCMD.stdout.toString());
  console.log("stderr: ", steamCMD.stderr.toString());
  console.log ("status code: ", steamCMD.status);
};

const getAllGameIDs = () => {
  const gameData = getConfig("navData");
  if (gameData === "") {
    return [];
  }
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
  if (process.env.NODE_ENV === "development") {
    console.log("mainLoop - appIDs: ", appIDs);
  }
  if (appIDs.length === 0) {
    console.log("No workshop items to check");
    return false;
  }
  const games = getConfig("games");
  if (process.env.NODE_ENV === "development") {
    console.log("games: ", games);
  }
  let i = 0;
  while (i < appIDs.length) {
    // Looping through all appIDs
    if (process.env.NODE_ENV === "development") {
      console.log(appIDs[i]);
    }
    let wsItems = games[appIDs[i]].workshopItems;
    if (process.env.NODE_ENV === "development") {
      console.log("wsItems: ", wsItems);
    }
    let c = 0;
    for (c; c < wsItems.length; c++) {
      // loop through all workshop ID's for the current appID
      let workshopItemID = wsItems[c];
      if (process.env.NODE_ENV === "development") {
        console.log("workshopItemID: ", workshopItemID);
      }
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
            // console.log(workshopItemResponse);
            const unixTime = workshopItemResponse.time_updated * 1000;
            console.log("->", workshopItemResponse.title);

            // Make sure we are dealing with int values and not strings for the workshop File ID
            let workshopResponseFileID = workshopItemResponse.publishedfileid;
            if (typeof workshopResponseFileID === "string" || workshopResponseFileID instanceof String) {
              workshopResponseFileID = parseInt(workshopResponseFileID);
            }

            console.log("WorkshopID:", workshopResponseFileID);
            if (process.env.NODE_ENV === "development") {
              console.log("Last updated Unix:", unixTime);
            }
            const t = new Date(unixTime);
            console.log("Last updated:", t.toString());

            // get local workshop data again since this is async
            const workshopData = games[workshopItemResponse.consumer_app_id].workshopItems;
            let index = 0;
            let workshopLocalObj = null;
            while (index < workshopData.length) {
              if (workshopData[index] === workshopResponseFileID) {
                workshopLocalObj = getConfig(`allWorkshopData.${workshopData[index]}`);
                break;
              }
              index++;
            }
            if (workshopLocalObj === null) {
              console.log("Did not find matching workshop data in local config");
            } else {
              const timeDownloaded = new Date(workshopLocalObj.timeUpdated * 1000);
              console.log("Last time downloaded:", timeDownloaded.toString());
              if (t > timeDownloaded) {
                console.log("You do not have latest udpate");
                downloadWorkshopItem(workshopItemResponse.consumer_app_id, workshopLocalObj.publishedFileID);
              } else {
                console.log("Up to date");
              }
            }
            console.log("----------------------------");
          } else {
            console.log("Error occurred. Workshop item doesn't exist or there is no internet connection");
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