import { SET_LOADING } from "../actions/loadingActions";

const initialState = {
  loading: "",
  disable: ""
};

export default function reducer(state=initialState, action) {
  switch(action.type) {
  case SET_LOADING:
    return {
      ...state,
      loading: action.payload.loading,
      disable: action.payload.disable
    };

  default: 
    return state;
  }
}