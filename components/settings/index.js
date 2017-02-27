import React, { Component } from 'react'
import { Button, Form, FormGroup, Label, Input, FormText, Col } from 'reactstrap';

class SettingsPage extends Component {
  render() {
    return (
      <div id="SettingsPage">
        <br />
        <Form>
          <FormGroup row>
            <Label for="workshopLocation" sm={3}>Folder Input:</Label>
            <Col sm={9}>
              <Input type="text" name="workshopLocalLocation" id="workshopLocation" placeholder="C:/game/workshopfolder" />
            </Col>
          </FormGroup>
        </Form>
      </div>
    )
  }
}

export default SettingsPage
