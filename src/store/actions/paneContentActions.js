export const CHANGE_PANEL_CONTENT = "CHANGE_PANEL_CONTENT";

export function changePaneContent(index) {
  return {
    type: CHANGE_PANEL_CONTENT,
    payload: index
  };
}