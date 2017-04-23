import React, { Component } from "react";
import { connect } from "react-redux";

import Settings from "../components/settings";
import AddGame from "../components/addGame";
import GamePane from "../components/gamePane";

const mapStateToProps = (state) => {
  console.log("[paneContent.jsx] mapStateToProps - state: ", state.paneContent);
  return { paneContent: state.paneContent };
};

@connect(mapStateToProps)
class PaneContent extends Component { 
  render() {
    console.log(this.props);
    switch(this.props.paneContent.id) {
    case -1:
      return <Settings />;
    case -2:
      return <AddGame />;
    default:
      return <GamePane id={this.props.paneContent.id}/>;
    }
  }
}

export default PaneContent;