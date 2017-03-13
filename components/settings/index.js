import React, { Component } from 'react'
import { Button, Form, FormGroup, Label, Input, FormText, Col } from 'reactstrap'

class SettingsPage extends Component {
  render() {
    return (
      <div id="SettingsPage">
        <br />
        <Form>
          <FormGroup row className="container">
            <Label for="workshopLocation">Folder Input:</Label>
            <Col>
              <Input type="text" name="workshopLocalLocation" id="workshopLocation" placeholder="C:/game/workshopfolder" />
            </Col>
          </FormGroup>
          <br />
          <FormGroup row className="container">
            <Label for="steamcmdLocation">SteamCMD Location:</Label>
            <Col>
              <Input type="text" name="steamcmdLocalLocation" id="steamcmdLocation" placeholder="C:/SteamCMD/steamcmd.exe" />
            </Col>
          </FormGroup>
          <Button color="success" type="submit" value="Submit">Save</Button>
        </Form>
      </div>
    )
  }
}

export default SettingsPage
