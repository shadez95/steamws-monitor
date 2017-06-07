import { CHANGE_GAME_PANE, ADD_WORKSHOP_ITEM } from "../actions/gameActions";
import { getConfig } from "../configManipulators";

const initialState = {
  gameData: null
};

export default function reducer(state=initialState, action) {
  switch(action.type) {
  case CHANGE_GAME_PANE:
    return {
      ...state,
      gameData: getConfig(`games.${action.payload}`)
    };
  case ADD_WORKSHOP_ITEM:
    // for (let [key, value] of Object.entries(myObject)){
    //   console.log(key, value);
    // }
    return {
      ...state,
      gameData: {
        ...state.gameData,
        workshopItems: [...state.gameData.workshopItems, action.payload]
      }
    };
  default:
    return state;
  }
}