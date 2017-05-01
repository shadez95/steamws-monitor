import React, { Component } from "react";
import { Row } from "reactstrap";

export default class WorkshopItem extends Component {
  render() {
    return(
      <tr>
        <td>
          <img src={this.props.data.imagePath} height="75px" />
        </td>
        <td>
          {this.props.data.name}
        </td>
      </tr>
    );
  }
}