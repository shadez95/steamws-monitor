import React, { Component } from "react";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
  return { paneContent: state.paneContent };
};

@connect(mapStateToProps)
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