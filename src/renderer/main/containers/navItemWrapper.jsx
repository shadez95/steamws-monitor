import React, { Component } from "react";
import {
  NavItem, NavLink, ButtonDropdown, DropdownToggle,
  DropdownMenu, DropdownItem, Button
} from "reactstrap";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as navActionCreators from "../../store/actions/navActions";
import * as paneContentActions from "../../store/actions/paneContentActions";

const mapStateToProps = (state) => {
  console.log("[navItemWrapper.jsx] state.navData: ", state.navData);
  return { navData: state.navData };
};

const mapDispatchToProps = dispatch => {
  return {
    navActions: bindActionCreators(navActionCreators, dispatch),
    paneContentActions: bindActionCreators(paneContentActions, dispatch)
  };
};

@connect(mapStateToProps, mapDispatchToProps)
export default class NavItemWrapper extends Component {
  constructor(props) {
    super(props);
    this.setSelectedNavItem = this.setSelectedNavItem.bind(this);
    this.isActive = this.isActive.bind(this);
    this.toggle = this.toggle.bind(this);
    this.deleteNavItem = this.deleteNavItem.bind(this);

    this.state = {
      active: false,
      isOpen: false,
      buttonColor: "secondary"
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  isActive() {
    if (this.props.index === this.props.navData.selectedSidebarItem.index) {
      this.state.active = true;
      this.state.buttonColor = "primary";
    } else {
      this.state.active = false;
      this.state.buttonColor = "secondary";
    }
  }

  deleteNavItem() {
    if (this.props.index === this.props.navData.selectedSidebarItem.index) {
      this.props.paneContentActions.changePaneContent(null);
    }
    this.props.navActions.removeGameFromNav(this.props.id);
    window.createNotification("Game deleted");
  }

  setSelectedNavItem() {
    // Calls parent handleClick method
    this.props.handleClick(this.props.index, this.props.id);
  }

  render() {
    this.isActive();
    if (this.props.id < 0) {
      return(
      <div key={this.props.keyChild}>
        <NavItem>
          <NavLink onClick={this.setSelectedNavItem} href="#"
            active={this.state.active}>{this.props.name}
          </NavLink>
        </NavItem>
      </div>
      );
    } else {
      return(
        <div key={this.props.keyChild}>
          <ButtonDropdown isOpen={this.state.isOpen} style={{"padding": ".5em 0em"}} toggle={this.toggle}>
            <Button onClick={this.setSelectedNavItem} id="caret" color={this.state.buttonColor}>{this.props.name}</Button>
            <DropdownToggle caret />
            <DropdownMenu style={{"backgroundColor": "#D9534F"}}>
              <DropdownItem onClick={this.deleteNavItem} color="danger">Delete</DropdownItem>
            </DropdownMenu>
          </ButtonDropdown>
        </div>
      );
    }
  }
}