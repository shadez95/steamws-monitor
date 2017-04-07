import {
  ADD_GAME_TO_NAV, REMOVE_GAME_FROM_NAV,
  SET_SELECTED_SIDEBAR_ITEM
 } from "../actions/navActions";

const initialState = {
  navs: [
    {name: "Arma 3", id: 107410},
    {name: "Arma 2", id: 33900}
  ],
  selectedSidebarItem: 0,
  error: null
};

export default function reducer(state = initialState, action) {
  switch (action.type) {

  case SET_SELECTED_SIDEBAR_ITEM:
    console.log("clicked sidebar index: " + action.index);
    var result = Object.assign({}, state, {
      selectedSidebarItem: action.index
    });
    console.log("[navReducer.js] SET_SELECTED_SIDEBAR_ITEM - result: ", result);
    return result;

  case REMOVE_GAME_FROM_NAV:
    return {
      ...state,
      navNames: [...state.navNames] // Doesn't remove nav yet
    };

  case ADD_GAME_TO_NAV:
    return {
      ...state, navs: [...state.navs, action.payload]
    };
  default:
    return state;
  }
}