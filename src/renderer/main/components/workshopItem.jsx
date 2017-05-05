import React, { Component } from "react";
import { ButtonDropdown , DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";

export default class WorkshopItem extends Component {
  constructor(props) {
    super(props);
    this.convertDateTimeToString = this.convertDateTimeToString.bind(this);
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

  convertDateTimeToString(unixTime) {
    const t = new Date(unixTime*1000);
    return t.toString();
  }

  render() {
    return(
      <tr>
        <td>
          <img src={this.props.data.imagePath} height="75px" />
        </td>
        <td>
          {this.props.data.name}
        </td>
        <td>
          {this.convertDateTimeToString(this.props.data.timeUpdated)}
        </td>
        <td>
          <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
            <DropdownToggle caret>
              Actions
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem header>Header</DropdownItem>
              <DropdownItem disabled>Action</DropdownItem>
              <DropdownItem>Another Action</DropdownItem>
              <DropdownItem divider />
              <DropdownItem>Another Action</DropdownItem>
            </DropdownMenu>
          </ButtonDropdown>
        </td>
      </tr>
    );
  }
}