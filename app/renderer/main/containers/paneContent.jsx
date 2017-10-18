import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import log from "electron-log";

import * as navActionCreators from "../../store/actions/navActions";
import * as settingsActionCreators from "../../store/actions/settingsActions";
import * as loadingActionCreators from "../../store/actions/loadingActions";
import * as gameActionCreators from "../../store/actions/gameActions";

import Settings from "../components/settings";
import AddGame from "../components/addGame";
import GamePane from "../components/gamePane";

const mapStateToProps = state => {
  log.debug("[paneContent.jsx] mapStateToProps - state: ", state);
  return {
    paneContent: state.paneContent,
    settings: state.settings,
    gameData: state.gameData.gameData
  };
};

const mapDispatchToProps = dispatch => {
  return {
    navActions: bindActionCreators(navActionCreators, dispatch),
    settingsActions: bindActionCreators(settingsActionCreators, dispatch),
    loadingActions: bindActionCreators(loadingActionCreators, dispatch),
    gameActions: bindActionCreators(gameActionCreators, dispatch)
  };
};

class PaneContent extends Component {
  render() {
    log.debug(this.props);

    switch(this.props.paneContent.id) {
      case null:
        return <h1>Welcome</h1>;
      case -1:
        return <Settings settings={this.props.settings} settingsActions={this.props.settingsActions} loadingActions={this.props.loadingActions}/>;
      case -2:
        return <AddGame loadingActions={this.props.loadingActions} navActions={this.props.navActions}/>;
      default:
        return <GamePane gameData={this.props.gameData} gameActions={this.props.gameActions} id={this.props.paneContent.id}/>;
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PaneContent);