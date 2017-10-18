export const CHANGE_STEAMCMD_LOC = "CHANGE_STEAMCMD_LOCATION";
export const CHANGE_STEAM_USERNAME = "CHANGE_STEAM_USERNAME";
export const CHANGE_STEAM_PASSWORD = "CHANGE_STEAM_PASSWORD";
export const REQUEST_CHANGE = "REQUEST_CHANGE";

export function changeSteamCMDLoc(location) {
  return {
    type: CHANGE_STEAMCMD_LOC,
    payload: location
  };
}

export function changeSteamUsername(str) {
  return {
    type: CHANGE_STEAM_USERNAME,
    payload: str
  };
}

export function changeSteamPassword(str) {
  return {
    type: CHANGE_STEAM_PASSWORD,
    payload: str
  };
}