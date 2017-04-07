export const ADD_GAME_TO_NAV = "ADD_GAME_TO_NAV";
export const REMOVE_GAME_FROM_NAV = "REMOVE_GAME_FROM_NAV";
export const SET_SELECTED_SIDEBAR_ITEM = "SET_SELECTED_SIDEBAR_ITEM";
export const UPDATE_SELECTED_SIDEBAR_ITEM = "UPDATE_SELECTED_SIDEBAR_ITEM";

export function setSelectedSidebarItem(index) {
  return {
    type: UPDATE_SELECTED_SIDEBAR_ITEM,
    payload: index
  };
}

export function addGameToNav(gameName, id) {
  return {
    type: ADD_GAME_TO_NAV,
    payload: {gameName: gameName, id: id}
  };
}

export function removeGameFromNav(gameName, id) {
  return {
    type: REMOVE_GAME_FROM_NAV,
    payload: { gameName: gameName, id: id}
  };
}