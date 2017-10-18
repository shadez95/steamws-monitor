import React, { Component } from "react";
import { ButtonDropdown , DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";

import { getConfig } from "../../store/configManipulators";

export default class WorkshopItem extends Component {
  constructor(props) {
    super(props);
    this.convertDateTimeToString = this.convertDateTimeToString.bind(this);
    this.toggle = this.toggle.bind(this);
    this.openFileBrowser = this.openFileBrowser.bind(this);
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
              <DropdownItem onClick={() => this.props.deleteWorkshopItem(this.props.data)} style={{"backgroundColor": "rgb(217, 83, 79)"}}>Delete</DropdownItem>
            </DropdownMenu>
          </ButtonDropdown>
        </td>
      </tr>
    );
  }
}