import React, { Component } from "react";
import { connect } from "react-redux";

import Settings from "../components/settings";

const mapStateToProps = (state) => {
  console.log("[paneContent.jsx] mapStateToProps - state: ", state.paneContent);
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

  componentWillUpdate() {
    console.log("[paneContent.jsx] componentWillUpdate: ", this.props.paneContent);
  }

  render() {
    if (this.props.paneContent.id === -1) {
      return <Settings />;
    }

    return(
      <div>
        {this.state.content}
      </div>
    );
  }
}

export default PaneContent;