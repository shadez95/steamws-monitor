import React, { Component } from "react";
import { NavItem, NavLink } from "reactstrap";

export default class NavItemWrapper extends Component {
  constructor(props) {
    super(props);
    this.onClickHandler = this.onClickHandler.bind(this);
    this.state = { active: false };
  }

  onClickHandler() {
    this.setState({ active: true });
  }

  render() {
    return(
      <div key={this.props.customKey}>
        <NavItem>
          <NavLink onClick={onClickHandler} href="#" active={this.state.active}>{this.props.name}</NavLink>
        </NavItem>
      </div>
    );
  }
}