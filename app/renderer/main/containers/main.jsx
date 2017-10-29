import React, { Component }  from "react";
import { connect } from "react-redux";
import SplitPane from "react-split-pane";

import CustomNav from "./nav";
import PaneContent from "./paneContent";

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
        <SplitPane split="vertical" primary="first" defaultSize={200}>
          <div>
            <CustomNav />
          </div>
          <div>
            <div className="container-fluid" style={scrollStyle}>
              <PaneContent />
            </div>
          </div>
        </SplitPane>
      </div>
    );
  }
}

module.exports = connect(mapStateToProps)(Main);
