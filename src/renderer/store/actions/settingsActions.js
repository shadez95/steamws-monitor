export const CHANGE_STEAMCMD_LOC = "CHANGE_STEAMCMD_LOCATION";
export const REQUEST_CHANGE = "REQUEST_CHANGE";

export function changeSteamCMDLoc(location) {
  return {
    type: CHANGE_STEAMCMD_LOC,
    payload: location
  };
}