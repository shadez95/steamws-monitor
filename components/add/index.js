import React, { Component } from 'react'
import { Button, Form, FormGroup, Label, Input, FormText, Col } from 'reactstrap';

class AddPage extends Component {
  render() {
    return (
      <div>
        <br />
        <Form>
          <FormGroup row>
            <Label for="workshopURL" sm={3}>Steam Workshop URL:</Label>
            <Col sm={9}>
              <Input type="url" name="workshopURLitem" id="workshopURL" placeholder="https://steamcommunity.com/sharedfiles/filedetails/?id=450814997" />
            </Col>
          </FormGroup>
        </Form>
      </div>
    )
  }
}

export default AddPage
