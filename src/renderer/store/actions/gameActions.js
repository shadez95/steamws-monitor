export const CHANGE_GAME_PANE = "CHANGE_GAME_PANE";
export const ADD_WORKSHOP_ITEM = "ADD_WORKSHOP_ITEM";
export const REMOVE_WORKSHOP_ITEM = "REMOVE_WORKSHOP_ITEM";

export function changeGamePane(id) {
  return {
    type: CHANGE_GAME_PANE,
    payload: id
  };
}

export function addWorkshopItem(workshopData) {
  return {
    type: ADD_WORKSHOP_ITEM,
    payload: workshopData
  };
}

export function deleteWorkshopItem(workshopItemID) {
  return {
    type: REMOVE_WORKSHOP_ITEM,
    payload: workshopItemID
  };
}