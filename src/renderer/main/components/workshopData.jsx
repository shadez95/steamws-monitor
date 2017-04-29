import React, { Component } from "react";

export default class WorkshopItem extends Component {
  render() {
    return(
      <div>
        <img src={this.props.data.imagePath} />
        <h1>{this.props.data.name}</h1>
      </div>
    );
  }
}