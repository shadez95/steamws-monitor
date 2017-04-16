import { Component } from "react";
import { InputGroup, InputGroupAddon, Input, Button } from "reactstrap";

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
    e.target.value = "";
    this.setState({
      input: ""
    });
    const remote = require("electron").remote;
    var appRoot = remote.require("app-root-path");
    new Notification("Steam Workshop Monitor", {
      body: "Game added",
      icon: `file://${appRoot}/src/static/images/logos/favicon-96x96.png`
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