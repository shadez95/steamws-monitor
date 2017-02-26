import React, { Component } from 'react'

import { Nav, NavItem, NavDropdown, DropdownItem, DropdownToggle, DropdownMenu, NavLink, TabPane, TabContent } from 'reactstrap'
import classnames from 'classnames';

import AddPage from '../add/index.js'
import SettingsPage from '../settings/index.js'

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

class MainPage extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: '1'
    };
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  render () {
    return (
      <div>
        <h1 style={{"textAlign": "center"}}>Steam Workshop Monitor</h1>
        <br />
          <Nav tabs>
            <NavItem>
              <NavLink id="addLink" href="#"
                className={classnames({ active: this.state.activeTab === '1' })}
                onClick={() => { this.toggle('1'); }}
                >Add Workshop Item</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#">Workshop Files Monitoring</NavLink>
            </NavItem>
            <NavItem>
              <NavLink id="settingsLink" href="#"
                className={classnames({ active: this.state.activeTab === '2' })}
                onClick={() => { this.toggle('2'); }}
                >Settings</NavLink>
            </NavItem>
          </Nav>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">
            <AddPage />
          </TabPane>
          <TabPane tabId="2">
            <SettingsPage />
          </TabPane>
        </TabContent>
      </div>
    )
  }
}

export default MainPage
