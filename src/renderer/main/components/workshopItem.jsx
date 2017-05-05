import React, { Component } from "react";
import { Row } from "reactstrap";

export default class WorkshopItem extends Component {
  constructor(props) {
    super(props);
    this.convertDateTimeToString = this.convertDateTimeToString.bind(this);
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
      </tr>
    );
  }
}