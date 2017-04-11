import React, { Component } from "react";
import { NavItem, NavLink } from "reactstrap";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
  return { selectedSidebarItem: state.navData.selectedSidebarItem };
};

@connect(mapStateToProps)
export default class NavItemWrapper extends Component {
  constructor(props) {
    super(props);
    this.setSelectedNavItem = this.setSelectedNavItem.bind(this);
    this.isActive = this.isActive.bind(this);
    this.state = {
      active: false
    };
  }

  isActive() {
    if (this.props.index === this.props.selectedSidebarItem) {
      this.state.active = true;
    } else {
      this.state.active = false;
    }
  }

  setSelectedNavItem() {
    // Calls parent handleClick method
    this.props.handleClick(this.props.index, this.props.id);
  }

  render() {
    this.isActive();
    return(
      <div key={this.props.keyChild}>
        <NavItem>
          <NavLink onClick={this.setSelectedNavItem} href="#"
            active={this.state.active}>{this.props.name}
          </NavLink>
        </NavItem>
      </div>
    );
  }
}