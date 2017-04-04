import { Component } from "react";
import { NavItem, NavLink } from "reactstrap";
import { Link } from "react-router";

export default class AddGame extends Component {
  
  static nav = function(inputKey) {
    return(
      <div key={inputKey}>
        <NavItem>
          <NavLink tag={Link} to="add-game" activeClassName="active">Add Steam Game</NavLink>
        </NavItem>
      </div>
    );
  }

  render() {
    return(
      <div>
        <h1>Add Steam Game</h1>
        <input type="text" />
      </div>
    );
  }
}