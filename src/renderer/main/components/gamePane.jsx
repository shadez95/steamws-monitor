import React, { Component } from "react";
import { getConfig } from "../../store/configManipulators";
import { Input, Row, Col, Button } from "reactstrap";

export default class GamePane extends Component {
  constructor(props) {
    super(props);
    this.getData = this.getData.bind(this);
    this.openExternalUrl = this.openExternalUrl.bind(this);
    this.isNumber = this.isNumber.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = { input: "" };
  }

  isNumber(evt) {
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      evt.preventDefault();
    }
  }

  handleInput(e) {
    this.setState({
      input: e.target.value
    });
  }

  handleSubmit() {
    const workshopID = this.state.input;
    this.setState({ input: "" });
    const remote = require("electron").remote;
    const request = remote.require("request");
    
    const url = "https://api.steampowered.com/ISteamRemoteStorage/GetPublishedFileDetails/v1/";

    request.post({
      url: url,
      form: {
        "itemcount": 1,
        "publishedfileids[0]": workshopID
      }
    }, (err, response, body) => {
      if (response.statusCode === 200) {
        // response good and return data
        const data = JSON.parse(body);
        console.log(data);
        if (data.response.result !== 1) {
          // no workshop items with that id
          // notify user about error
          window.createNotification("No workshop item with id: ", workshopID);
        } else {
          if (data.response.publishedfiledetails[0].consumer_app_id !== this.props.id) {
            window.createNotification("The workshop item you requested is not for the game you have selected");
          }
          console.log(data.response.publishedfiledetails[0]);
        }
      } else {
        // if get response other than 200 log error and notify user
        window.createNotification("Error occurred collecting the workshop item data");
        console.log("err: ", err);
      }
    });
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
        <Row>
          <Col xs="4">
            <Input type="text" name="text" onChange={this.handleInput} value={this.state.input}
              onKeyPress={this.isNumber} placeholder="123456789" />
          </Col>
          <Col xs="8">
            <Button onClick={this.handleSubmit} color="success">Add Workshop Item</Button>
          </Col>
        </Row>
        <hr />
      </div>
    );
  }
}