import { CHANGE_PANEL_CONTENT } from "../actions/paneContentActions";

const initialState = {
  id: null
};

export default function reducer(state=initialState, action) {
  switch(action.type) {
  case CHANGE_PANEL_CONTENT:
    return {
      ...state,
      id: action.payload
    };
  
  default:
    return state;
  }
}