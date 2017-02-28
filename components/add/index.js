import React, { Component } from 'react'
import { Button, Form, FormGroup, Label, Input, FormText, Col } from 'reactstrap'

class AddPage extends Component {
  render() {
    return (
      <div id="AddPage">
        <Form>
          <br />
          <FormGroup row className="container">
            <Label for="workshopURLID">Steam Workshop URL:</Label>
            <Col>
              <Input type="url" name="workshopURLitem" id="workshopURLID" placeholder="https://steamcommunity.com/sharedfiles/filedetails/?id=450814997" />
            </Col>
          </FormGroup>
          <br />
          <FormGroup row className="container">
            <Label for="localLocationID">Local Install Location:</Label>
            <Col>
              <Input type="text" name="localLocation" id="localLocationID" placeholder="C:\where\you\want\workshop\file\folder" />
            </Col>
          </FormGroup>
        </Form>
      </div>
    )
  }
}

export default AddPage
