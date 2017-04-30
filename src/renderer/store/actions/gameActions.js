export const CHANGE_GAME_PANE = "CHANGE_GAME_PANE";
export const ADD_WORKSHOP_ITEM = "ADD_WORKSHOP_ITEM";

export function changeGamePane(id) {
  return {
    type: CHANGE_GAME_PANE,
    payload: id
  };
}

export function updateWorkshopItems(workshopObj) {
  return {
    type: ADD_WORKSHOP_ITEM,
    payload: {
      name: workshopObj.title,
      publishedFileID: workshopObj.publishedfileid,
      imagePath: workshopObj.preview_url,
      fileSize: workshopObj.file_size,
      timeCreated: workshopObj.time_created,
      timeUpdated: workshopObj.time_updated
    }
  };
}