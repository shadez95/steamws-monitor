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
  config.set(`games.${data.steam_appid}`, {
    imagePath: data.header_image,
    name: data.name,
    website: data.website,
    workshopItems: []
  }, options);
}

export function saveWorkshopData(gameID, workshopData) {
  const objLoc = `games.${gameID}.workshopItems`;
  const gameWorkshopItems = getConfig(objLoc);
  gameWorkshopItems.push(workshopData.publishedfileid);
  config.set(objLoc, gameWorkshopItems, options);
  const workshopDataToSave = {
    name: workshopData.title,
    appid: gameID,
    publishedFileID: workshopData.publishedfileid,
    imagePath: workshopData.preview_url,
    fileSize: workshopData.file_size,
    timeCreated: workshopData.time_created,
    timeUpdated: workshopData.time_updated
  };
  config.set(`allWorkshopData.${workshopData.publishedfiledid}`, workshopDataToSave, options);
}

export function getWorkshopData(workshopID) {
  return getConfig(`allWorkshopData.${workshopID}`);
}