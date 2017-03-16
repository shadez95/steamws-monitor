import React, { Component } from 'react'
import { Button, Form, FormGroup, Label, Input, FormText, Col } from 'reactstrap'

export default class MonitorPage extends Component {
  render() {
    return (
      <div id="MonitorPage">
        <br />
        <h3>This will be the monitoring page</h3>
        
          <FormGroup row className="container">
            <Label for="localLocationID">Local Install Location:</Label>
            <Col>
              <Input type="text" name="localLocation" id="localLocationID" placeholder="C:\location\to\workshop\file\folder" />
            </Col>
          </FormGroup>

      </div>
    )
  }
}
