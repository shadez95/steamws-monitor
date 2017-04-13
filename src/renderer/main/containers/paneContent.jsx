import React, { Component } from "react";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
  console.log("[paneContent.jsx] mapStateToProps - state: ", state);
  return { paneContent: state.paneContent };
};

@connect(mapStateToProps)
class PaneContent extends Component {
  componentWillMount() {
    console.log("[paneContent.jsx] componentWillMount: ", this.props.paneContent);
  }

  render() {
    return(
      <div>
        {this.props.paneContent}
      </div>
    );
  }
}

export default PaneContent;