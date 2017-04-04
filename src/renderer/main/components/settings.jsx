import React, { Component }  from "react";
import { NavItem, NavLink } from "reactstrap";
import { Link } from "react-router";
import SplitPane from "react-split-pane";
import CustomNav from "./nav";

export default class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      navs: []
    };
  }

  static nav = function(inputKey) {
    return(
      <div key={inputKey}>
        <NavItem>
          <NavLink tag={Link} to="settings" activeClassName="active">Settings</NavLink>
        </NavItem>
      </div>
    );
  }

  render() {
    return(
      <div>
        <SplitPane split="vertical" primary="first" defaultSize={200}>
        <div>
          <CustomNav>{this.state.navs}</CustomNav>
        </div>
        <div>
          <div className="container-fluid">
            <h1>Settings</h1>
            <input type="text" />
          </div>
        </div>
      </SplitPane>
      </div>
    );
  }
}
