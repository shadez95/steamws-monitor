import React, { Component } from "react";
import { getConfig } from "../../store/configManipulators";
import { Container, Row, Col } from "reactstrap";

export default class GamePane extends Component {
  constructor(props) {
    super(props);
    this.getData = this.getData.bind(this);
    this.openExternalUrl = this.openExternalUrl.bind(this);
  }

  openExternalUrl(url) {
    const remote = require("electron").remote;
    const shell = remote.shell;
    const options = { activate: true };
    shell.openExternal(url, options);
  }

  getData() {
    return getConfig("games." + String(this.props.id));
  }

  render() {
    const data = this.getData();
    const steamwsUrl = "https://steamcommunity.com/app/" + this.props.id + "/workshop/";
    return(
      <div>
        <Row>
          <a onClick={() => this.openExternalUrl(data.website)} href="#">
            <img src={data.imagePath} height="139px"/>
          </a>
          <div style={{ "marginLeft" : "auto" }}>
            <a onClick={() => this.openExternalUrl(steamwsUrl)} href="#">
              <img src="../../static/images/workshop_logo.png" height="139px" />
            </a>
          </div>
        </Row>
        <hr />
      </div>
    );
  }
}