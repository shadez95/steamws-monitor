import React from 'react'
import { Nav, NavItem, NavDropdown, DropdownItem, DropdownToggle, DropdownMenu, NavLink, TabPane, TabContent } from 'reactstrap'
import classnames from 'classnames'

import AddPage from './add'
import SettingsPage from './settings'
import MonitorPage from './monitor'

const TITLEBAR_HEIGHT = 30;

export default class Main extends React.Component {
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
        <br />
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
              <NavLink id="monitorLink" href="#"
                className={classnames({ active: this.state.activeTab === '3' })}
                onClick={() => { this.toggle('3'); }}
                >Workshop Files Monitoring</NavLink>
            </NavItem>
            <NavItem>
              <NavLink id="settingsLink" href="#"
                className={classnames({ active: this.state.activeTab === '2' })}
                onClick={() => { this.toggle('2'); }}
                >Settings</NavLink>
            </NavItem>
          </Nav>
        <TabContent activeTab={this.state.activeTab} className="container">
          <TabPane tabId="1">
            <AddPage />
          </TabPane>
          <TabPane tabId="2">
            <SettingsPage />
          </TabPane>
          <TabPane tabId="3">
            <MonitorPage />
          </TabPane>
        </TabContent>
      </div>
    )
  }
}
