import React, { Component } from "react";
import { InputGroup, InputGroupAddon, Input, Button } from "reactstrap";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as navActionCreators from "../../store/actions/navActions";

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    navActions: bindActionCreators(navActionCreators, dispatch)
  };
};

@connect(mapStateToProps, mapDispatchToProps)
export default class AddGame extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.isNumber = this.isNumber.bind(this);
    this.state = {
      input: ""
    };
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

  handleSubmit(e) {
    console.log("[addGame.jsx] handleSubmit - this.state.input: ", this.state.input);
    const appID = this.state.input;

    const remote = require("electron").remote;
    const request = remote.require("request");

    const url = "http://store.steampowered.com/api/appdetails" + "?appids=" + appID;
    console.log(url);

    request.get(url, (err, response, body) => {
      if (response.statusCode === 200) {
        const obj = JSON.parse(body);
        if (obj[appID].success === true) {
          console.log(obj[appID].data);
          console.log(obj[appID].data.name, obj[appID].data.steam_appid);
          this.props.navActions.addGameToNav(obj[appID].data.name, obj[appID].data.steam_appid);
          this.setState({
            input: ""
          });
          window.createNotification("Game added");
        } else {
          this.setState({
            input: ""
          });
          window.createNotification("Error occurred while adding a game");
        }
      } else {
        console.log(err);
        window.createNotification("Error occurred while adding a game");
        this.setState({
          input: ""
        });
      }
    });
  }

  render() {
    return(
      <div>
        <h1>Add Steam Game</h1>
        <br />
        <InputGroup>
          <InputGroupAddon>Steam App ID:</InputGroupAddon>
          <Input type="text" onChange={this.handleInput} onKeyPress={this.isNumber}
          value={this.state.input} placeholder="123456"/>
        </InputGroup>
        <br />
        <Button color="success" onClick={this.handleSubmit}>Add Steam Game</Button>
      </div>
    );
  }
}