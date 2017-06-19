import {
  ADD_NAV_ITEM, REMOVE_NAV_ITEM, SET_SELECTED_SIDEBAR_ITEM
 } from "../actions/navActions";
import { getConfig, changeConfig } from "../configManipulators";

if (getConfig("navData") === "") {
  changeConfig("navData", []);
}

const initialState = {
  // navData: [
  //   // {name: "Add a Game", id: -2},
  //   // {name: "Settings", id: -1},
  //   // {name: "Arma 2", id: 33900}
  // ],
  navData: getConfig("navData", []),
  selectedSidebarItem: { index: null, id: null },
  error: null
};

export default function reducer(state=initialState, action) {
  switch (action.type) {
    case SET_SELECTED_SIDEBAR_ITEM:
    // TODO: Need to get JSON data from local machine
    // and change pane component to data retrieved from
    // JSON data.
      return {
        ...state,
        selectedSidebarItem: {
          index: action.payload.index,
          id: action.payload.id
        },
      };

    case REMOVE_NAV_ITEM:
      var newNavData = state.navData.filter(navDataObj => navDataObj.id !== action.payload);
      changeConfig("navData", newNavData);
      return {
        ...state,
        navData: newNavData
      };

    case ADD_NAV_ITEM:
      changeConfig("navData", [...state.navData, action.payload]);
      return {
        ...state,
        navData: [...state.navData, action.payload]
      };
    default:
      return state;
  }
}