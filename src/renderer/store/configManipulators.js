const remote = require("electron").remote;
const config = remote.require("electron-settings");

const options = { prettify: true };

export async function changeConfig(obj, value) {
  // emit loading event here to display loading icon
  config.set(obj, value, options);
  // emit not loading event here to remove loading icon
}

export function getConfig(obj, defaultValue="") {
  // emit loading event here to display loading icon
  const val = config.get(obj, defaultValue, options);
  // emit not loading event here to remove loading icon
  return val;
}

export function deleteConfig(keyPath) {
  config.delete(keyPath, options);
}

export function saveGameData(data) {
  const appID = data.steam_appid;
  const appIDstr = String(appID);
  config.set("games." + appIDstr, {
    imagePath: data.header_image,
    name: data.name,
    website: data.website,
    workshopItems: []
  }, options);
}

export function saveWorkshopData(gameID, workshopData) {
  const objLoc = "games." + gameID + ".workshopItems";
  const workshopItems = getConfig(objLoc);
  const workshopDataToAppend = {
    name: workshopData.title,
    publishedFileID: workshopData.publishedfileid,
    imagePath: workshopData.preview_url,
    fileSize: workshopData.file_size,
    timeCreated: workshopData.time_created,
    timeUpdated: workshopData.time_updated
  };
  workshopItems.push(workshopDataToAppend);
  config.set(objLoc, workshopItems, options);
}