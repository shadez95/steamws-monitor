import { CHANGE_GAME_PANE } from "../actions/gameActions";
import { getConfig } from "../configManipulators";

const initialState = {
  gameData: null
};

export default function reducer(state=initialState, action) {
  switch(action.type) {
  case CHANGE_GAME_PANE:
    return {
      ...state,
      gameData: getConfig("games." + action.payload)
    };
  default:
    return state;
  }
}