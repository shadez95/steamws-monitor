import React, { Component } from 'react'

import { Nav, NavItem, NavDropdown, DropdownItem, DropdownToggle, DropdownMenu, NavLink } from 'reactstrap';

import AddForm from '../add/index.js'

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
            <NavLink href="#" active>Add Workshop Item</NavLink>
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
        <AddForm />
      </div>
    )
  }
}

export default MainPage
