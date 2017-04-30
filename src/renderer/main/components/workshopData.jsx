import React, { Component } from "react";
import { Row } from "reactstrap";

export default class WorkshopItem extends Component {
  render() {
    return(
      <div>
        <Row>
          <img src={this.props.data.imagePath} height="75px" />
          {this.props.data.name}
        </Row>
        <br />
      </div>
    );
  }
}