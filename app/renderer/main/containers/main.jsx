import React, { Component }  from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import SplitPane from "react-split-pane";

import CustomNav from "./nav";
import PaneContent from "./paneContent";
import Drawer from "./drawer";

const mapStateToProps = state => {
  return {
    loading: state.loading.loading,
    disable: state.loading.disable
  };
};

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: this.props.loading,
      disable: this.props.disable
    };
  }

  loadHandler() {
    this.setState({ loading: "loader", disable: "block" });
  }

  render() {
    var divStyle = {
      display:this.state.disable ? "block":"none"
    };
    const scrollStyle = {
      height: "100vh",
      overflowX: "hidden",
      overflowY: "auto"
    };
    return (
      <div>
        <div className={this.state.loading}></div>
        <div id="cover" style={divStyle}></div>
        <Drawer />
      </div>
    );
  }
}

module.exports = connect(mapStateToProps)(Main);
