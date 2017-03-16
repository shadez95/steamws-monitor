import React, { Component } from 'react'
import { Button, Form, FormGroup, Label, Input, FormText, Col } from 'reactstrap'

import {Config} from 'electron-config'
import {ipcRenderer} from 'electron'


// In renderer process (web page).
// console.log(ipcRenderer.sendSync('synchronous-message', 'ping')) // prints "pong"
//
// ipcRenderer.on('asynchronous-reply', (event, arg) => {
//   console.log(arg) // prints "pong"
// })
// ipcRenderer.send('asynchronous-message', 'ping')



export default class SettingsPage extends Component {
  constructor(props) {
    super(props)
    this.state = {input: '', inputObj: ''}
    this.handleChange = this.handleChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.handleClick_Browse = this.handleClick_Browse.bind(this)
  }
  handleChange(e) {
    e.persist()
    this.setState({ input: e.target.value, inputObj: e })
  }
  handleClick() {
    console.log(this.state.input);
    const remote = require('electron').remote
    const fs = remote.require('fs')
    console.log(fs.existsSync(this.state.input))

    if (fs.existsSync(this.state.input)) {
      // Saving steamcmd location to config
      const configSettings = new Config({name: 'settings'})
      configSettings.set('steamcmdLoc', this.state.input)

      console.log(configSettings.get('steamcmdLoc'))
    } else {
      alert("steamcmd.exe cannot be found")
      console.log("steamcmd.exe cannot be found")
      this.state.inputObj.target.value = ''
      this.setState({input: '', inputObj: ''})
    }
  }

  handleClick_Browse(e) {

    const remote = require('electron').remote
    const mainProcess = remote.require('../../app.js')
    mainProcess.selectDirectory()
    // var browseDir = ipcRenderer.send('selectDirectory')
    // console.log(browseDir)
  }

  render() {
    return (
      <div id="SettingsPage">
        <br />

          <FormGroup row className="container">
            <Label for="steamcmdLocation">SteamCMD Location:</Label>
            <Col>
              <Input onChange={this.handleChange} type="text" name="steamcmdLocalLocation" id="steamcmdLocation" placeholder="C:\SteamCMD\steamcmd.exe" />
              <br />
              <br />
                <button id="buttonSelectFile" onClick={this.handleClick_Browse}>Browse</button>
                <input id="fileInputID" type="file" style={{display: 'none'}} />
            </Col>
          </FormGroup>
          <Button color="success" type="submit" onClick={this.handleClick} value="Submit">Save</Button>

      </div>
    )
  }
}
