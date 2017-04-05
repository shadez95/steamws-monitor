import React, { Component }  from "react";
import { NavItem, NavLink } from "reactstrap";

export default class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = { active: false };
    console.log("[settings.jsx] constructor - this.state", this.state);
  }

  componentWillMount() {
    console.log("[settings.jsx] componentWillMount - this.state", this.state);
    this.state = { active: true };
    console.log("[settings.jsx] componentWillMount - this.state", this.state);
  }

  componentWillUnmount() {
    console.log("[settings.jsx] componentWillUnmount - this.state", this.state);
    this.setState({active: false});
    console.log("[settings.jsx] componentWillUnmount - this.state", this.state);
  }

  static nav = function(inputKey, clickHandler) {
    this.state = { active: false };
    return(
      <div key={inputKey}>
        <NavItem>
          <NavLink onClick={() => clickHandler(this, <Settings />, this.state)} href="#" active={this.state.active}>Settings</NavLink>
        </NavItem>
      </div>
    );
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
