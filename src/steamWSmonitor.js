const getInterface = require('steam-web-api')
const steamRemoteStorage = getInterface('ISteamRemoteStorage')

export default class SteamWSMonitor {
  // arg = {interval: int, }

  constructor(arg) {
    this.interval = 600 // seconds
  }

  getWorkshopInfo(workshopID) {
    var workshopID
    steamRemoteStorage.post('GetPublishedFileDetails', 1, {
      itemcount: 1,
      publishedfileids: [workshopID]
    }, (statusCode, resp) {
      if (statusCode == 200) {
        
      } else {

      }
    })
    return {
      "publishedfileid": workshopID,
      "title": title,
      "file_size": file_size,
      "preview_url": preview_url,
      "time_created": time_created,
      "time_updated": time_updated
    }
  }
}
