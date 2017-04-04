import React, { Component }  from "react";
import { Nav } from "reactstrap";

export default class CustomNav extends Component {
  render() {
    return (
      <nav className="hidden-xs-down bg-faded sidebar">
        <Nav vertical pills >
          {this.props.children}
        </Nav>
      </nav>
    );
  }
}