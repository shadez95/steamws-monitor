export const ADD_NAV_ITEM = "ADD_NAV_ITEM";
export const REMOVE_NAV_ITEM = "REMOVE_NAV_ITEM";
export const SET_SELECTED_SIDEBAR_ITEM = "SET_SELECTED_SIDEBAR_ITEM";

export function setSelectedSidebarItem(index, id) {
  return {
    type: SET_SELECTED_SIDEBAR_ITEM,
    payload: {index: index, id: id}
  };
}

export function addGameToNav(gameName, id) {
  return {
    type: ADD_NAV_ITEM,
    payload: {name: gameName, id: id}
  };
}

export function removeGameFromNav(id) {
  return {
    type: REMOVE_NAV_ITEM,
    payload: id
  };
}