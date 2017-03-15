import React, { Component } from 'react'
import { Button, Form, FormGroup, Label, Input, FormText, Col } from 'reactstrap'

export default class AddPage extends Component {
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
          <Button color="success" type="submit" value="Submit">Add</Button>
        </Form>
      </div>
    )
  }
}
