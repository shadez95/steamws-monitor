import { Component } from "react";
import { InputGroup, InputGroupAddon, Input, Button } from "reactstrap";

export default class AddGame extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.isNumber = this.isNumber.bind(this)
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
        <Button color="success" onClick={this.handleSubmit}>Change Location to steamcmd</Button>
      </div>
    );
  }
}