import React, { Component } from "react";
import { getConfig } from "../../store/configManipulators";
import { Container, Row, Col } from "reactstrap";

export default class GamePane extends Component {
  constructor(props) {
    super(props);
    this.getData = this.getData.bind(this);
    this.openUrl = this.openUrl.bind(this);
  }

  openUrl(url) {
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
    return(
      <div>
        <Row>
          <Col>
            <h1>{data.name}</h1>
          </Col>
          <Col>
            <a onClick={() => this.openUrl(data.website)} href="#">
              <img src={data.imagePath} width="200px"/>
            </a>
          </Col>
        </Row>
          {this.props.id}
      </div>
    );
  }
}