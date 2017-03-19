import React, { Component } from 'react'

export default class PlusMinus extends Component {
  render() {
    return (
      <i className={this.props.sign} aria-hidden="true"></i>
    )
  }
}
