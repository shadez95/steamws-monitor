const remote = require("electron").remote;
const config = remote.require("electron-settings");

export async function changeConfig(obj, value) {
  // emit loading event here to display loading icon
  config.set(obj, value);
  // emit not loading event here to remove loading icon
}

export function getConfig(obj, defaultValue="") {
  // emit loading event here to display loading icon
  const val = config.get(obj, defaultValue);
  // emit not loading event here to remove loading icon
  return val;
}