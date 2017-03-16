import React, { Component } from 'react'
import { Nav, NavItem, NavDropdown, DropdownItem, DropdownToggle, DropdownMenu, NavLink, TabPane, TabContent } from 'reactstrap'
import classnames from 'classnames'

import AddPage from './add'
import SettingsPage from './settings'
import MonitorPage from './monitor'

class Holder extends Component {
  constructor(props) {
    super(props);

    this.onDropHandler = this.onDropHandler.bind(this)
  }
  componentDidMount() {
    console.log(this)
  }
  onDropHandler(e) {
    console.log(e)
    e.preventDefault()
    e.stopPropagation()
    e.nativeEvent.stopImmediatePropagation()
    for (let f of e.dataTransfer.files) {
      console.log("Files you dragged here: ", f.path)
    }
    return false
  }
  render() {
    return (
      <div id="holder" onDragOver={(e) => {e.preventDefault()}}
        onDragEnd={(e) => {e.preventDefault()}}
        onDragLeave={(e) => {e.preventDefault()}}
        onDrop={this.onDropHandler}>
        <br />
        <br />
        Drag your file here
      </div>
    )
  }
}

export default class Main extends Component {
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

  render() {
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
        <Holder />
      </div>
    )
  }
}
