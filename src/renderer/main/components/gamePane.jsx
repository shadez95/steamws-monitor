import React, { Component } from "react";
// import { connect } from "react-redux";

// const mapStateToProps = (state) => {
//   return { GamePane: state.paneContent };
// };

// @connect(mapStateToProps)
export default class GamePane extends Component {
  render() {
    return(
      <div>
        {this.props.id}
      </div>
    );
  }
}