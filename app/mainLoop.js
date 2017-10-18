import request from "request";
import querystring from "querystring";
import child_process from "child_process";
import log from "electron-log";

import { getConfig, changeWorkshopData} from "./config";

const downloadWorkshopItem = (appID, workshopItemID) => {
  log.debug("Downloading workshop item ID:", workshopItemID);
  const steamCMDLoc = getConfig("settings.steamCMDLoc");
  const steamCMD = child_process.spawnSync(steamCMDLoc, ["+login", getConfig("settings.steamUsername"), getConfig("settings.steamPassword"), "+workshop_download_item", appID, workshopItemID, "validate", "+quit"]);
  log.debug("stdout: ", steamCMD.stdout.toString());
  log.debug("stderr: ", steamCMD.stderr.toString());
  log.debug("status code: ", steamCMD.status);
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
// requestFunc
// function is asynchronous
export default async () => {
  const appIDs = getAllGameIDs();
  log.debug("mainLoop - appIDs: ", appIDs);
  if (appIDs.length === 0) {
    log.info("No workshop items to check");
    return false;
  }

  const games = getConfig("games");
  log.debug("games: ", games);

  let i = 0;
  while (i < appIDs.length) {
    // Looping through all appIDs
  
    log.debug(appIDs[i]);
  
    let wsItems = games[appIDs[i]].workshopItems;
    
    log.debug("wsItems: ", wsItems);
    
    let c = 0;
    for (c; c < wsItems.length; c++) {
      // loop through all workshop ID's for the current appID
      let workshopItemID = wsItems[c];
    
      log.debug("workshopItemID: ", workshopItemID);
    
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
            log.debug("->", workshopItemResponse.title);

            // Make sure we are dealing with int values and not strings for the workshop File ID
            let workshopResponseFileID = workshopItemResponse.publishedfileid;
            if (typeof workshopResponseFileID === "string" || workshopResponseFileID instanceof String) {
              workshopResponseFileID = parseInt(workshopResponseFileID);
            }

            log.info("WorkshopID:", workshopResponseFileID);
            
            log.info("Last updated Unix:", unixTime);
            
            const t = new Date(unixTime);
            log.info("Last updated:", t.toString());

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
              log.info("Did not find matching workshop data in local config");
            } else {
              const timeDownloaded = new Date(workshopLocalObj.timeUpdated * 1000);
              log.info("Last time downloaded:", timeDownloaded.toString());
              // Check to see if local data is up to date
              if (t > timeDownloaded) {
                log.info("You do not have latest udpate");
                // Save updated data config
                changeWorkshopData(workshopItemResponse.consumer_app_id, workshopItemResponse);
                // download the update
                downloadWorkshopItem(workshopItemResponse.consumer_app_id, workshopLocalObj.publishedFileID);
              } else {
                log.info("Up to date");
              }
            }
            log.info("----------------------------");
          } else {
            log.error("Error occurred. Workshop item doesn't exist or there is no internet connection");
          }
        } else {
          log.error("error" + error);
        }
      });
    }
    i++;
  }
};
