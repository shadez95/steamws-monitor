import React, { Component } from "react";
import { NavItem, NavLink } from "reactstrap";

export default class NavItemWrapper extends Component {
  constructor(props) {
    super(props);
    this.setSelectedNavItem = this.setSelectedNavItem.bind(this);
    this.state = {
      active: this.props.active
    };
  }

  setSelectedNavItem() {
    this.props.handleClick(this.props.index);
    this.setState({active: true});
  }

  render() {
    return(
      <div key={this.props.keyInput}>
        <NavItem>
          <NavLink onClick={this.setSelectedNavItem} href="#"
            active={this.state.active}>{this.props.name}
          </NavLink>
        </NavItem>
      </div>
    );
  }
}