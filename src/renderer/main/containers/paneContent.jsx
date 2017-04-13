import React, { Component } from "react";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
  console.log("[paneContent.jsx] mapStateToProps - state: ", state);
  return { paneContent: state.paneContent };
};

@connect(mapStateToProps)
class PaneContent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: (<div>Test</div>)
    };
  }
  componentWillMount() {
    console.log("[paneContent.jsx] componentWillMount: ", this.props.paneContent);
  }

  render() {
    return(
      <div>
        {this.state.content}
      </div>
    );
  }
}

export default PaneContent;