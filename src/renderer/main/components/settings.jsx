import React, { Component }  from "react";
import { InputGroup, InputGroupAddon, Input, Button, Col } from "reactstrap";
import log from "electron-log";
// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";

// import * as settingsActionCreators from "../../store/actions/settingsActions";
// import * as loadingActionCreators from "../../store/actions/loadingActions";

// const mapStateToProps = (state) => {
//   return {
//     steamCMDLoc: state.settings.steamCMDLoc,
//     fetching: state.settings.fetching,
//     error: state.settings.error
//   };
// };

// const mapDispatchToProps = (dispatch) => {
//   return {
//     settingsActions: bindActionCreators(settingsActionCreators, dispatch),
//     loadingActions: bindActionCreators(loadingActionCreators, dispatch)
//   };
// };

// @connect(mapStateToProps, mapDispatchToProps)
class Settings extends Component {
  constructor(props) {
    super(props);
    this.handleInputUsername = this.handleInputUsername.bind(this);
    this.handleInputPassword = this.handleInputPassword.bind(this);
    this.handleFileInput = this.handleFileInput.bind(this);
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getSteamCMDpath = this.getSteamCMDpath.bind(this);
    this.initialSteamUsername = this.props.settings.steamUsername;
    this.initialSteamPassword = this.props.settings.steamPassword;
    this.state = {
      steamCMDLocState: this.props.settings.steamCMDLoc,
      steamUsername: this.props.settings.steamUsername,
      steamPassword: this.props.settings.steamPassword
    };
  }

  handleInputUsername(e) {
    this.setState({
      steamUsername: e.target.value
    });
  }

  handleInputPassword(e) {
    this.setState({
      steamPassword: e.target.value
    });
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
    log.debug(fileObj);
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
    this.props.loadingActions.setLoading(true);

    const fileObj = this.fileUpload.files[0];
    if (fileObj) {
      this.props.settingsActions.changeSteamCMDLoc(fileObj.path);
    }

    if (this.initialSteamUsername !== this.state.steamUsername) {
      this.props.settingsActions.changeSteamUsername(this.state.steamUsername);
    }

    if (this.initialSteamPassword !== this.state.steamPassword) {
      this.props.settingsActions.changeSteamPassword(this.state.steamPassword);
    }

    window.createNotification("settings saved");
    this.props.loadingActions.setLoading(false);
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
        <Col xs="12">
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
          <InputGroup>
            <InputGroupAddon>Steam Username:</InputGroupAddon>
            <Input type="text" placeholder={"This is used in case you need to login. If not, type \"Anonymous\" and leave the password blank"}
              onChange={this.handleInputUsername} value={this.state.steamUsername}/>
          </InputGroup>
          <br />
          <InputGroup>
            <InputGroupAddon>Steam Password:</InputGroupAddon>
            <Input type="password" placeholder={"This is used in case you need to login. Make sure Steam Guard is off as this does not support it"}
              onChange={this.handleInputPassword} value={this.state.steamPassword}/>
          </InputGroup>
          <br />
          <Button color="success" type="submit" onClick={this.handleSubmit} value="Submit">Save</Button>
        </Col>
      </div>
    );
  }
}

export default Settings;