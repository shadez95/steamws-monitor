import { ADD_NAV, REMOVED_NAV } from "../actions/navActions";

export default function reducer(state={
  navs: [],
  error: null
}, action) {
  switch (action.type) {
  case ADD_NAV:
    return {
      ...state,
      navs: [...state.navs, action.payload]
    };
  case REMOVED_NAV:
    return {
      ...state,
      navs: [...state.navs] // Doesn't remove nav yet
    };
  default:
    return state;
  }
}