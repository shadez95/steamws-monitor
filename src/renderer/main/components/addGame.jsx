import { Component } from "react";
import { InputGroup, InputGroupAddon, Input, Button } from "reactstrap";
import { connect } from "react-redux";

const mapDispatchToProps = (dispatch) => {
  return {
    
  };
};

@connect(mapDispatchToProps)
export default class AddGame extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.isNumber = this.isNumber.bind(this);
    this.getGameInfo = this.getGameInfo.bind(this);
    this.state = {
      input: ""
    };
  }

  async getGameInfo(appID) {
    const remote = require("electron").remote;
    const request = remote.require("request-promise");

    let params = { appids: appID };
    var options = {
      url: "http://store.steampowered.com/api/appdetails",
      qs: params
    };
    return await request.get(options);
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
    var body = this.getGameInfo(this.state.input);
    let appID = this.state.input;
    body
    .then( value => {
      const obj = JSON.parse(value);
      if (obj[appID].success === true) {
        console.log(obj[appID].data);
        window.createNotification("Game added");
      } else {
        window.createNotification("Error occurred while adding a game");
      }
    })
    .catch( reason => {
      console.log(reason);
      window.createNotification("Error occurred while adding a game");
    });

    e.target.value = "";
    this.setState({
      input: ""
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