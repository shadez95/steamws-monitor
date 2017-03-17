import React, { Component } from 'react'
import { Button, Form, FormGroup, Label, Input, FormText, Col } from 'reactstrap'

// CBA workshop ID: 450814997

export default class AddPage extends Component {
  render() {
    return (
      <div id="AddPage">
        <br />

          <FormGroup row className="container">
            <Label for="workshopID">Steam Workshop ID:</Label>
            <Col>
              <Input type="text" name="workshopIDitem" id="workshopID" placeholder="123456789" />
            </Col>
          </FormGroup>
          <Button color="success" type="submit" value="Submit">Add</Button>

      </div>
    )
  }
}
