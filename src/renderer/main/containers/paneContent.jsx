import React, { Component } from "react";

class PaneContent extends Component {
  componentWillMount() {
    this.state = {
      title: "Title for Pane Content",
      content: "Pane Content"
    };
  }

  render() {
    return(
      <div>
        <h1>{this.state.title}</h1>
        {this.state.content}
      </div>
    );
  }
}

export default PaneContent;