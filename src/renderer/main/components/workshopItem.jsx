import React, { Component } from "react";
import { ButtonDropdown , DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";

import { deleteConfig, getConfig, changeConfig } from "../../store/configManipulators";

export default class WorkshopItem extends Component {
  constructor(props) {
    super(props);
    this.convertDateTimeToString = this.convertDateTimeToString.bind(this);
    this.toggle = this.toggle.bind(this);
    this.openFileBrowser = this.openFileBrowser.bind(this);
    this.deleteWorkshopItem = this.deleteWorkshopItem.bind(this);
    this.state = {
      dropdownOpen: false
    };
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  convertDateTimeToString(unixTime) {
    const t = new Date(unixTime*1000);
    return t.toString();
  }

  deleteWorkshopItem() {
    console.log(this.props.data);
    deleteConfig(`allWorkshopData.${this.props.data.publishedFileID}`);
    console.log(`games.${this.props.data.appid}.workshopItems`);
    const workshopItemIDs = getConfig(`games.${this.props.data.appid}.workshopItems`);
    console.log(workshopItemIDs);
    const index = workshopItemIDs.indexOf(this.props.data.publishedFileID);
    const newWorkshopItemIDs = workshopItemIDs.splice(index);
    changeConfig(`games.${this.props.data.appid}.workshopItems`, newWorkshopItemIDs);

    // Delete the folder containing the workshop data
    const steamCMDLoc = getConfig("settings.steamCMDLoc");
    const idx = steamCMDLoc.indexOf("steamcmd");
    const steamCMDPath = steamCMDLoc.substring(0, idx - 1);
    
    // Check if windows or linux
    let path;
    if (window.platform === "win") {
      path = `${steamCMDPath}\\steamapps\\workshop\\content\\${this.props.data.appid}\\${this.props.data.publishedFileID}`;
    } else {
      path = `${steamCMDPath}/steamapps/workshop/content/${this.props.data.appid}/${this.props.data.publishedFileID}`;
    }
    const rimraf = require("rimraf");
    // Make sure we don't accidentally delete some random folder/file if there is undefined in path
    if (path.indexOf("undefined") !== -1) {
      rimraf(path, () => {
        console.log("Successfully deleted workshop item");
        window.createNotification("Workshop item successfully deleted");
      });
    } else {
      console.log("Workshop item was not successfully deleted");
      console.log(`Path: ${path}`);
      window.createNotification("Workshop item was not successfully deleted");
    }
  }

  openFileBrowser() {
    const steamCMDLoc = getConfig("settings.steamCMDLoc");
    const idx = steamCMDLoc.indexOf("steamcmd");
    const steamCMDPath = steamCMDLoc.substring(0, idx - 1);
    const { shell } = require("electron").remote;
    if (window.platform === "win") {
      shell.openItem(`${steamCMDPath}\\steamapps\\workshop\\content\\${this.props.data.appid}\\${this.props.data.publishedFileID}`);
    } else {
      shell.openItem(`${steamCMDPath}/steamapps/workshop/content/${this.props.data.appid}/${this.props.data.publishedFileID}`);
    }
  }

  render() {
    return(
      <tr>
        <td>
          <img src={this.props.data.imagePath} height="75px" />
        </td>
        <td>
          {this.props.data.name}
        </td>
        <td>
          {this.convertDateTimeToString(this.props.data.timeUpdated)}
        </td>
        <td>
          <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
            <DropdownToggle caret>
              Actions
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem onClick={this.openFileBrowser}>Open Folder</DropdownItem>
              <DropdownItem divider/>
              <DropdownItem onClick={this.deleteWorkshopItem} style={{"backgroundColor": "rgb(217, 83, 79)"}}>Delete</DropdownItem>
            </DropdownMenu>
          </ButtonDropdown>
        </td>
      </tr>
    );
  }
}