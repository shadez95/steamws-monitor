import React, { Component } from "react";
import { connect } from "react-redux";

import Settings from "../components/settings";
import AddGame from "../components/addGame";

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
    console.log(this.props);
    switch(this.props.paneContent.id) {
    case -1:
      return <Settings />;
    case -2:
      return <AddGame/>;
    default:
      return(
      <div>
        {this.state.content}
      </div>);
    }
  }
}

export default PaneContent;