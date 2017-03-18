import React, { Component } from 'react'
import { FormGroup, Label, Col, Input } from 'reactstrap'
import classnames from 'classnames'

import Add from './add'
// import Monitor from './monitor'

// <FormGroup row className="container">
//   <Label for="localLocationID">Local Install Location:</Label>
//   <Col>
//     <Input type="text" name="localLocation" id="localLocationID" placeholder="C:\location\to\workshop\file\folder" />
//   </Col>
// </FormGroup>

export default class Main extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="container">
        <br />
        <h1 style={{"textAlign": "center"}}>Steam Workshop Monitor</h1>
        <br />
        <Add />
        <br />
      </div>
    )
  }
}
