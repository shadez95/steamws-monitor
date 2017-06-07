export const CHANGE_GAME_PANE = "CHANGE_GAME_PANE";
export const ADD_WORKSHOP_ITEM = "ADD_WORKSHOP_ITEM";

export function changeGamePane(id) {
  return {
    type: CHANGE_GAME_PANE,
    payload: id
  };
}

export function updateWorkshopItems(workshopItemID) {
  return {
    type: ADD_WORKSHOP_ITEM,
    payload: workshopItemID
  };
}