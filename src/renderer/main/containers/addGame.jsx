import React, { Component } from "react";
import { InputGroup, InputGroupAddon, Input, Button, Col } from "reactstrap";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as navActionCreators from "../../store/actions/navActions";
import * as loadingActionCreators from "../../store/actions/loadingActions";
import { saveGameData } from "../../store/configManipulators";

const mapStateToProps = () => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    navActions: bindActionCreators(navActionCreators, dispatch),
    loadingActions: bindActionCreators(loadingActionCreators, dispatch)
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

  handleSubmit() {
    this.props.loadingActions.setLoading(true);
    const appID = this.state.input;

    const remote = require("electron").remote;
    const request = remote.require("request");

    const url = "http://store.steampowered.com/api/appdetails" + "?appids=" + appID;

    request.get(url, (err, response, body) => {
      if (response.statusCode === 200) {
        const obj = JSON.parse(body);
        if (obj[appID].success === true) {
          console.log(obj);
          this.props.navActions.addGameToNav(obj[appID].data.name, obj[appID].data.steam_appid);
          saveGameData(obj[appID].data);
          this.setState({
            input: ""
          });
          this.props.loadingActions.setLoading(false);
        } else {
          window.createNotification("No steam game with that app ID exists");
          this.setState({
            input: ""
          });
          this.props.loadingActions.setLoading(false);
        }
      } else {
        console.log(err);
        window.createNotification("Error occurred while adding a game");
        this.setState({
          input: ""
        });
        this.props.loadingActions.setLoading(false);
      }
    });
  }

  render() {
    return(
      <div>
        <h1>Add Steam Game</h1>
        <br />
        <Col xs="8">
          <InputGroup>
            <InputGroupAddon>Steam App ID:</InputGroupAddon>
            <Input type="text" onChange={this.handleInput} onKeyPress={this.isNumber}
            value={this.state.input} placeholder="123456"/>
          </InputGroup>
          <br />
          <Button color="success" onClick={this.handleSubmit}>Add Steam Game</Button>
        </Col>
      </div>
    );
  }
}