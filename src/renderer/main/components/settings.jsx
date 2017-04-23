import React, { Component }  from "react";
import { InputGroup, InputGroupAddon, Input, Button } from "reactstrap";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as settingsActionCreators from "../../store/actions/settingsActions";

import { getConfig } from "../../store/configManipulators";

const mapStateToProps = (state) => {
  return {
    steamCMDLoc: state.settings.steamCMDLoc,
    fetching: state.settings.fetching,
    error: state.settings.error
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    settingsActions: bindActionCreators(settingsActionCreators, dispatch)
  };
};

@connect(mapStateToProps, mapDispatchToProps)
class Settings extends Component {
  constructor(props) {
    super(props);
    this.handleFileInput = this.handleFileInput.bind(this);
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getSteamCMDpath = this.getSteamCMDpath.bind(this);
    console.log("[settings] constructor - props: ", this.props);
    this.state = {
      steamCMDLocState: this.props.steamCMDLoc
    };
  }

  getSteamCMDpath() {
    const remote = require("electron").remote;
    const config = remote.require("electron-settings");
    config.get("settings.steamCMDpath", "");
  }

  handleButtonClick() {
    this.fileUpload.click();
  }

  handleFileInput(e) {
    e.persist();
    var fileObj = this.fileUpload.files[0];
    const remote = require("electron").remote;
    const fs = remote.require("fs");
    console.log(fileObj);
    if (fileObj !== undefined) {
      if (fs.existsSync(fileObj.path)) {
        this.setState({steamCMDLocState: fileObj.path});
        // alert("steamcmd location saved...");
      } else {
        this.fileUpload.files = [];
        window.createNotification("steamcmd.exe or steamcmd source cannot be found");
      }
    }
  }

  handleSubmit() {
    // save settings here
    var fileObj = this.fileUpload.files[0];
    // const remote = require("electron").remote;
    // const config = remote.require("electron-settings");
    // config.set("settings", {
    //   steamCMDpath: fileObj.path
    // });

    this.props.settingsActions.changeSteamCMDLoc(fileObj.path);
    window.createNotification("settings saved");
  }

  render() {
    let placeHolder = "not comaptible use at your own risk";
    if (window.platform === "win") {
      placeHolder = "C:\\path\\to\\folder\\steamcmd.exe";
    } else if (window.platform === "linux") {
      placeHolder = "/path/to/folder/steamcmd";
    }

    return(
      <div>
        <h1>Settings</h1>
        <br />
        <InputGroup>
          <InputGroupAddon>SteamCMD Location:</InputGroupAddon>
          <Input type="text" placeholder={placeHolder} value={this.state.steamCMDLocState} readOnly/>
        </InputGroup>
        <input id="fileInputID" type="file" ref={(ref) => this.fileUpload = ref}
                onChange={this.handleFileInput} style={{display: "none"}}/>
        <br />
        <Button color="secondary" onClick={this.handleButtonClick}>Change SteamCMD Location</Button>
        <br />
        <br />
        <br />
        <Button color="success" type="submit" onClick={this.handleSubmit} value="Submit">Save</Button>
      </div>
    );
  }
}

export default Settings;