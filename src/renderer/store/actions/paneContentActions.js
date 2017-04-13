export const CHANGE_PANEL_CONTENT = "CHANGE_PANEL_CONTENT";

export function changePaneContent(content) {
  return {
    type: CHANGE_PANEL_CONTENT,
    payload: {
      type: content.type,
      content: content.data
    }
  };
}