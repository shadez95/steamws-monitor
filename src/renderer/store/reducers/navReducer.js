import {
  ADD_GAME_TO_NAV, REMOVE_GAME_FROM_NAV,
  SET_SELECTED_SIDEBAR_ITEM
 } from "../actions/navActions";

import { changePaneContent } from "../actions/paneContentActions";

const initialState = {
  navData: [
    {name: "Add a Game", id: -2},
    {name: "Settings", id: -1},
    {name: "Arma 3", id: 107410},
    {name: "Arma 2", id: 33900}
  ],
  selectedSidebarItem: { index: null, id: null },
  error: null
};

export default function reducer(state=initialState, action) {
  switch (action.type) {
  case SET_SELECTED_SIDEBAR_ITEM:
    changePaneContent(action.payload.id);
    return {
      ...state,
      selectedSidebarItem: {
        index: action.payload.index,
        id: action.payload.id
      },
    };

  case REMOVE_GAME_FROM_NAV:
    return {
      ...state,
      navNames: [...state.navNames] // Doesn't remove nav yet
    };

  case ADD_GAME_TO_NAV:
    return { ...state, navData: [...state.navData, action.payload] };
  default:
    return state;
  }
}