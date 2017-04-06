export const ADD_NAV = "ADD_NAV";
export const REMOVE_NAV = "REMOVE_NAV";

export function addNav(component) {
  return {
    type: ADD_NAV,
    payload: component
  };
}

export function removeNav(component) {
  return {
    type: REMOVE_NAV,
    payload: component
  };
}