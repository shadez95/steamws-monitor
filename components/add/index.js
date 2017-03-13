import React, { Component } from 'react'
import { Button, Form, FormGroup, Label, Input, FormText, Col } from 'reactstrap'

class AddPage extends Component {
  render() {
    return (
      <div id="AddPage">
        <br />
        <Form>
          <FormGroup row className="container">
            <Label for="workshopID">Steam Workshop ID:</Label>
            <Col>
              <Input type="text" name="workshopIDitem" id="workshopID" placeholder="450814997" />
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
