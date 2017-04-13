import React, { Component }  from "react";
import { InputGroup, InputGroupAddon, Input, Button } from "reactstrap";

class Settings extends Component {
  render() {
    return(
      <div>
        <h1>Settings</h1>
        <br />
        <InputGroup>
          <InputGroupAddon>SteamCMD Location:</InputGroupAddon>
          <Input type="text" placeholder="C:\path\to\folder\steamcmd.exe" readOnly/>
        </InputGroup>
        <br />
        <Button color="success" >Change Location to steamcmd</Button>
      </div>
    );
  }
}

export default Settings;