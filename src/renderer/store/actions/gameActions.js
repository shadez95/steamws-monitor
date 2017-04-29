export const CHANGE_GAME_PANE = "CHANGE_GAME_PANE";

export function changeGamePane(id) {

  return {
    type: CHANGE_GAME_PANE,
    payload: id
  };
}