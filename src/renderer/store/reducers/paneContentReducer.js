import { CHANGE_PANEL_CONTENT } from "../actions/paneContentActions";

const initialState = {
  content: {
    type: "game",
    data: {
      appID: 107410,
      gameName: "Arma 3",
      headerImage: "http:\/\/cdn.akamai.steamstatic.com\/steam\/apps\/107410\/header.jpg?t=1490285503"
    }
  }
};

export default function reducer(state=initialState, action) {
  switch(action.type) {
  case CHANGE_PANEL_CONTENT:
    return {
      ...state,
      type: action.payload.type,
      content: action.payload.content
    };
  
  default:
    return state;
  }
}