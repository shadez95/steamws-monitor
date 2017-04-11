import React, { Component } from "react";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
  return { GamePane: state.paneContent };
};

@connect(mapStateToProps)
export default class GamePane extends Component {
  
}