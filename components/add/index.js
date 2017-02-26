import React, { Component } from 'react'
import { Button, Form, FormGroup, Label, Input, FormText, Col } from 'reactstrap';

class AddPage extends Component {
  render() {
    return (
      <div id="AddPage">
        <br />
        <Form>
          <FormGroup row className="container">
            <Label for="workshopURLID" sm={3}>Steam Workshop URL:</Label>
            <Col sm={8}>
              <Input type="url" name="workshopURLitem" id="workshopURLID" placeholder="https://steamcommunity.com/sharedfiles/filedetails/?id=450814997" />
            </Col>
          </FormGroup>
          <FormGroup row className="container">
            <Label for="localLocationID" sm={3}>Local Install Location:</Label>
            <Col sm={8}>
              <Input type="text" name="localLocation" id="localLocationID" placeholder="C:\where\you\want\workshop\file\folder" />
            </Col>
          </FormGroup>
        </Form>
      </div>
    )
  }
}

export default AddPage
