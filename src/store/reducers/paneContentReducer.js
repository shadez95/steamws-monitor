import { CHANGE_PANEL_CONTENT } from "../actions/paneContentActions";

const initialState = {
  content: "Pane Content"
};

export default function reducer(state=initialState, action) {
  switch(action.type) {
  case CHANGE_PANEL_CONTENT:
    return {
      ...state,
      content: action.payload
    };
  
  default:
    return state;
  }
}