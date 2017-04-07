export const ADD_NAV_ITEM = "ADD_NAV_ITEM";
export const REMOVE_NAV_ITEM = "REMOVE_NAV_ITEM";
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
    type: ADD_NAV_ITEM,
    payload: {gameName: gameName, id: id}
  };
}

export function removeGameFromNav(gameName, id) {
  return {
    type: REMOVE_NAV_ITEM,
    payload: { gameName: gameName, id: id}
  };
}