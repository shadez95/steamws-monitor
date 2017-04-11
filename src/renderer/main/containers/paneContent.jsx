import React, { Component } from "react";

class PaneContent extends Component {
  // componentWillMount() {
  //   this.state = {
  //     content: "Pane Content"
  //   };
  // }

  render() {
    return(
      <div>
        {this.props.content}
      </div>
    );
  }
}

export default PaneContent;