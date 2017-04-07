import { CHANGE_PANEL_CONTENT } from "../actions/panelContentActions";

const initialState = {
  title: "Title for Pane Content",
  content: "Pane Content"
};

export default function reducer(state=initialState, action) {
  switch(aciton.type) {
  case CHANGE_PANEL_CONTENT:
    return {
      ...state
    };
  }
}