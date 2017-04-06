export const CHANGE_STEAMCMD_LOCATION = "CHANGE_STEAMCMD_LOCATION";
export const GET_STEAMCMD_LOCATION = "GET_STEAMCMD_LOCATION";

export function changeSteamCMDLocation(location) {
  const config = require("electron-settings");
  config.set("settings.steamcmdLocation", location);
  return {
    type: CHANGE_STEAMCMD_LOCATION,
    payload: location
  };
}

export function getSteamCMDLocation() {
  const config = require("electron-settings");
  return {
    type: GET_STEAMCMD_LOCATION,
    payload: config.get("settings.steamcmdLocation", "")
  };
}