import React, { Component }  from "react";
import { NavItem, NavLink, NavbarBrand } from "reactstrap";
import { Link } from "react-router";

class Settings extends Component {
  constructor(props) {
    super(props);
  }

  static nav = (keyInput) => {
    <div>
      <NavbarBrand>Settings</NavbarBrand>
      <NavItem>
        <NavLink tag={Link} to="settings" activeClassName="active">Add a Game</NavLink>
      </NavItem>
    </div>
  }

  render() {
    return(
      <div>
        <h1>Settings</h1>
        <input type="text" />
      </div>
    );
  }
}

export default Settings;
