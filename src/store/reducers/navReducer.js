import {
  ADD_GAME_TO_NAV, REMOVE_GAME_FROM_NAV,
  SET_SELECTED_SIDEBAR_ITEM
 } from "../actions/navActions";

const initialState = {
  navData: [
    {name: "Add a Game", id: -2},
    {name: "Settings", id: -1},
    {name: "Arma 3", id: 107410},
    {name: "Arma 2", id: 33900}
  ],
  selectedSidebarItem: null,
  error: null
};

export default function reducer(state=initialState, action) {
  switch (action.type) {
  case SET_SELECTED_SIDEBAR_ITEM:
    // var result = Object.assign({}, state, {
    //   selectedSidebarItem: action.index
    // });
    let result = { ...state, selectedSidebarItem: action.payload };
    console.log("[navReducer.js] SET_SELECTED_SIDEBAR_ITEM - result: ", result);
    return result;

  case REMOVE_GAME_FROM_NAV:
    return {
      ...state,
      navNames: [...state.navNames] // Doesn't remove nav yet
    };

  case ADD_GAME_TO_NAV:
    return {
      ...state, navData: [...state.navData, action.payload]
    };
  default:
    return state;
  }
}