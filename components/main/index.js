import React, { Component } from 'react'

import { Nav, NavItem, NavDropdown, DropdownItem, DropdownToggle, DropdownMenu, NavLink } from 'reactstrap';
import Link from 'react-router'

// Nav Dropdown example below

// <NavDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
//   <DropdownToggle nav caret>
//     Dropdown
//   </DropdownToggle>
//   <DropdownMenu>
//     <DropdownItem header>Header</DropdownItem>
//     <DropdownItem disabled>Action</DropdownItem>
//     <DropdownItem>Another Action</DropdownItem>
//     <DropdownItem divider />
//     <DropdownItem>Another Action</DropdownItem>
//   </DropdownMenu>
// </NavDropdown>

class NavBarComponent extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false
    };
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  render() {
    return (
      <div>
        <Nav tabs>
          <NavItem>
            <NavLink tag={Link} to="/somewhere" active>Add Workshop Item</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="#">Current Workshop Items</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="#">Settings</NavLink>
          </NavItem>
        </Nav>
      </div>
    );
  }
}

class MainPage extends Component {
  render () {
    return (
      <div>
        <h1 style={{"textAlign": "center"}}>Steam Workshop Monitor</h1>
        <br />
        <NavBarComponent />
      </div>
    )
  }
}

export default MainPage
